(function() {
    'use strict';

    // Verifica de forma segura se a manutenção precisa ser exibida
    if (typeof emManutencao !== 'undefined' && emManutencao === true) {
        
        // ==========================================
        // 🖼️ BANCO DE IMAGENS DA MANUTENÇÃO (Edite Aqui!)
        // ==========================================
        // Pode colocar arquivos .png, .jpg ou .gif aqui.
        const imagensManutencao = [
            "manu1.png",
            "manu2.png",
            "protogen.gif"
        ];

        // Sorteia uma imagem/gif da lista acima
        const imagemSorteada = imagensManutencao[Math.floor(Math.random() * imagensManutencao.length)];

        // Fallbacks de segurança caso as variáveis globais não estejam prontas
        const titulo = typeof tituloManutencao !== 'undefined' ? tituloManutencao : "Grande Atualização";
        const mensagem = typeof mensagemManutencao !== 'undefined' ? mensagemManutencao : "O site está recebendo melhorias.";
        const isManual = typeof emManutencaoManual !== 'undefined' ? emManutencaoManual : false;
        const dataAlvo = typeof dataAlvoObjeto !== 'undefined' ? dataAlvoObjeto : null;
        
        // ==========================================
        // ✨ INTERFACE CLEAN E RESPONSIVA
        // ==========================================
        const style = document.createElement('style');
        style.textContent = `
            #tela-manutencao {
                position: fixed;
                top: 0; left: 0; width: 100vw; height: 100vh;
                background: #090b11;
                color: #f8fafc;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                z-index: 999999;
                text-align: center;
                padding: 24px;
                box-sizing: border-box;
                overflow-y: auto;
            }

            .manu-wrapper {
                display: flex;
                flex-direction: column;
                align-items: center;
                max-width: 500px;
                width: 100%;
                margin: auto;
            }

            .manu-titulo {
                font-family: 'Poppins', sans-serif !important;
                font-size: 1.8rem;
                font-weight: 800;
                color: #ffffff;
                margin: 0 0 12px 0;
                letter-spacing: -0.5px;
            }

            .manu-mensagem {
                font-size: 1.1rem; /* Alinhado com a fonte Patrick Hand */
                line-height: 1.5;
                color: #94a3b8;
                margin: 0 0 24px 0; /* Margem inferior para afastar a imagem que vem abaixo */
            }

            /* Estilização da Imagem/GIF colocada abaixo do texto */
            .manu-imagem {
                width: 100%;
                max-width: 220px;
                height: auto;
                object-fit: contain;
                margin-bottom: 24px;
                filter: drop-shadow(0 8px 25px rgba(244, 114, 182, 0.25));
                animation: flutuarImagem 4s ease-in-out infinite;
            }

            @keyframes flutuarImagem {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }

            .manu-cronograma {
                margin-top: 10px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                width: 100%;
            }

            .manu-previsao-txt {
                font-family: 'Poppins', sans-serif;
                font-size: 0.75rem;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                font-weight: 700;
            }

            .manu-previsao-txt span {
                color: #00e5ff;
            }

            .manu-relogio {
                font-family: 'Poppins', sans-serif;
                font-size: 1.1rem;
                font-weight: 700;
                color: #f472b6;
                background: rgba(254, 244, 248, 0.03);
                border: 1px solid rgba(244, 114, 182, 0.15);
                padding: 8px 20px;
                border-radius: 14px;
                display: inline-block;
                margin: 0 auto;
            }

            .container-erro {
                width: 100%;
                margin-top: 30px;
            }

            @media (max-width: 480px) {
                .manu-imagem { max-width: 170px; }
                .manu-titulo { font-size: 1.45rem; }
                .manu-mensagem { font-size: 1rem; }
                .manu-relogio { font-size: 0.95rem; padding: 6px 16px; }
            }
        `;
        document.head.appendChild(style);

        // ==========================================
        // 🏛️ MONTAGEM DO DOM ALTERADA (Imagem Abaixo)
        // ==========================================
        document.body.innerHTML = `
            <div id="tela-manutencao">
                <div class="manu-wrapper">
                    <h2 class="manu-titulo">${titulo}</h2>
                    
                    <p class="manu-mensagem">${mensagem}</p>
                    
                    <img src="${imagemSorteada}" class="manu-imagem" alt="Manutenção">
                    
                    <div id="bloco-cronograma" class="manu-cronograma" style="display: none;">
                        <div id="data-previsao-texto" class="manu-previsao-txt"></div>
                        <div id="contador-regressivo-tempo" class="manu-relogio"></div>
                    </div>

                    <div class="container-erro"></div>
                </div>
            </div>
        `;

        // ==========================================
        // ⏳ CRONÔMETRO REGRESSIVO
        // ==========================================
        if (dataAlvo && !isManual) {
            const blocoCronograma = document.getElementById('bloco-cronograma');
            const dataTextoEl = document.getElementById('data-previsao-texto');
            const contadorEl = document.getElementById('contador-regressivo-tempo');

            const alvoTimestamp = dataAlvo.getTime();

            const dia = String(dataAlvo.getDate()).padStart(2, '0');
            const mes = String(dataAlvo.getMonth() + 1).padStart(2, '0');
            const ano = dataAlvo.getFullYear();
            const horas = String(dataAlvo.getHours()).padStart(2, '0');
            const minutos = String(dataAlvo.getMinutes()).padStart(2, '0');

            dataTextoEl.innerHTML = `Previsão de liberação: <span>${dia}/${mes}/${ano} às ${horas}:${minutos}</span>`;
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

                const hDisplay = String(tHoras).padStart(2, '0');
                const mDisplay = String(tMinutos).padStart(2, '0');
                const sDisplay = String(tSegundos).padStart(2, '0');

                if (tDias > 0) {
                    contadorEl.innerText = `Libera em: ${tDias}d ${hDisplay}h ${mDisplay}m ${sDisplay}s`;
                } else {
                    contadorEl.innerText = `Libera em: ${hDisplay}h ${mDisplay}m ${sDisplay}s`;
                }
            }

            atualizarRelogioRegressivo();
            const intervaloCronometro = setInterval(atualizarRelogioRegressivo, 1000);
        }
    }
})();
