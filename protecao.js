(function() {
    'use strict';

    // Bloqueia o clique com o botão direito do mouse no site inteiro
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    }, false);

    // Bloqueia atalhos de teclado usados para salvar imagens ou inspecionar código
    document.addEventListener('keydown', (e) => {
        // Bloqueia F12
        if (e.key === 'F12') {
            e.preventDefault();
        }
        // Bloqueia Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (Inspecionar do Chrome/Firefox)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
            e.preventDefault();
        }
        // Bloqueia Ctrl+U (Exibir código fonte)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
        }
        // Bloqueia Ctrl+S (Salvar página completa)
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
        }
    }, false);

    // Evita o arrastar e soltar (drag and drop) de imagens para fora do site
    document.addEventListener('dragstart', (e) => {
        if (e.target.nodeName === 'IMG') {
            e.preventDefault();
        }
    }, false);
})();
