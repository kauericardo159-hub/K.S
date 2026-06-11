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

    // Geração da árvore de links com prioridade absoluta para a pasta assets/sites/
    const linksHTML = meusSites.map(site => {
        // 1. Definição do caminho local prioritário baseado no nome do site (ex: versosnossos.png)
        const nomeArquivoNormalizado = site.nome.toLowerCase().replace(/\s+/g, '');
        const urlIconeLocal = `./assets/sites/${nomeArquivoNormalizado}.png`;

        // Mecanismo de Fallback Inteligente em Cadeia se a imagem local falhar:
        // Passo 1: Se o .png local não existir, tenta o gstatic do Google com a URL completa.
        // Passo 2: Se falhar, tenta o DuckDuckGo com o domínio limpo.
        // Passo 3: Se falhar, tenta buscar o favicon.ico na raiz do site remoto.
        // Passo 4: Fallback definitivo usando o ícone padrão do aplicativo.
        const fallbackScript = `
            this.onerror = null;
            try {
                // Passo 1: Tenta o serviço premium do Google usando a URL do site
                this.src = 'https://www.google.com/s2/favicons?domain=' + encodeURIComponent('${site.url}') + '&sz=64';
                
                this.onerror = () => {
                    const urlObj = new URL('${site.url}');
                    const dominio = urlObj.hostname;
                    
                    // Passo 2: Tenta o DuckDuckGo
                    this.src = 'https://icons.duckduckgo.com/ip3/' + dominio + '.ico';
                    
                    this.onerror = () => {
                        // Passo 3: Tenta puxar direto da raiz do servidor deles
                        this.src = urlObj.origin + urlObj.pathname + (urlObj.pathname.endsWith('/') ? '' : '/') + 'favicon.ico';
                        
                        this.onerror = () => {
                            // Passo 4: Fallback final de segurança
                            this.src = './icon-192.png';
                        };
                    };
                };
            } catch(err) {
                this.src = './icon-192.png';
            }
        `;

        return `
            <a href="${site.url}" class="painel-item-link" target="_blank" rel="noopener noreferrer">
                <div class="painel-item-decoracao"></div>
                <img src="${urlIconeLocal}" class="painel-item-favicon" alt="Favicon ${site.nome}" onerror="${fallbackScript.replace(/\s+/g, ' ')}">
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
