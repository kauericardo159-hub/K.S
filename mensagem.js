(function() {
    'use strict';

    // Evita duplicidade e não roda se estiver em manutenção
    if (document.getElementById('card-mensagem-status')) return;
    if (typeof window.emManutencao !== 'undefined' && window.emManutencao === true) return;

    // ==========================================
    // 🎨 ESTILOS DA CAIXA MENSAGEM (RODAPÉ)
    // ==========================================
    const estilo = document.createElement('style');
    estilo.textContent = `
        .container-mensagem-status {
            width: calc(100% - 32px);
            max-width: 420px;
            margin: 20px auto 40px auto;
            background: rgba(10, 12, 22, 0.85);
            border: 1px solid rgba(244, 114, 182, 0.2);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-radius: 20px;
            padding: 16px 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5),
                        inset 0 1px 0 rgba(255, 255, 255, 0.08);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            box-sizing: border-box;
            position: relative;
            z-index: 10;
        }

        .status-badge-capsula {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(0, 229, 255, 0.1);
            border: 1px solid rgba(0, 229, 255, 0.3);
            color: #00e5ff;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 0.68rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            padding: 4px 12px;
            border-radius: 12px;
            margin-bottom: 10px;
        }

        .status-badge-dot {
            width: 6px;
            height: 6px;
            background-color: #00e5ff;
            border-radius: 50%;
            box-shadow: 0 0 8px #00e5ff;
        }

        .status-texto-mensagem {
            font-family: 'Plus Jakarta Sans', 'Poppins', sans-serif;
            font-size: 0.85rem;
            line-height: 1.5;
            color: #cbd5e1;
            font-weight: 500;
            margin: 0;
        }

        .status-texto-mensagem strong {
            color: #f472b6;
            font-weight: 600;
        }

        @media (max-width: 480px) {
            .container-mensagem-status {
                margin: 16px auto 30px auto;
                padding: 14px 16px;
            }
            .status-texto-mensagem {
                font-size: 0.78rem;
            }
        }
    `;
    document.head.appendChild(estilo);

    // ==========================================
    // 🏛️ MONTAGEM DO HTML
    // ==========================================
    const cardMensagem = document.createElement('div');
    cardMensagem.id = 'card-mensagem-status';
    cardMensagem.className = 'container-mensagem-status';

    // Você pode editar o texto entre as tags <p> como preferir!
    cardMensagem.innerHTML = `
        <div class="status-badge-capsula">
            <span class="status-badge-dot"></span>
            <span>Cápsula do Tempo</span>
        </div>
        <p class="status-texto-mensagem">
            Alguns capítulos se encerram, mas o carinho, o respeito e as boas memórias continuam guardados com afeto. ✨
        </p>
    `;

    // Injeta abaixo do card principal
    const aplicarNoDOM = () => {
        document.body.appendChild(cardMensagem);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', aplicarNoDOM);
    } else {
        aplicarNoDOM();
    }
})();
