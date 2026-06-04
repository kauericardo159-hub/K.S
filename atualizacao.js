(function() {
    'use strict';

    // Trava de segurança integrada ao escopo global do modo manutenção
    if (typeof window.emManutencao !== 'undefined' && window.emManutencao === true) return;

    // --- 1. INJEÇÃO DA ARQUITETURA VISUAL DO BANNER (DARK PREMIUM) ---
    const estilos = document.createElement('style');
    estilos.textContent = `
        .prompt-atualizacao-pwa {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(120px);
            width: calc(100% - 32px);
            max-width: 350px;
            background: rgba(10, 12, 22, 0.92);
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            padding: 20px;
            border-radius: 24px;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.65);
            z-index: 100005; /* Camada suprema: sobrepõe absolutamente tudo */
            display: flex;
            flex-direction: column;
            gap: 16px;
            opacity: 0;
            
            /* Física de mola (Elastic Slide-In) para um efeito nativo de app */
            transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.15), 
                        opacity 0.4s ease;
            
            will-change: transform, opacity;
        }

        .prompt-atualizacao-pwa.mostrar {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }

        .prompt-pwa-topo {
            display: flex;
            align-items: center;
            gap: 14px;
        }

        .prompt-pwa-avatar {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            object-fit: contain;
        }

        .prompt-pwa-txt {
            display: flex;
            flex-direction: column;
            text-align: left;
        }

        .prompt-pwa-titulo {
            font-family: 'Poppins', sans-serif !important;
            font-size: 0.92rem;
            font-weight: 700;
            color: var(--texto-claro, #ffffff);
            letter-spacing: -0.1px;
        }

        .prompt-pwa-desc {
            font-family: 'Patrick Hand', sans-serif !important;
            font-size: 0.95rem;
            color: #94a3b8;
            line-height: 1.3;
            margin-top: 2px;
        }

        .prompt-pwa-botoes {
            display: flex;
            gap: 10px;
            width: 100%;
        }

        .btn-pwa-acao {
            flex: 1;
            padding: 11px;
            border-radius: 14px;
            font-family: 'Poppins', sans-serif !important;
            font-size: 0.78rem;
            font-weight: 700;
            cursor: pointer;
            border: none;
            transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease;
        }

        /* Degradê reativo oficial do ecossistema: Rosa Kauê & Ciano Sky */
        .btn-pwa-atualizar {
            background: linear-gradient(135deg, var(--kaue-rosa, #f472b6), var(--sky-ciano, #00e5ff));
            color: #ffffff;
            box-shadow: 0 4px 15px rgba(0, 229, 255, 0.2);
        }

        .btn-pwa-recusar {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.08);
            color: #94a3b8;
        }

        .btn-pwa-acao:hover {
            transform: scale(1.025);
        }
        
        .btn-pwa-acao:active {
            transform: scale(0.98);
        }
    `;
    document.head.appendChild(estilos); // CORRIGIDO: de 'stilos' para 'estilos'

    // --- 2. MOTOR DE CAPTURA DO CICLO DE VIDA DO SERVICE WORKER ---
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(reg => {
            // Cenário A: O novo SW já foi baixado e está em repouso aguardando ativação
            if (reg.waiting) {
                invocarPromptAtualizacao(reg.waiting);
                return;
            }

            // Cenário B: O novo SW está realizando o download dos novos arquivos agora
            if (reg.installing) {
                ouvirMudancaEstado(reg.installing);
            }

            // Cenário C: Escuta ativa em tempo de execução para quando o SW detectar alteração no servidor
            reg.addEventListener('updatefound', () => {
                ouvirMudancaEstado(reg.installing);
            });
        });

        // Evento que intercepta a assunção do novo controlador e reinicia o app sem cache residual
        let reiniciando = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!reiniciando) {
                reiniciando = true;
                window.location.reload();
            }
        });
    }

    // Auxiliar de escuta: Monitora o passo a passo da instalação até o congelamento em 'installed'
    function ouvirMudancaEstado(worker) {
        if (!worker) return;
        worker.addEventListener('statechange', () => {
            // Só dispara a interface se o arquivo terminou o download e existe um SW anterior controlando a página
            if (worker.state === 'installed' && navigator.serviceWorker.controller) {
                invocarPromptAtualizacao(worker);
            }
        });
    }

    // --- 3. INJEÇÃO DINÂMICA DO COMPONENTE DE INTERFACE (BANNER) ---
    function invocarPromptAtualizacao(workerEspera) {
        // Blindagem anti-duplicação
        if (document.getElementById('prompt-atualizar-sistema')) return;

        const banner = document.createElement('div');
        banner.id = 'prompt-atualizar-sistema';
        banner.className = 'prompt-atualizacao-pwa';
        banner.innerHTML = `
            <div class="prompt-pwa-topo">
                <img src="./icon-192.png" class="prompt-pwa-avatar" alt="Logotipo K&S">
                <div class="prompt-pwa-txt">
                    <span class="prompt-pwa-titulo">Atualização Disponível</span>
                    <span class="prompt-pwa-desc">Novas melhorias prontas para o nosso app!</span>
                </div>
            </div>
            <div class="prompt-pwa-botoes">
                <button class="btn-pwa-acao btn-pwa-recusar" id="btn-pwa-ignorar">Depois</button>
                <button class="btn-pwa-acao btn-pwa-atualizar" id="btn-pwa-aplicar">Atualizar</button>
            </div>
        `;
        document.body.appendChild(banner);

        // Desliza o card para cima após um breve respiro de carregamento
        setTimeout(() => banner.classList.add('mostrar'), 800);

        // Ação: Força o novo Service Worker a quebrar a fila de espera (skipWaiting)
        document.getElementById('btn-pwa-aplicar').addEventListener('click', () => {
            banner.classList.remove('mostrar');
            workerEspera.postMessage({ action: 'skipWaiting' });
        });

        // Ação: Fecha o banner e preserva a sessão atual (o SW atualizará no próximo boot)
        document.getElementById('btn-pwa-ignorar').addEventListener('click', () => {
            banner.classList.remove('mostrar');
            setTimeout(() => banner.remove(), 600);
        });
    }
})();
