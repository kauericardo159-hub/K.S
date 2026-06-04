// 1. Criar e injetar os estilos CSS na página
const estilos = `
  .menu-container {
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 10000; /* Garante que fique acima de quase tudo */
  }

  .btn-hamburguer {
    width: 50px;
    height: 50px;
    background-color: rgba(14, 16, 27, 0.7); /* Tom escuro idêntico ao painel */
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px; /* Bordas mais suaves combinando com o painel */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .btn-hamburguer:hover {
    background-color: rgba(14, 16, 27, 0.9);
    border-color: rgba(0, 229, 255, 0.3); /* Brilho ciano Sky no hover */
  }

  .btn-hamburguer:active {
    transform: scale(0.92);
  }

  /* As três linhas brancas */
  .linha {
    width: 24px;
    height: 3px;
    background-color: #ffffff;
    border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  }

  /* Animação para transformar o Hamburguer em um "X" */
  .btn-hamburguer.ativo .linha:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
    background-color: #f472b6; /* Linha Rosa Kauê */
  }
  .btn-hamburguer.ativo .linha:nth-child(2) {
    opacity: 0;
    transform: scale(0);
  }
  .btn-hamburguer.ativo .linha:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
    background-color: #00e5ff; /* Linha Ciano Sky */
  }
`;

// Injeta o CSS no <head> do HTML
const styleSheet = document.createElement("style");
styleSheet.innerText = estilos;
document.head.appendChild(styleSheet);

// 2. Criar a estrutura do botão
const container = document.createElement("div");
container.className = "menu-container";

const botao = document.createElement("button");
botao.className = "btn-hamburguer";
botao.setAttribute("aria-label", "Alternar Painel Sobre");

// Cria as 3 linhas do ícone
for (let i = 0; i < 3; i++) {
  const linha = document.createElement("span");
  linha.className = "linha";
  botao.appendChild(linha);
}

container.appendChild(botao);

// Executa e gerencia os eventos do DOM
document.addEventListener("DOMContentLoaded", () => {
  document.body.appendChild(container);
  
  // 3. Evento de clique para ativar/ocultar o painel.js
  botao.addEventListener("click", (e) => {
    e.stopPropagation(); // Evita que o clique feche o menu imediatamente
    
    const painel = document.getElementById("painel-sobre");
    
    if (painel) {
      // Alterna a classe visual do botão (Hambúrguer <-> X)
      botao.classList.toggle("ativo");
      
      // Controla as classes do ecossistema do seu app para exibir e ocultar
      if (painel.classList.contains("paineis-ocultos")) {
        painel.classList.remove("paineis-ocultos");
        painel.style.display = "block"; // Garante a renderização física
        // Se houver função de animação de entrada no seu app, ela assume aqui
      } else {
        painel.classList.add("paineis-ocultos");
        // Dá um pequeno tempo para a animação CSS acontecer antes de ocultar
        setTimeout(() => {
          if (painel.classList.contains("paineis-ocultos")) {
            painel.style.display = "none";
          }
        }, 300);
      }
    }
    
    // Mantém compatibilidade com funções globais antigas do sistema, se houverem
    if (typeof alternarPainel === "function") {
      alternarPainel();
    }
  });

  // Fechamento inteligente: Clicar fora do painel também recolhe o menu e reseta o botão
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
});
