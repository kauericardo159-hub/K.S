(function() {
    'use strict';

    // Trava de segurança para evitar botões duplicados na tela
    if (document.getElementById('pwa-menu-container')) return;
    if (typeof window.emManutencao !== 'undefined' && window.emManutencao === true) return;

    // ==========================================
    // 1. INJEÇÃO DE ESTILOS CSS (DARK PREMIUM)
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
        background-color: rgba(10, 12, 22, 0.7); /* Sincronizado com var(--bg-absoluto) */
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        padding: 0;
      }

      .btn-hamburguer:hover {
        background-color: rgba(10, 12, 22, 0.9);
        border-color: rgba(0, 229, 255, 0.4); /* Brilho Ciano Sky */
        box-shadow: 0 0 15px rgba(0, 229, 255, 0.2);
      }

      .btn-hamburguer:active {
        transform: scale(0.92);
      }

      .linha {
        width: 22px;
        height: 3px;
        background-color: #ffffff;
        border-radius: 2px;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }

      /* Transformação em X com as cores oficiais do ecossistema */
      .btn-hamburguer.ativo .linha:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
        background-color: #f472b6; /* Rosa Kauê */
      }
      .btn-hamburguer.ativo .linha:nth-child(2) {
        opacity: 0;
        transform: scale(0);
      }
      .btn-hamburguer.ativo .linha:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
        background-color: #00e5ff; /* Ciano Sky */
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
    
    // Injeção direta e segura (independe do carregamento do DOM estar adiantado ou atrasado)
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
    // Se o painel for fechado por um botão interno dele, o hamburguer reseta sozinho
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

    // Inicializa o monitoramento assim que o painel estiver disponível
    setTimeout(monitorarPainel, 500);
})();
