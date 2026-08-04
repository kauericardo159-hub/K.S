(function() {
    'use strict';

    // Trava de segurança para evitar duplicidade ou execução em modo manutenção
    if (document.getElementById('painel-sobre')) return;
    if (typeof window.emManutencao !== 'undefined' && window.emManutencao === true) return;

    // ==========================================
    // 📝 CENTRAL DE LINKS (HUB DE ECOSSISTEMA)
    // Adicione novos projetos a esta lista
    // ==========================================
    const meusSites = [
        { 
            nome: "VersosNossos", 
            url: "https://kauericardo159-hub.github.io/VersosNossos/",
            descricao: "Espaço de poéticas e composições"
        }
    ];

    // ==========================================
    // ARQUITETURA E PROCESSAMENTO DO PAINEL
    // ==========================================
    const painelContainer = document.createElement('aside');
    painelContainer.id = 'painel-sobre';
    painelContainer.className = 'paineis-ocultos';
    painelContainer.setAttribute('aria-hidden', 'true');
    painelContainer.setAttribute('aria-label', 'Painel de Conexões e Ecossistema');

    // Geração dinâmica dos itens com fallback inteligente
    const linksHTML = meusSites.map(site => {
        const nomeArquivoNormalizado = site.nome.toLowerCase().replace(/\s+/g, '');
        const urlIconeLocal = `./assets/sites/${nomeArquivoNormalizado}.png`;

        const fallbackScript = `
            this.onerror = null;
            try {
                this.src = 'https://www.google.com/s2/favicons?domain=' + encodeURIComponent('${site.url}') + '&sz=64';
                this.onerror = () => {
                    const urlObj = new URL('${site.url}');
                    this.src = 'https://icons.duckduckgo.com/ip3/' + urlObj.hostname + '.ico';
                    this.onerror = () => {
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
                <img src="${urlIconeLocal}" class="painel-item-favicon" alt="Ícone ${site.nome}" loading="lazy" onerror="${fallbackScript.replace(/\s+/g, ' ')}">
                <div class="painel-item-detalhes">
                    <span class="painel-item-texto">${site.nome}</span>
                    ${site.descricao ? `<span class="painel-item-desc">${site.descricao}</span>` : ''}
                </div>
                <i class="fa-solid fa-chevron-right painel-item-seta" aria-hidden="true"></i>
            </a>
        `;
    }).join('');

    // Injeção da estrutura interna
    painelContainer.innerHTML = `
        <div class="painel-scroll-wrapper">
            <button id="painel-btn-fechar" class="painel-btn-fechar" aria-label="Fechar Painel">&times;</button>
            
            <div class="painel-secao-topo">
                <img src="./icon-192.png?v=3" class="painel-avatar-site" alt="Logotipo K & S">
                <div class="painel-topo-info">
                    <h2 class="painel-titulo-principal">K & S</h2>
                    <span class="painel-subtitulo">Conexão Eternizada</span>
                </div>
            </div>

            <div class="painel-linha-separadora"></div>

            <div class="painel-secao-conteudo">
                <h3 class="painel-label-secao">Sites que fazem parte e possa ver também</h3>
                <div class="painel-links-lista">
                    ${linksHTML}
                </div>
            </div>

            <div class="painel-linha-separadora"></div>

            <div id="container-creditos-interno"></div>
        </div>
    `;

    // Função para alternar visibilidade com trava de scroll no mobile
    const togglePainel = (abrir) => {
        const estaOculto = painelContainer.classList.contains('paineis-ocultos');
        const deveAbrir = typeof abrir === 'boolean' ? abrir : estaOculto;

        if (deveAbrir) {
            painelContainer.classList.remove('paineis-ocultos');
            painelContainer.setAttribute('aria-hidden', 'false');
            if (window.innerWidth <= 767) {
                document.body.style.overflow = 'hidden';
            }
        } else {
            painelContainer.classList.add('paineis-ocultos');
            painelContainer.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    };

    // Globaliza métodos para escuta de outros botões (ex: botão hambúrguer)
    window.togglePainelConexao = togglePainel;
    window.fecharPainelConexao = () => togglePainel(false);

    // Eventos de Fechamento por Teclado e Botão
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !painelContainer.classList.contains('paineis-ocultos')) {
            togglePainel(false);
        }
    });

    // Injeção no DOM e vinculação de eventos após carregamento
    const inicializarEventos = () => {
        document.body.appendChild(painelContainer);

        const btnFechar = document.getElementById('painel-btn-fechar');
        if (btnFechar) {
            btnFechar.addEventListener('click', () => togglePainel(false));
        }

        // Suporte a Gestos no Mobile (Swipe left para fechar)
        let touchStartX = 0;
        let touchEndX = 0;

        painelContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        painelContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 70) { // Deslizou para a esquerda
                togglePainel(false);
            }
        }, { passive: true });

        window.dispatchEvent(new CustomEvent('painelConexaoMontado'));
    };

    if (document.body) {
        inicializarEventos();
    } else {
        window.addEventListener('DOMContentLoaded', inicializarEventos);
    }
})();
