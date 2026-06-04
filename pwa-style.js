(function() {
    'use strict';

    // Não executa se estiver em manutenção
    if (typeof emManutencao !== 'undefined' && emManutencao === true) return;

    // ==========================================
    // 1. INJEÇÃO DE ESTILOS CINEMATOGRÁFICOS (UI/UX)
    // ==========================================
    const estilos = document.createElement('style');
    estilos.textContent = `
        /* --- TELA DE INTRODUÇÃO (SPLASH SCREEN PREMIUM) --- */
        .splash-pwa-container {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: #0a0c16; /* Sincronizado com o seu manifest.json */
            z-index: 100000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s;
        }

        .splash-logo-wrapper {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Brilho pulsante de fundo no carregamento */
        .splash-logo-glow {
            position: absolute;
            width: 140px;
            height: 140px;
            background: radial-gradient(circle, rgba(244, 114, 182, 0.2) 0%, transparent 70%);
            border-radius: 50%;
            animation: pulsarGlowSplash 2s ease-in-out infinite alternate;
        }

        .splash-logo {
            width: 130px;
            height: 130px;
            object-fit: contain;
            filter: drop-shadow(0 8px 30px rgba(0, 229, 255, 0.15));
            opacity: 0;
            transform: scale(0.85);
            animation: surgirLogoSplash 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s forwards;
            z-index: 2;
        }

        .splash-carregando {
            margin-top: 32px;
            width: 50px;
            height: 3px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            overflow: hidden;
            position: relative;
        }

        .splash-barra {
            content: '';
            position: absolute;
            left: 0; top: 0; height: 100%; width: 40%;
            background: linear-gradient(90deg, #f472b6, #00e5ff);
            border-radius: 10px;
            animation: carregarSplash 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes surgirLogoSplash {
            to { opacity: 1; transform: scale(1); }
        }

        @keyframes pulsarGlowSplash {
            from { transform: scale(0.9); opacity: 0.6; }
            to { transform: scale(1.2); opacity: 1; }
        }

        @keyframes carregarSplash {
            0% { left: -40%; }
            100% { left: 100%; }
        }

        /* --- CARD DE INSTALAÇÃO GLASSMORPHISM (VISÃO NAVEGADOR) --- */
        .banner-instalacao-pwa {
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%) translateY(120px);
            width: calc(100% - 32px);
            max-width: 360px;
            background: rgba(10, 12, 22, 0.85);
            border: 1px solid rgba(255, 255, 255, 0.06);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            padding: 14px 16px;
            border-radius: 20px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 
                        inset 0 1px 0 rgba(255, 255, 255, 0.05);
            z-index: 9998;
            display: flex;
            align-items: center;
            gap: 12px;
            opacity: 0;
            box-sizing: border-box;
            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
        }

        .banner-instalacao-pwa.mostrar {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }

        .pwa-icone-mini {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            object-fit: cover;
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: #0a0c16;
        }

        .pwa-info-texto {
            display: flex;
            flex-direction: column;
            flex: 1;
            text-align: left;
        }

        .pwa-txt-titulo {
            font-family: 'Poppins', sans-serif !important;
            font-size: 0.85rem;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.1px;
        }

        .pwa-txt-desc {
            font-family: 'Poppins', sans-serif !important;
            font-size: 0.72rem;
            color: #64748b;
            margin-top: 1px;
        }

        .btn-instalar-pwa {
            background: linear-gradient(135deg, #f472b6, #3b82f6);
            border: none;
            padding: 8px 14px;
            border-radius: 10px;
            color: #ffffff;
            font-family: 'Poppins', sans-serif !important;
            font-size: 0.72rem;
            font-weight: 700;
            cursor: pointer;
            transition: transform 0.2s ease, filter 0.2s ease;
        }

        .btn-instalar-pwa:hover {
            transform: scale(1.03);
            filter: brightness(1.1);
        }

        /* Botão Elegante de Fechar/Recusar */
        .pwa-btn-fechar {
            background: transparent;
            border: none;
            color: #475569;
            font-size: 1.15rem;
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s ease;
            margin-left: -2px;
        }

        .pwa-btn-fechar:hover {
            color: #94a3b8;
        }
    `;
    document.head.appendChild(estilos);

    // ==========================================
    // 2. DETECÇÃO MULTI-AMBIENTE ATUALIZADA
    // ==========================================
    const estaNoApp = window.matchMedia('(display-mode: standalone)').matches || 
                      window.matchMedia('(display-mode: fullscreen)').matches ||
                      window.navigator.standalone === true;

    if (estaNoApp) {
        // --- MODO APLICATIVO INSTALADO (SPLASH) ---
        const splash = document.createElement('div');
        splash.className = 'splash-pwa-container';
        splash.innerHTML = `
            <div class="splash-logo-wrapper">
                <div class="splash-logo-glow"></div>
                <img src="icon-512.png?v=3" class="splash-logo" alt="K & S">
            </div>
            <div class="splash-carregando">
                <div class="splash-barra"></div>
            </div>
        `;
        document.body.appendChild(splash);

        // Suaviza a transição de saída quando os assets dão bind completo
        window.addEventListener('load', () => {
            setTimeout(() => {
                splash.style.opacity = '0';
                splash.style.visibility = 'hidden';
                setTimeout(() => splash.remove(), 600);
            }, 2000); // 2 segundos perfeitos de fixação de tela
        });

    } else {
        // --- MODO NAVEGADOR (PROMPT CUSTOMIZADO) ---
        // Se o usuário já fechou o banner manualmente nesta sessão/aparelho, ignora
        if (localStorage.getItem('pwa-banner-recusado') === 'true') return;

        let capturaInstalacao = null;

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            capturaInstalacao = e;

            const banner = document.createElement('div');
            banner.className = 'banner-instalacao-pwa';
            banner.innerHTML = `
                <img src="icon-192.png?v=3" class="pwa-icone-mini" alt="K&S">
                <div class="pwa-info-texto">
                    <span class="pwa-txt-titulo">Instalar Aplicativo</span>
                    <span class="pwa-txt-desc">Acesse na sua tela inicial</span>
                </div>
                <button class="btn-instalar-pwa" id="gatilho-instalar-pwa">Instalar</button>
                <button class="pwa-btn-fechar" id="fechar-pwa-banner" title="Fechar">&times;</button>
            `;
            document.body.appendChild(banner);

            // Abre o prompt de forma não intrusiva após 4 segundos logado
            setTimeout(() => {
                banner.classList.add('mostrar');
            }, 4000);

            // Ação de Instalação Nativa disparada pelo botão premium
            document.getElementById('gatilho-instalar-pwa').addEventListener('click', () => {
                banner.classList.remove('mostrar');
                if (capturaInstalacao) {
                    capturaInstalacao.prompt();
                    capturaInstalacao.userChoice.then((escolha) => {
                        if (escolha.outcome === 'accepted') {
                            console.log('PWA: Instalação aceita com sucesso.');
                        }
                        capturaInstalacao = null;
                        setTimeout(() => banner.remove(), 500);
                    });
                }
            });

            // Ação Inteligente do Botão Fechar (Salva no LocalStorage)
            document.getElementById('fechar-pwa-banner').addEventListener('click', () => {
                banner.classList.remove('mostrar');
                localStorage.setItem('pwa-banner-recusado', 'true');
                setTimeout(() => banner.remove(), 500);
            });
        });
    }
})();
