(function() {
    'use strict';

    // Trava de segurança para não duplicar o efeito na tela se reiniciado
    if (document.getElementById('container-namorados-comemorativo')) return;
    if (typeof window.emManutencao !== 'undefined' && window.emManutencao === true) return;

    // --- INJEÇÃO DE ESTILOS DIA DOS NAMORADOS (DARK PREMIUM ROMÂNTICO) ---
    const estilosNamorados = document.createElement('style');
    estilosNamorados.textContent = `
        #container-namorados-comemorativo {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9998;
            overflow: hidden;
        }

        /* Classe base para os elementos da chuva apaixonada */
        .gota-amor {
            position: absolute;
            top: -60px;
            will-change: transform, opacity;
            animation: quedaRomantica linear forwards;
        }

        /* Configuração de imagens de corações e pétalas oficiais do Twemoji (Discord) */
        .twemoji-namorados {
            width: 28px;
            height: 28px;
            filter: drop-shadow(0 6px 12px rgba(239, 68, 68, 0.35)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
            transform-style: preserve-3d;
        }

        /* Minúsculos cristais de brilho neon que caem flutuando */
        .brilho-namorados {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            box-shadow: 0 0 10px var(--cor-brilho);
        }

        /* Física de queda simulando folhas/pétalas ao vento com rotação 3D e balanço */
        @keyframes quedaRomantica {
            0% {
                transform: translateY(0) translateX(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 0.9;
            }
            100% {
                transform: translateY(105vh) translateX(var(--drift-x)) rotateX(var(--rot-x)) rotateY(var(--rot-y)) rotateZ(var(--rot-z));
                opacity: 0;
            }
        }

        /* Banner Flutuante Premium - Edição Dia dos Namorados */
        .banner-namorados {
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%) translateY(40px);
            /* Gradiente animado trilateral do ecossistema de 2026 */
            background: linear-gradient(135deg, rgba(6, 4, 10, 0.85), rgba(153, 27, 27, 0.45));
            padding: 12px 32px;
            border-radius: 50px;
            font-family: 'Poppins', sans-serif;
            font-size: 0.82rem;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 
                        0 0 30px rgba(239, 68, 68, 0.15);
            border: 1px solid transparent;
            background: linear-gradient(rgba(6, 4, 10, 0.9), rgba(6, 4, 10, 0.9)) padding-box,
                        linear-gradient(135deg, #f472b6, #ef4444, #00e5ff) border-box;
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            white-space: nowrap;
            opacity: 0;
            animation: subirBannerNamorados 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .banner-namorados span {
            background: linear-gradient(90deg, #ffffff, #fbcfe8, #ffffff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        @keyframes subirBannerNamorados {
            to { 
                transform: translateX(-50%) translateY(0); 
                opacity: 1;
            }
        }

        /* Adaptação responsiva precisa para telas menores */
        @media (max-width: 600px) {
            .twemoji-namorados { width: 22px; height: 22px; }
            .banner-namorados { 
                font-size: 0.72rem; 
                padding: 10px 20px; 
                width: calc(100% - 40px); 
                justify-content: center;
                box-sizing: border-box;
            }
        }
    `;
    document.head.appendChild(estilosNamorados);

    // --- CONSTRUÇÃO DOS PALCOS VISUAIS NO DOM ---
    const palcoAmor = document.createElement('div');
    palcoAmor.id = 'container-namorados-comemorativo';
    document.body.appendChild(palcoAmor);

    const bannerMensagem = document.createElement('div');
    bannerMensagem.className = 'banner-namorados';
    bannerMensagem.innerHTML = '❤️ <span>Feliz Dia dos Namorados!</span> ❤️';
    document.body.appendChild(bannerMensagem);

    // CDN Oficial do Twemoji - Seleção Romântica (Coração Vermelho, Rosa, Brilhante e Pétala Murcha/Rosa caindo)
    const linksAmorTwemoji = [
        'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/2764.svg',     // ❤️
        'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f496.svg',    // 💖
        'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f49d.svg',    // 💝
        'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f9e1.svg',    // 🧡 (Ciano/Laranja contrasta bem)
        'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f340.svg',    // 🍀 (Trevo da sorte do casal opcional, mude para 1f339 para Rosa 🌹)
        'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f339.svg'     // 🌹
    ];
    
    // Paleta de partículas de brilho neon que acompanham os corações
    const coresBrilhos = ['#ef4444', '#f472b6', '#00e5ff', '#ffffff'];

    /**
     * Instancia uma gota de amor (coração/pétala ou cristal luminoso) 
     * e calcula fisicamente uma descida suave com rotação tridimensional.
     */
    function instanciarGotaChuva() {
        if (!palcoAmor) return;

        const containerGota = document.createElement('div');
        containerGota.className = 'gota-amor';

        const probabilidade = Math.random();
        
        if (probabilidade < 0.55) {
            // Criação do Elemento Gráfico Twemoji
            const tagImg = document.createElement('img');
            tagImg.className = 'twemoji-namorados';
            tagImg.src = linksAmorTwemoji[Math.floor(Math.random() * linksAmorTwemoji.length)];
            tagImg.alt = 'Amor Particle';
            containerGota.appendChild(tagImg);
        } else {
            // Criação de Micro Cristais de Neon Atmosféricos
            containerGota.classList.add('brilho-namorados');
            const corSorteada = coresBrilhos[Math.floor(Math.random() * coresBrilhos.length)];
            containerGota.style.backgroundColor = corSorteada;
            containerGota.style.setProperty('--cor-brilho', corSorteada);
        }

        // Parâmetros Físicos e Randômicos Dinâmicos por GPU
        const startX = Math.random() * window.innerWidth;
        const tempoQueda = Math.random() * 5 + 5; // Queda elegante e lenta (Entre 5s e 10s)
        const driftX = (Math.random() * 200 - 100) + 'px'; // Desvio horizontal
        
        // Rotações complexas nos 3 eixos (X, Y, Z) para efeito de folha caindo
        const rotX = (Math.random() * 360 + 180) + 'deg';
        const rotY = (Math.random() * 360 + 360) + 'deg';
        const rotZ = (Math.random() * 720 - 360) + 'deg';

        containerGota.style.left = `${startX}px`;
        containerGota.style.animationDuration = `${tempoQueda}s`;
        
        // Injeção de variáveis locais para processamento de animação no CSS nativo
        containerGota.style.setProperty('--drift-x', driftX);
        containerGota.style.setProperty('--rot-x', rotX);
        containerGota.style.setProperty('--rot-y', rotY);
        containerGota.style.setProperty('--rot-z', rotZ);

        // Descarte automático após a conclusão do ciclo de vida para otimização de memória RAM
        containerGota.addEventListener('animationend', () => {
            containerGota.remove();
        });

        palcoAmor.appendChild(containerGota);
    }

    // --- REGULADOR DE FLUXO DA ATMOSFERA ---
    // Cadência adaptável para manter suavidade sem sobrecarregar processadores mobile
    const cadenciaTempo = window.innerWidth < 600 ? 500 : 300;
    const loopEfeito = setInterval(instanciarGotaChuva, cadenciaTempo);

    // Explosão ambiental imediata de 10 elementos na inicialização
    for (let i = 0; i < 10; i++) {
        setTimeout(instanciarGotaChuva, Math.random() * 1000);
    }

})();
