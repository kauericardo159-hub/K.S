(function() {
    'use strict';

    // Trava de segurança para o modo manutenção global e duplicidade
    if (document.getElementById('container-gatilho-paineis-btn')) return;
    if (typeof window.emManutencao !== 'undefined' && window.emManutencao === true) return;

    // 1. Injeção de Estilos Otimizados (Horizontal, Limpo, Preto e Alinhado)
    const estilos = document.createElement('style');
    estilos.textContent = `
        .container-gatilho-painel {
            position: fixed;
            top: 45px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9998;
            width: auto;
            display: flex;
            justify-content: center;
            transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), 
                        transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                        visibility 0.35s ease;
        }

        /* Oculta suavemente caso o painel lateral de navegação seja aberto */
        .container-gatilho-painel.escondido-por-painel {
            opacity: 0;
            transform: translateX(-50%) translateY(-15px) scale(0.92);
            pointer-events: none;
            visibility: hidden;
        }

        .btn-toggle-paineis {
            background: rgba(10, 12, 22, 0.75);
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            padding: 9px 20px;
            border-radius: 50px;
            color: #cbd5e1;
            font-family: 'Plus Jakarta Sans', 'Poppins', sans-serif;
            font-size: 0.72rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            cursor: pointer;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4),
                        inset 0 1px 0 rgba(255, 255, 255, 0.05);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            gap: 8px;
            white-space: nowrap;
            user-select: none;
            transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), 
                        background 0.2s ease, 
                        border-color 0.2s ease,
                        color 0.2s ease;
        }

        .btn-toggle-paineis:hover {
            background: rgba(10, 12, 22, 0.9);
            border-color: rgba(255, 255, 255, 0.2); 
            color: #ffffff;
            transform: scale(1.03);
        }

        .btn-toggle-paineis:active {
            transform: scale(0.96);
        }

        .btn-toggle-paineis i {
            font-size: 0.8rem;
            display: inline-block;
            transition: transform 0.2s ease;
        }

        /* Animações nativas na GPU */
        .card, .card-secundario, .container-creditos, .container-mensagem-status {
            will-change: transform, opacity;
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        /* Classe de ocultação dos elementos centrais */
        .paineis-ocultos {
            opacity: 0 !important;
            transform: translateY(14px) scale(0.97) !important;
            pointer-events: none !important;
        }

        @media (max-width: 480px) {
            .container-gatilho-painel {
                top: 20px;
            }
            .btn-toggle-paineis {
                padding: 8px 16px;
                font-size: 0.68rem;
            }
        }
    `;
    document.head.appendChild(estilos);

    // 2. Criação da Estrutura no DOM
    const containerBotao = document.createElement('div');
    containerBotao.id = 'container-gatilho-paineis-btn';
    containerBotao.className = 'container-gatilho-painel';

    const botao = document.createElement('button');
    botao.className = 'btn-toggle-paineis';
    botao.setAttribute('aria-label', 'Alternar Visibilidade das Memórias');
    botao.innerHTML = `
        <i class="fa-solid fa-eye-slash"></i>
        <span id="texto-btn-paineis">Esconder painéis</span>
    `;

    containerBotao.appendChild(botao);

    const injetarBotao = () => {
        if (!document.getElementById('container-gatilho-paineis-btn')) {
            document.body.appendChild(containerBotao);
        }
    };

    if (document.body) {
        injetarBotao();
    } else {
        window.addEventListener('DOMContentLoaded', injetarBotao);
    }

    // 3. Lógica do Ação de Ocultar / Mostrar
    let estaoOcultos = false;

    botao.addEventListener('click', () => {
        const elementos = document.querySelectorAll('.card, .card-secundario, .container-creditos, .container-mensagem-status');
        const textoBtn = document.getElementById('texto-btn-paineis');
        const iconeBtn = botao.querySelector('i');
        
        estaoOcultos = !estaoOcultos;

        requestAnimationFrame(() => {
            elementos.forEach(el => {
                if (estaoOcultos) {
                    el.classList.add('paineis-ocultos');
                } else {
                    el.classList.remove('paineis-ocultos');
                }
            });

            if (textoBtn && iconeBtn) {
                if (estaoOcultos) {
                    textoBtn.textContent = 'Mostrar painéis';
                    iconeBtn.className = 'fa-solid fa-eye';
                } else {
                    textoBtn.textContent = 'Esconder painéis';
                    iconeBtn.className = 'fa-solid fa-eye-slash';
                }
            }
        });
    });

    // 4. Sincronização com o Painel Lateral
    const monitorarPainelLateral = () => {
        const painelLateral = document.getElementById('painel-sobre');
        if (!painelLateral) return;

        const checarEstadoPainel = () => {
            const painelAberto = !painelLateral.classList.contains('paineis-ocultos');
            if (painelAberto) {
                containerBotao.classList.add('escondido-por-painel');
            } else {
                containerBotao.classList.remove('escondido-por-painel');
            }
        };

        const observer = new MutationObserver(checarEstadoPainel);
        observer.observe(painelLateral, { attributes: true, attributeFilter: ['class', 'style', 'aria-hidden'] });
    };

    window.addEventListener('painelConexaoMontado', monitorarPainelLateral);
    setTimeout(monitorarPainelLateral, 500);

})();
