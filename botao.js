(function() {
    'use strict';

    if (typeof emManutencao !== 'undefined' && emManutencao === true) {
        return; 
    }

    // 1. Injeção de Estilos Otimizados (Horizontal, Limpo e Alinhado)
    const estilos = document.createElement('style');
    estilos.textContent = `
        .container-gatilho-painel {
            position: fixed;
            top: 45px; /* Ajustado para dar espaço seguro e não colar na borda do topo */
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            width: auto;
            display: flex;
            justify-content: center;
        }

        .btn-toggle-paineis {
            background: rgba(13, 18, 30, 0.65);
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            padding: 10px 22px;
            border-radius: 50px;
            color: #e2e8f0;
            font-family: 'Poppins', sans-serif;
            font-size: 0.72rem; /* Sutilmente menor para ficar elegante na horizontal */
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row; /* Força estritamente a orientação horizontal */
            gap: 8px;
            white-space: nowrap; /* Impede quebras de texto */
            transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.2s ease, border-color 0.2s ease;
        }

        .btn-toggle-paineis:hover {
            background: rgba(13, 18, 30, 0.85);
            border-color: rgba(244, 114, 182, 0.35); /* Brilho sutil rosa do Kauê */
            color: #ffffff;
            transform: translateY(1px) scale(1.02); /* Movimento leve sem tremer */
        }

        .btn-toggle-paineis i {
            font-size: 0.8rem;
            display: inline-block;
        }

        /* Preparação nativa na GPU */
        .card, .card-secundario, .container-creditos {
            will-change: transform, opacity;
            transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1) !important;
        }

        /* Ocultação sem quebra com transição linear descendente */
        .paineis-ocultos {
            opacity: 0 !important;
            transform: translateY(12px) scale(0.98) !important;
            pointer-events: none !important;
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
