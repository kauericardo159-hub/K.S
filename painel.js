(function() {
    'use strict';

    // Trava de segurança para evitar duplicidade ou execução em modo manutenção
    if (document.getElementById('painel-sobre')) return;
    if (typeof window.emManutencao !== 'undefined' && window.emManutencao === true) return;

    // ==========================================
    // 📝 CENTRAL DE LINKS (HUB DE ECOSSISTEMA)
    // ==========================================
    const meusSites = [
        { nome: "VersosNossos", url: "https://kauericardo159-hub.github.io/VersosNossos/" }
    ];

    // ==========================================
    // ARQUITETURA E PROCESSAMENTO DO PAINEL
    // ==========================================
    const painelContainer = document.createElement('div');
    painelContainer.id = 'painel-sobre';
    
    // Mantém a classe sincronizada com o botão para controle de visibilidade
    painelContainer.className = 'paineis-ocultos';

    // Geração da árvore de links com varredura avançada para domínios e GitHub Pages
    const linksHTML = meusSites.map(site => {
        let urlIcone = './icon-192.png'; 

        if (!site.url.startsWith('./') && !site.url.startsWith('/') && site.url.includes('://')) {
            try {
                // Usamos a URL completa no serviço gstatic do Google, que resolve melhor caminhos de subpastas do GitHub
                urlIcone = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(site.url)}&sz=64`;
            } catch (e) {
                // Mantém o fallback caso a URL seja malformada
            }
        }

        // Script de Erro Inteligente em Cadeia:
        // 1. Se falhar com a URL completa, tenta buscar apenas pelo domínio limpo (DuckDuckGo).
        // 2. Se falhar, tenta buscar o favicon.ico direto na raiz do projeto (ex: site.url + /favicon.ico).
        // 3. Se tudo falhar, usa o logo padrão do app (./icon-192.png).
        const fallbackScript = `
            this.onerror = null;
            try {
                const urlObj = new URL('${site.url}');
                const dominio = urlObj.hostname;
                
                // Passo 1: Tenta DuckDuckGo com o domínio
                this.src = 'https://icons.duckduckgo.com/ip3/' + dominio + '.ico';
                
                this.onerror = () => {
                    // Passo 2: Tenta ler o arquivo favicon diretamente da raiz do próprio site
                    this.src = urlObj.origin + urlObj.pathname + (urlObj.pathname.endsWith('/') ? '' : '/') + 'favicon.ico';
                    
                    this.onerror = () => {
                        // Passo 3: Fallback final seguro
                        this.src = './icon-192.png';
                    };
                };
            } catch(err) {
                this.src = './icon-192.png';
            }
        `;

        return `
            <a href="${site.url}" class="painel-item-link" target="_blank" rel="noopener noreferrer">
                <div class="painel-item-decoracao"></div>
                <img src="${urlIcone}" class="painel-item-favicon" alt="Favicon" onerror="${fallbackScript.replace(/\s+/g, ' ')}">
                <span class="painel-item-texto">${site.nome}</span>
                <i class="fa-solid fa-chevron-right painel-item-seta"></i>
            </a>
        `;
    }).join('');

    // Injeção da estrutura interna do painel
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

    // Injeção segura e imediata no DOM
    if (document.body) {
        document.body.appendChild(painelContainer);
        window.dispatchEvent(new CustomEvent('painelConexaoMontado'));
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            document.body.appendChild(painelContainer);
            window.dispatchEvent(new CustomEvent('painelConexaoMontado'));
        });
    }
})();
