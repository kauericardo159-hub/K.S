(function() {
    'use strict';

    // Trava de segurança para evitar botões duplicados na tela
    if (document.getElementById('pwa-menu-container')) return;
    if (typeof window.emManutencao !== 'undefined' && window.emManutencao === true) return;

    // ==========================================
    // 1. INJEÇÃO DE ESTILOS CSS (EDIÇÃO DIA DOS NAMORADOS)
    // ==========================================
    const estilos = `
      .menu-container {
        position: fixed;
        top: 15px;
        left: 15px;
        z-index: 10000;
        transform: translateZ(0); /* Força aceleração por GPU */
      }

      .btn-hamburguer {
        width: 50px;
        height: 50px;
        background-color: rgba(6, 4, 10, 0.7); /* Sincronizado com o tema escuro apaixonado */
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 14px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        position: relative;
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                    background-color 0.3s ease, 
                    box-shadow 0.3s ease;
        backdrop-filter: blur(25px) saturate(120%);
        -webkit-backdrop-filter: blur(25px) saturate(120%);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5),
                    inset 0 1px 1px rgba(254, 226, 226, 0.04);
        padding: 0;
      }

      /* Borda oculta que acende em gradiente dinâmico no hover */
      .btn-hamburguer::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 14px;
        padding: 1.5px; 
        background: linear-gradient(135deg, #f472b6, #ef4444, #00e5ff);
        background-size: 200% 200%;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.4s ease;
        animation: moverGradienteMenu 4s linear infinite;
      }

      .btn-hamburguer:hover {
        background-color: rgba(10, 6, 15, 0.85);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.65), 
                    0 0 15px rgba(239, 68, 68, 0.15);
      }

      .btn-hamburguer:hover::before {
        opacity: 1;
      }

      .btn-hamburguer:active {
        transform: scale(0.92);
      }

      .linha {
        width: 22px;
        height: 3px;
        background-color: #f8fafc;
        border-radius: 2px;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 2;
      }

      /* Transformação em X romântica e premium */
      .btn-hamburguer.ativo .linha:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
        background-color: #ef4444; /* Vermelho Namorados */
        filter: drop-shadow(0 0 4px #ef4444);
      }
      .btn-hamburguer.ativo .linha:nth-child(2) {
        opacity: 0;
        transform: scale(0);
      }
      .btn-hamburguer.ativo .linha:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
        background-color: #00e5ff; /* Ciano Sky */
        filter: drop-shadow(0 0 4px #00e5ff);
      }

      @keyframes moverGradienteMenu {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.textContent = estilos;
    document.head.appendChild(styleSheet);

    // ==========================================
    // 2. CONSTRUÇÃO DO COMPONENTE NO DOM
    // ==========================================
    const container = document.createElement("div");
    container.id = "pwa-menu-container";
    container.className = "menu-container";

    const botao = document.createElement("button");
    botao.className = "btn-hamburguer";
    botao.setAttribute("aria-label", "Alternar Painel Sobre");

    for (let i = 0; i < 3; i++) {
        const linha = document.createElement("span");
        linha.className = "linha";
        botao.appendChild(linha);
    }

    container.appendChild(botao);
    
    // Injeção direta e segura
    if (document.body) {
        document.body.appendChild(container);
    } else {
        window.addEventListener('DOMContentLoaded', () => document.body.appendChild(container));
    }

    // ==========================================
    // 3. LOGICA DE CONTROLE E EVENTOS
    // ==========================================
    function gerenciarAberturaMenu(e) {
        if (e) e.stopPropagation();
        const painel = document.getElementById("painel-sobre");
        
        if (painel) {
            botao.classList.toggle("ativo");
            
            if (painel.classList.contains("paineis-ocultos")) {
                painel.classList.remove("paineis-ocultos");
                painel.style.display = "block";
            } else {
                painel.classList.add("paineis-ocultos");
                setTimeout(() => {
                    if (painel.classList.contains("paineis-ocultos")) {
                        painel.style.display = "none";
                    }
                }, 300);
            }
        }

        if (typeof window.alternarPainel === "function") {
            window.alternarPainel();
        }
    }

    botao.addEventListener("click", gerenciarAberturaMenu);

    // Fechamento inteligente ao clicar fora
    document.addEventListener("click", (e) => {
        const painel = document.getElementById("painel-sobre");
        if (painel && !painel.contains(e.target) && !botao.contains(e.target)) {
            if (!painel.classList.contains("paineis-ocultos")) {
                botao.classList.remove("ativo");
                painel.classList.add("paineis-ocultos");
                setTimeout(() => { painel.style.display = "none"; }, 300);
            }
        }
    });

    // ==========================================
    // 4. SINCRONIZADOR BI-DIRECIONAL (MUTATION OBSERVER)
    // ==========================================
    const monitorarPainel = () => {
        const painel = document.getElementById("painel-sobre");
        if (!painel) return;

        const observer = new MutationObserver(() => {
            const painelOculto = painel.classList.contains("paineis-ocultos") || painel.style.display === "none";
            if (painelOculto && botao.classList.contains("ativo")) {
                botao.classList.remove("ativo");
            } else if (!painelOculto && !botao.classList.contains("ativo")) {
                botao.classList.add("ativo");
            }
        });

        observer.observe(painel, { attributes: true, attributeFilter: ["class", "style"] });
    };

    setTimeout(monitorarPainel, 500);
})();
