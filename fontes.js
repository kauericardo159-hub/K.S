(function() {
    'use strict';

    // Trava de segurança para o modo manutenção
    if (typeof emManutencao !== 'undefined' && emManutencao === true) return;

    // --- 1. ACELERAÇÃO DE CARREGAMENTO (PRECONNECT) ---
    // Estabelece conexões antecipadas com os servidores do Google Fonts para mitigar o efeito de "piscada" de fonte
    const preconnectFontes = document.createElement('link');
    preconnectFontes.rel = 'preconnect';
    preconnectFontes.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnectFontes);

    const preconnectGstatic = document.createElement('link');
    preconnectGstatic.rel = 'preconnect';
    preconnectGstatic.href = 'https://fonts.gstatic.com';
    preconnectGstatic.crossOrigin = 'anonymous';
    document.head.appendChild(preconnectGstatic);

    // Importação assíncrona da fonte Patrick Hand (Estilo Handwritten/Jazz)
    const linkFonte = document.createElement('link');
    linkFonte.rel = 'stylesheet';
    linkFonte.href = 'https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap';
    document.head.appendChild(linkFonte);

    // --- 2. INJEÇÃO DE ARQUITETURA TIPOGRÁFICA COERENTE ---
    const estilosFontes = document.createElement('style');
    estilosFontes.textContent = `
        /* Define a tipografia manuscrita como base estrutural do app */
        html, body, p, div {
            font-family: 'Patrick Hand', 'Cool Jazz', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        /* FIX CRÍTICO: Altera a fonte dos cronômetros sem anular o tamanho responsivo (clamp) definido nos CSSs */
        .valor, 
        .tempo-destaque {
            font-family: 'Patrick Hand', sans-serif !important;
        }

        /* --- SALVAGUARDA E BLINDAGEM DE INTERFACE --- */

        /* Proteção do Font Awesome: Evita que ícones quebrem e exibam quadrados brancos "[]" */
        .fa, .fas, .far, .fab, .fa-solid, .fa-regular, .fa-brands, i {
            font-family: 'Font Awesome 6 Free', 'Font Awesome 6 Brands', 'Font Awesome' !important;
            font-weight: 900 !important;
        }

        /* Mantém estritamente a fonte Poppins onde o design exige alta legibilidade, peso técnico e elegância */
        .card-secundario-titulo, 
        .nome, 
        .subtitulo,
        .pwa-txt-titulo,
        .creditos-texto,
        button,
        .btn-acao {
            font-family: 'Poppins', sans-serif !important;
        }
    `;

    document.head.appendChild(estilosFontes);
})();
