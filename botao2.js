(function() {
    'use strict';

    // Trava de segurança para evitar botões duplicados na tela
    if (document.getElementById('pwa-menu-container')) return;
    if (typeof window.emManutencao !== 'undefined' && window.emManutencao === true) return;

    // ==========================================
    // 1. INJEÇÃO DE ESTILOS CSS (CYBER GLASS)
    // ==========================================
    const estilos = `
      .menu-container {
        position: fixed;
        top: 18px;
        left: 18px;
        z-index: 10000;
        transform: translateZ(0); /* Aceleração via GPU */
        transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                    visibility 0.4s ease;
      }

      /* Quando o painel abre, o botão é ocultado suavemente */
      .menu-container.painel-aberto {
        opacity: 0;
        transform: translateX(-20px) scale(0.85);
        pointer-events: none;
        visibility: hidden;
      }

      .btn-hamburguer {
        position: relative;
        width: 48px;
        height: 48px;
        background: rgba(10, 12, 22, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1);
        padding: 0;
        outline: none;
      }

      .btn-hamburguer:hover {
        background: rgba(10, 12, 22, 0.9);
        border-color: rgba(0, 229, 255, 0.4);
        box-shadow: 0 0 20px rgba(0, 229, 255, 0.25),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2);
        transform: translateY(-2px) scale(1.02);
      }

      .btn-hamburguer:active {
        transform: translateY(0) scale(0.94);
      }

      .linha {
        width: 22px;
        height: 2.5px;
        background: linear-gradient(90deg, #ffffff, #e2e8f0);
        border-radius: 4px;
        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      }

      /* Estilização estilizada das linhas no hover */
      .btn-hamburguer:hover .linha:nth-child(1) {
        background: var(--kaue-rosa, #f472b6);
        width: 24px;
      }
      .btn-hamburguer:hover .linha:nth-child(2) {
        background: #ffffff;
      }
      .btn-hamburguer:hover .linha:nth-child(3) {
        background: var(--sky-ciano, #00e5ff);
        width: 24px;
      }

      /* Animação em X quando ativo */
      .btn-hamburguer.ativo .linha:nth-child(1) {
        transform: translateY(7.5px) rotate(45deg);
        background: var(--kaue-rosa, #f472b6);
      }
      .btn-hamburguer.ativo .linha:nth-child(2) {
        opacity: 0;
        transform: scaleX(0);
      }
      .btn-hamburguer.ativo .linha:nth-child(3) {
        transform: translateY(-7.5px) rotate(-45deg);
        background: var(--sky-ciano, #00e5ff);
      }

      @media (max-width: 767px) {
        .menu-container {
          top: 14px;
          left: 14px;
        }
        .btn-hamburguer {
          width: 44px;
          height: 44px;
        }
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
    botao.setAttribute("aria-label", "Abrir Painel de Conexões");

    for (let i = 0; i < 3; i++) {
        const linha = document.createElement("span");
        linha.className = "linha";
        botao.appendChild(linha);
    }

    container.appendChild(botao);
    
    const injetarNoDOM = () => {
        if (!document.getElementById("pwa-menu-container")) {
            document.body.appendChild(container);
        }
    };

    if (document.body) {
        injetarNoDOM();
    } else {
        window.addEventListener('DOMContentLoaded', injetarNoDOM);
    }

    // ==========================================
    // 3. LOGICA DE CONTROLE E INTEGRAÇÃO
    // ==========================================
    function alternarEstadoPainel(e) {
        if (e) e.stopPropagation();

        // Tenta usar o método global exportado pelo painel.js
        if (typeof window.togglePainelConexao === "function") {
            window.togglePainelConexao();
        } else {
            // Fallback manual de segurança
            const painel = document.getElementById("painel-sobre");
            if (painel) {
                painel.classList.toggle("paineis-ocultos");
            }
        }
    }

    botao.addEventListener("click", alternarEstadoPainel);

    // Fechamento ao clicar fora do painel e do botão
    document.addEventListener("click", (e) => {
        const painel = document.getElementById("painel-sobre");
        if (painel && !painel.contains(e.target) && !container.contains(e.target)) {
            if (!painel.classList.contains("paineis-ocultos")) {
                if (typeof window.fecharPainelConexao === "function") {
                    window.fecharPainelConexao();
                } else {
                    painel.classList.add("paineis-ocultos");
                }
            }
        }
    });

    // ==========================================
    // 4. SINCRONIZADOR BI-DIRECIONAL (OBSERVER)
    // Esconde o botão se o painel estiver ABERTO
    // ==========================================
    const sincronizarBotaoComPainel = () => {
        const painel = document.getElementById("painel-sobre");
        if (!painel) return;

        const atualizarVisibilidadeBotao = () => {
            const estaOculto = painel.classList.contains("paineis-ocultos");

            if (estaOculto) {
                // Painel FECHADO -> Botão VISÍVEL
                container.classList.remove("painel-aberto");
                botao.classList.remove("ativo");
            } else {
                // Painel ABERTO -> Botão DESAPARECE
                container.classList.add("painel-aberto");
                botao.classList.add("ativo");
            }
        };

        // Estado inicial
        atualizarVisibilidadeBotao();

        // Monitor de mudanças de classe e estilo no painel
        const observer = new MutationObserver(atualizarVisibilidadeBotao);
        observer.observe(painel, { attributes: true, attributeFilter: ["class", "style", "aria-hidden"] });
    };

    // Inicializa a escuta após montagem do DOM
    window.addEventListener('painelConexaoMontado', sincronizarBotaoComPainel);
    setTimeout(sincronizarBotaoComPainel, 400);
})();
