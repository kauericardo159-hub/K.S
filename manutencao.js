(function() {
    'use strict';

    // Verifica se a manutenção deve ser exibida
    if (typeof emManutencao !== 'undefined' && emManutencao === true) {
        
        // ==========================================
        // 🖼️ BANCO DE IMAGENS DA MANUTENÇÃO
        // ==========================================
        const imagensManutencao = [
            "manu1.png",
            "manu2.png",
            "protogen.gif"
        ];

        // Sorteia uma imagem da lista
        const imagemSorteada = imagensManutencao[Math.floor(Math.random() * imagensManutencao.length)];

        // Fallbacks das variáveis
        const titulo = typeof tituloManutencao !== 'undefined' ? tituloManutencao : "Atualização em Andamento";
        const mensagem = typeof mensagemManutencao !== 'undefined' ? mensagemManutencao : "O site está recebendo melhorias e estará de volta em breve.";
        const isManual = typeof emManutencaoManual !== 'undefined' ? emManutencaoManual : false;
        const dataAlvo = typeof dataAlvoObjeto !== 'undefined' ? dataAlvoObjeto : null;

        // ==========================================
        // 🎨 ESTILOS MODERNOS & GLASSMORPHISM
        // ==========================================
        const style = document.createElement('style');
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

            #tela-manutencao-overlay {
                position: fixed;
                top: 0; left: 0;
                width: 100vw; height: 100vh;
                background: radial-gradient(circle at 50% 30%, #1a102f 0%, #080911 100%);
                color: #f8fafc;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                z-index: 99999;
                text-align: center;
                padding: 20px;
                box-sizing: border-box;
                overflow-y: auto;
                font-family: 'Plus Jakarta Sans', sans-serif;
            }

            .manu-card {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(244, 114, 182, 0.2);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border-radius: 28px;
                padding: 36px 28px;
                max-width: 460px;
                width: 100%;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(244, 114, 182, 0.1);
                display: flex;
                flex-direction: column;
                align-items: center;
                box-sizing: border-box;
                position: relative;
            }

            .manu-badge {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: rgba(239, 68, 68, 0.12);
                border: 1px solid rgba(239, 68, 68, 0.3);
                color: #f87171;
                font-size: 0.72rem;
                font-weight: 700;
                letter-spacing: 1.2px;
                text-transform: uppercase;
                padding: 6px 14px;
                border-radius: 20px;
                margin-bottom: 20px;
            }

            .manu-badge-dot {
                width: 7px;
                height: 7px;
                background-color: #ef4444;
                border-radius: 50%;
                box-shadow: 0 0 8px #ef4444;
                animation: piscarStatus 1.5s infinite ease-in-out;
            }

            @keyframes piscarStatus {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.3; transform: scale(0.85); }
            }

            .manu-titulo {
                font-size: 1.6rem;
                font-weight: 800;
                color: #ffffff;
                margin: 0 0 10px 0;
                letter-spacing: -0.5px;
                background: linear-gradient(135deg, #ffffff 0%, #f472b6 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .manu-mensagem {
                font-size: 0.92rem;
                line-height: 1.6;
                color: #94a3b8;
                margin: 0 0 22px 0;
                font-weight: 400;
            }

            .manu-imagem-wrap {
                position: relative;
                margin-bottom: 24px;
            }

            .manu-imagem-wrap::after {
                content: '';
                position: absolute;
                bottom: -10px;
                left: 50%;
                transform: translateX(-50%);
                width: 60%;
                height: 15px;
                background: rgba(244, 114, 182, 0.3);
                filter: blur(12px);
                border-radius: 50%;
            }

            .manu-imagem {
                width: 100%;
                max-width: 180px;
                height: auto;
                object-fit: contain;
                filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5));
                animation: flutuarSoft 3.5s infinite ease-in-out;
            }

            @keyframes flutuarSoft {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-8px); }
            }

            /* Cronômetro Digital Futurista */
            .manu-cronograma {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 12px;
                margin-top: 5px;
            }

            .manu-previsao-txt {
                font-size: 0.72rem;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: 700;
            }

            .manu-previsao-txt span {
                color: #38bdf8;
            }

            .manu-boxes-tempo {
                display: flex;
                gap: 8px;
                justify-content: center;
            }

            .manu-box-num {
                background: rgba(15, 23, 42, 0.6);
                border: 1px solid rgba(244, 114, 182, 0.2);
                border-radius: 12px;
                padding: 8px 12px;
                min-width: 52px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .manu-box-num .val {
                font-size: 1.15rem;
                font-weight: 800;
                color: #f472b6;
            }

            .manu-box-num .lbl {
                font-size: 0.6rem;
                color: #64748b;
                text-transform: uppercase;
                font-weight: 600;
            }

            /* Área do Créditos preservada */
            #container-creditos-manu {
                margin-top: 20px;
                width: 100%;
            }

            @media (max-width: 480px) {
                .manu-card { padding: 28px 20px; }
                .manu-titulo { font-size: 1.35rem; }
                .manu-imagem { max-width: 150px; }
                .manu-box-num { min-width: 44px; padding: 6px 8px; }
                .manu-box-num .val { font-size: 0.98rem; }
            }
        `;
        document.head.appendChild(style);

        // ==========================================
        // 🏛️ CRIAÇÃO DA ESTRUTURA OVERLAY (Sem Apagar o Body)
        // ==========================================
        const overlay = document.createElement('div');
        overlay.id = 'tela-manutencao-overlay';

        overlay.innerHTML = `
            <div class="manu-card">
                <div class="manu-badge">
                    <span class="manu-badge-dot"></span>
                    <span>Manutenção Ativa</span>
                </div>

                <h2 class="manu-titulo">${titulo}</h2>
                <p class="manu-mensagem">${mensagem}</p>
                
                <div class="manu-imagem-wrap">
                    <img src="${imagemSorteada}" class="manu-imagem" alt="Manutenção">
                </div>
                
                <div id="bloco-cronograma" class="manu-cronograma" style="display: none;">
                    <div id="data-previsao-texto" class="manu-previsao-txt"></div>
                    <div id="contador-regressivo-boxes" class="manu-boxes-tempo"></div>
                </div>

                <div id="container-creditos-manu"></div>
            </div>
        `;

        document.body.appendChild(overlay);

        // ==========================================
        // ⏳ CRONÔMETRO REGRESSIVO DIGITAL
        // ==========================================
        if (dataAlvo && !isManual) {
            const blocoCronograma = document.getElementById('bloco-cronograma');
            const dataTextoEl = document.getElementById('data-previsao-texto');
            const boxesEl = document.getElementById('contador-regressivo-boxes');

            const alvoTimestamp = dataAlvo.getTime();

            const dia = String(dataAlvo.getDate()).padStart(2, '0');
            const mes = String(dataAlvo.getMonth() + 1).padStart(2, '0');
            const ano = dataAlvo.getFullYear();
            const horas = String(dataAlvo.getHours()).padStart(2, '0');
            const minutos = String(dataAlvo.getMinutes()).padStart(2, '0');

            dataTextoEl.innerHTML = `Previsão: <span>${dia}/${mes}/${ano} às ${horas}:${minutos}</span>`;
            blocoCronograma.style.display = 'flex';

            function atualizarRelogioRegressivo() {
                const agoraTimestamp = new Date().getTime();
                const diferenca = alvoTimestamp - agoraTimestamp;

                if (diferenca <= 0) {
                    clearInterval(intervaloCronometro);
                    window.location.reload();
                    return;
                }

                const tDias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
                const tHoras = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const tMinutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
                const tSegundos = Math.floor((diferenca % (1000 * 60)) / 1000);

                const dDisplay = String(tDias).padStart(2, '0');
                const hDisplay = String(tHoras).padStart(2, '0');
                const mDisplay = String(tMinutos).padStart(2, '0');
                const sDisplay = String(tSegundos).padStart(2, '0');

                boxesEl.innerHTML = `
                    ${tDias > 0 ? `<div class="manu-box-num"><span class="val">${dDisplay}</span><span class="lbl">Dias</span></div>` : ''}
                    <div class="manu-box-num"><span class="val">${hDisplay}</span><span class="lbl">Horas</span></div>
                    <div class="manu-box-num"><span class="val">${mDisplay}</span><span class="lbl">Min</span></div>
                    <div class="manu-box-num"><span class="val">${sDisplay}</span><span class="lbl">Seg</span></div>
                `;
            }

            atualizarRelogioRegressivo();
            const intervaloCronometro = setInterval(atualizarRelogioRegressivo, 1000);
        }

        // ==========================================
        // 🔒 PRESERVAÇÃO E REINJEÇÃO DO CREDITOS.JS
        // ==========================================
        window.addEventListener('DOMContentLoaded', () => {
            // Garante que se o creditos.js criar qualquer elemento, ele vá para a div interna da manutenção
            const scriptCreditos = document.createElement('script');
            scriptCreditos.src = './creditos.js';
            scriptCreditos.defer = true;
            document.body.appendChild(scriptCreditos);
        });
    }
})();

