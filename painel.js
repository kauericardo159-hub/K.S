(function() {
    'use strict';

    // Trava de segurança para o modo manutenção
    if (typeof emManutencao !== 'undefined' && emManutencao === true) return;

    // ==========================================
    // 📝 CENTRAL DE LINKS (HUB DE ECOSSISTEMA)
    // ==========================================
    const meusSites = [
        { nome: "VersosNossos", url: "https://kauericardo159-hub.github.io/Textoteca/index.html" }
    ];

    // ==========================================
    // ARQUITETURA E PROCESSAMENTO DO PAINEL
    // ==========================================
    const painelContainer = document.createElement('div');
    painelContainer.id = 'painel-sobre';
    // Inicializa oculto. O script de gatilho (geralmente botao.js) altera a classe para exibir
    painelContainer.className = 'paineis-ocultos';

    // Geração otimizada da árvore de links via Array.map (evita mutações repetitivas de string)
    const linksHTML = meusSites.map(site => {
        let urlIcone = './icon-192.png'; // Fallback nativo e limpo mapeado no Service Worker

        // Verifica se a URL é externa para capturar o favicon via API de alta resolução do Google
        if (!site.url.startsWith('./') && !site.url.startsWith('/') && site.url.includes('://')) {
            try {
                const dominio = new URL(site.url).hostname;
                urlIcone = `https://www.google.com/s2/favicons?domain=${dominio}&sz=64`;
            } catch (e) {
                // Mantém o fallback caso a URL seja malformada
            }
        }

        return `
            <a href="${site.url}" class="painel-item-link" target="_blank" rel="noopener noreferrer">
                <div class="painel-item-decoracao"></div>
                <img src="${urlIcone}" class="painel-item-favicon" alt="Favicon" onerror="this.src='./icon-192.png'">
                <span class="painel-item-texto">${site.nome}</span>
                <i class="fa-solid fa-chevron-right painel-item-seta"></i>
            </a>
        `;
    }).join('');

    // Injeção da infraestrutura semântica do painel
    painelContainer.innerHTML = `
        <div class="painel-scroll-wrapper">
            <div class="painel-secao-topo">
                <img src="./icon-192.png" class="painel-avatar-site" alt="Logotipo K & S">
                <h2 class="painel-titulo-principal">K & S - Conexão</h2>
            </div>

            <div class="painel-linha-separadora"></div>

            <div class="painel-secao-conteudo">
                <h3 class="painel-label-secao">Sites que possa ver também:</h3>
                <div class="painel-links-lista">
                    ${linksHTML}
                </div>
            </div>

            <div class="painel-linha-separadora"></div>

            <div id="container-creditos-interno"></div>
        </div>
    `;

    // Injeção segura no DOM assim que o corpo da página estiver pronto
    if (document.body) {
        document.body.appendChild(painelContainer);
        // Despacha um evento customizado avisando que o painel está montado no DOM
        window.dispatchEvent(new CustomEvent('painelConexaoMontado'));
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            document.body.appendChild(painelContainer);
            window.dispatchEvent(new CustomEvent('painelConexaoMontado'));
        });
    }
})();
