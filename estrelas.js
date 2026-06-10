(function() {
    'use strict';

    // CORREÇÃO: Alinhamento seguro com o escopo global do index.html
    if (typeof window.emManutencao !== 'undefined' && window.emManutencao === true) return;

    // --- 1. INJEÇÃO DE ARQUITETURA VISUAL E ACELERAÇÃO DE HARDWARE ---
    const style = document.createElement('style');
    style.textContent = `
        /* Camada dedicada isolada abaixo dos cartões e acima do fundo estático */
        #universo-canvas-estrelado {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: -1; /* Posicionamento perfeito entre o background e os cards */
            transform: translateZ(0);
            will-change: opacity;
        }

        /* REMOVIDO: O body::after que forçava a rolagem de 380px para baixo foi eliminado */
        html {
            scroll-behavior: smooth;
        }
    `;
    document.head.appendChild(style);

    // --- 2. CRIAÇÃO E CONFIGURAÇÃO DO CANVAS ---
    const canvas = document.createElement('canvas');
    canvas.id = 'universo-canvas-estrelado';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d', { alpha: true }); // Otimiza o canal alpha nativamente

    // Glifos afetivos e paleta oficial calibrada
    const glifosEstrelas = ['☆', '★', '✧', '•', '°', '✮', '✯', '✩', '✬', '✰'];
    const coresTema = [
        { r: 255, g: 255, b: 255 }, // Branco Puro
        { r: 0,   g: 229, b: 255 }, // Ciano da Sky (#00e5ff)
        { r: 244, g: 114, b: 182 }  // Rosa do Kauê (#f472b6)
    ];

    const estrelas = [];
    const maxEstrelas = window.innerWidth < 600 ? 35 : 80;

    // FIX COORDENADAS: Redimensiona o canvas e redistribui as estrelas sem aglomerá-las no topo
    function redimensionarCanvas() {
        const larguraAntiga = canvas.width;
        const alturaAntiga = canvas.height;
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Se o app já tiver estrelas criadas, recalcula as posições proporcionalmente à nova tela
        if (estrelas.length > 0 && larguraAntiga > 0 && alturaAntiga > 0) {
            estrelas.forEach(e => {
                e.x = (e.x / larguraAntiga) * canvas.width;
                e.y = (e.y / alturaAntiga) * canvas.height;
            });
        }
    }
    
    redimensionarCanvas();
    window.addEventListener('resize', redimensionarCanvas);

    // --- 3. GERAÇÃO DO ECOSSISTEMA DE ESTRELAS ---
    for (let i = 0; i < maxEstrelas; i++) {
        const chanceCor = Math.random();
        let corEscolhida = coresTema[0]; // Branco (Predominante)
        
        if (chanceCor > 0.55 && chanceCor <= 0.80) corEscolhida = coresTema[1]; // Ciano
        if (chanceCor > 0.80) corEscolhida = coresTema[2]; // Rosa

        estrelas.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            caractere: glifosEstrelas[Math.floor(Math.random() * glifosEstrelas.length)],
            tamanho: Math.floor(Math.random() * 7) + 8, // Diâmetro elegante: 8px a 15px
            cor: corEscolhida,
            opacidadeBase: Math.random() * 0.30 + 0.20,
            velocidadeCintilacao: Math.random() * 0.015 + 0.005,
            fase: Math.random() * Math.PI
        });
    }

    // --- 4. ENGINE DE ANIMAÇÃO A 60FPS (LOOP REALTIME) ---
    function animarCeuEstrelado() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < maxEstrelas; i++) {
            const e = estrelas[i];

            // Ciclo trigonométrico senoidal contínuo para oscilação orgânica de brilho
            e.fase += e.velocidadeCintilacao;
            const oscilacao = (Math.sin(e.fase) + 1) / 2;
            const opacidadeFinal = e.opacidadeBase + oscilacao * (0.80 - e.opacidadeBase);

            /* REMOVIDO: O cálculo de fade-out da margem inferior foi removido. 
               As estrelas mantêm o brilho 100% íntegro pela tela toda. */

            // PERFORMANCE BOOSTER: Aplica efeito Glow de desfoque de forma controlada apenas no Desktop
            if (window.innerWidth > 600 && (e.cor.g !== 255 || e.tamanho > 12)) {
                ctx.shadowBlur = 6;
                ctx.shadowColor = `rgba(${e.cor.r}, ${e.cor.g}, ${e.cor.b}, ${opacidadeFinal})`;
            } else {
                ctx.shadowBlur = 0; // Desliga totalmente o cálculo de desfoque no Mobile para poupar CPU e bateria
            }

            // Injeção de estilo e renderização do glifo textual na matriz de pixels
            ctx.fillStyle = `rgba(${e.cor.r}, ${e.cor.g}, ${e.cor.b}, ${opacidadeFinal})`;
            ctx.font = `bold ${e.tamanho}px Arial, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            ctx.fillText(e.caractere, e.x, e.y);
        }

        // Devolve o controle de sincronia vertical vertical de tela para o motor do browser
        requestAnimationFrame(animarCeuEstrelado);
    }

    // Dispara a inicialização da renderização
    requestAnimationFrame(animarCeuEstrelado);
})();
