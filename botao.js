(function() {
    'use strict';

    // Trava de segurança para o modo manutenção global
    if (typeof window.emManutencao !== 'undefined' && window.emManutencao === true) {
        return; 
    }

    // 1. Injeção de Estilos Otimizados - Edição Especial Dia dos Namorados
    const estilos = document.createElement('style');
    estilos.textContent = `
        .container-gatilho-painel {
            position: fixed;
            top: 45px; /* Espaço seguro para não colar na borda do topo */
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            width: auto;
            display: flex;
            justify-content: center;
        }

        .btn-toggle-paineis {
            /* Fundo alterado para preto profundo translúcido combinando com os novos cards */
            background: rgba(6, 4, 10, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(25px) saturate(120%);
            -webkit-backdrop-filter: blur(25px) saturate(120%);
            padding: 10px 22px;
            border-radius: 50px;
            color: #f1f5f9;
            font-family: 'Poppins', sans-serif;
            font-size: 0.72rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            cursor: pointer;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5),
                        inset 0 1px 1px rgba(254, 226, 226, 0.05);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row; 
            gap: 8px;
            white-space: nowrap; 
            position: relative;
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                        background-color 0.3s ease, 
                        color 0.3s ease,
                        box-shadow 0.3s ease;
        }

        /* Ícone ganha uma cor quente sutil para ambientação */
        .btn-toggle-paineis i {
            font-size: 0.8rem;
            display: inline-block;
            color: #f472b6; /* Rosa Kauê base */
            transition: color 0.3s ease, filter 0.3s ease;
            filter: drop-shadow(0 0 4px rgba(244, 114, 182, 0.4));
        }

        /* ALTERAÇÃO DIA DOS NAMORADOS: Borda acende em degradê trilateral romântico no Hover */
        .btn-toggle-paineis::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 50px;
            padding: 1.5px; 
            background: linear-gradient(135deg, #f472b6, #ef4444, #00e5ff);
            background-size: 200% 200%;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.4s ease;
            animation: moverGradienteBotao 4s linear infinite;
        }

        .btn-toggle-paineis:hover {
            background: rgba(10, 6, 15, 0.85);
            color: #ffffff;
            transform: translateY(-2px) scale(1.02) translateZ(0); 
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.7), 
                        0 0 20px rgba(239, 68, 68, 0.15);
        }

        /* Ativa a borda luminosa e altera o brilho do ícone no hover */
        .btn-toggle-paineis:hover::before {
            opacity: 1;
        }
        
        .btn-toggle-paineis:hover i {
            color: #ef4444; /* Vira o vermelho namorados no foco */
            filter: drop-shadow(0 0 8px #ef4444);
        }

        /* Preparação nativa na GPU para animações fluidas a 60 FPS */
        .card, .card-secundario, .container-creditos {
            will-change: transform, opacity;
            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        /* Ocultação fluida e romântica (Desce suavemente sumindo no fundo) */
        .paineis-ocultos {
            opacity: 0 !important;
            transform: translateY(20px) scale(0.97) translateZ(0) !important;
            pointer-events: none !important;
        }

        @keyframes moverGradienteBotao {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(estilos);

    // 2. Criação da Estrutura no DOM
    const containerBotao = document.createElement('div');
    containerBotao.className = 'container-gatilho-painel';

    const botao = document.createElement('button');
    botao.className = 'btn-toggle-paineis';
    botao.innerHTML = `
        <i class="fa-solid fa-eye-slash"></i>
        <span id="texto-btn-paineis">Esconder painéis</span>
    `;

    containerBotao.appendChild(botao);
    document.body.appendChild(containerBotao);

    // Cache estável
    const textoBtn = document.getElementById('texto-btn-paineis');
    const iconeBtn = botao.querySelector('i');
    let estaoOcultos = false;

    // 3. Lógica Assíncrona de Alta Performance
    botao.addEventListener('click', () => {
        const elementos = document.querySelectorAll('.card, .card-secundario, .container-creditos');
        
        estaoOcultos = !estaoOcultos;

        requestAnimationFrame(() => {
            elementos.forEach(el => {
                if (estaoOcultos) {
                    el.classList.add('paineis-ocultos');
                } else {
                    el.classList.remove('paineis-ocultos');
                }
            });

            if (estaoOcultos) {
                textoBtn.textContent = 'Mostrar painéis';
                iconeBtn.className = 'fa-solid fa-eye';
            } else {
                textoBtn.textContent = 'Esconder painéis';
                iconeBtn.className = 'fa-solid fa-eye-slash';
            }
        });
    });

})();
