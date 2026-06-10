(function() {
    'use strict';

    // Trava de segurança para o modo manutenção global
    if (typeof window.emManutencao !== 'undefined' && window.emManutencao === true) return;

    // 1. Bloqueia o menu de contexto (clique com o botão direito) no site inteiro
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    }, false);

    // 2. Bloqueia seleção de texto indesejada por arraste de mouse
    document.addEventListener('selectstart', (e) => {
        // Permite seleção apenas se for dentro de um campo de input/textarea (caso existam no futuro)
        if (e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'TEXTAREA') {
            e.preventDefault();
        }
    }, false);

    // 3. Bloqueia atalhos de teclado avançados (Windows, Linux e macOS)
    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        const code = e.code;

        // Bloqueia a tecla F12 de forma universal
        if (code === 'F12' || key === 'f12') {
            e.preventDefault();
            return;
        }

        // --- SISTEMAS WINDOWS / LINUX (Control) ---
        if (e.ctrlKey) {
            // Ctrl+U (Código-fonte) e Ctrl+S (Salvar página)
            if (key === 'u' || key === 's') {
                e.preventDefault();
            }
            // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (Inspecionar ferramentas Chromium)
            // Ctrl+Shift+K (Console do Firefox)
            if (e.shiftKey && (key === 'i' || key === 'j' || key === 'c' || key === 'k')) {
                e.preventDefault();
            }
        }

        // --- SISTEMA MAC / APPLE (Command + Option / Shift) ---
        if (e.metaKey) {
            // Cmd+S (Salvar no Mac)
            if (key === 's') {
                e.preventDefault();
            }
            // Cmd+Option+I, Cmd+Option+C, Cmd+Option+U (Inspecionar e Código-fonte no Safari/Chrome Mac)
            if (e.altKey && (key === 'i' || key === 'c' || key === 'u')) {
                e.preventDefault();
            }
        }
    }, false);

    // 4. Evita o arrastar e soltar (drag and drop) de imagens e links para fora do site
    document.addEventListener('dragstart', (e) => {
        const tag = e.target.nodeName;
        if (tag === 'IMG' || tag === 'A') {
            e.preventDefault();
        }
    }, false);
})();
