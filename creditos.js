(function() {
    'use strict';

    // ==========================================
    // 1. CONFIGURAÇÃO DAS REDES SOCIAIS
    // ==========================================
    // Insira seus links abaixo. Se deixar vazio (""), o BOTÃO NÃO vai aparecer.
    const redesAutor = {
        github: "https://github.com/KaueTheProtogen",
        discord: "", // Exemplo: "https://discord.gg/seu-link"
        twitter: ""  // Exemplo: "https://twitter.com/seu-perfil"
    };

    // ==========================================
    // 2. CAPTURA AUTOMÁTICA DE DADOS DO SITE
    // ==========================================
    const linkIcone = document.querySelector('link[rel="apple-touch-icon"]');
    const iconeSite = linkIcone ? linkIcone.href : 'icon-192.png';
    let nomeSite = document.title || 'K & S';
    
    if(nomeSite.includes('-')) {
        nomeSite = nomeSite.split('-')[0].trim();
    }

    // ==========================================
    // 3. ESTILIZAÇÃO TRANSPARENTE E PREMIUN
    // ==========================================
    const estilos = document.createElement('style');
    estilos.textContent = `
        .creditos-transparente {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
            padding: 20px 10px;
            background: transparent;
            text-align: center;
            width: 100%;
            box-sizing: border-box;
        }

        .creditos-label {
            font-family: 'Poppins', sans-serif;
            font-size: 0.72rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #64748b;
            font-weight: 700;
            margin-bottom: -4px;
        }

        /* Perfil alinhado verticalmente (Foto encima do nome) */
        .creditos-perfil {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
        }

        .creditos-avatar {
            width: 65px;
            height: 65px;
            border-radius: 50%; /* Foto perfeitamente circular */
            object-fit: cover;
            border: 2px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease;
        }

        .creditos-transparente:hover .creditos-avatar {
            transform: scale(1.04);
        }

        .creditos-nome {
            font-family: 'Poppins', sans-serif;
            font-size: 1.15rem;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.2px;
        }

        /* Container dos Botões das Redes Sociais */
        .creditos-redes {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 2px;
            width: 100%;
        }

        /* Botões de Redes Estilo Premium */
        .creditos-rede-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            border-radius: 14px; /* Formato arredondado moderno */
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.06);
            color: #94a3b8;
            font-size: 1.25rem;
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }

        /* Efeitos individuais de foco e brilho nos botões */
        .btn-github:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: #ffffff;
            color: #ffffff;
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.15);
            transform: translateY(-2px);
        }

        .btn-discord:hover {
            background: rgba(88, 101, 242, 0.1);
            border-color: #5865F2;
            color: #5865F2;
            box-shadow: 0 0 15px rgba(88, 101, 242, 0.25);
            transform: translateY(-2px);
        }

        .btn-twitter:hover {
            background: rgba(29, 161, 242, 0.1);
            border-color: #1DA1F2;
            color: #1DA1F2;
            box-shadow: 0 0 15px rgba(29, 161, 242, 0.25);
            transform: translateY(-2px);
        }

        /* Rodapé de Informações */
        .creditos-footer {
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }

        /* Texto: Feito com carinho e com ♡ */
        .creditos-carinho {
            font-size: 0.85rem;
            color: #64748b;
            display: flex;
            align-items: center;
            gap: 4px;
            font-weight: 500;
        }

        .coracao-pulsante {
            color: #f472b6; /* Rosa sutil combinando com seu tema */
            display: inline-block;
            animation: baterCoracao 1s infinite alternate cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        @keyframes baterCoracao {
            from { transform: scale(1); }
            to { transform: scale(1.25); filter: drop-shadow(0 0 4px #f472b6); }
        }

        .creditos-copyright {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 0.82rem;
            color: #cbd5e1;
            font-weight: 600;
        }

        .creditos-site-img {
            width: 20px;
            height: 20px;
            border-radius: 5px;
            object-fit: contain;
        }

        .creditos-licenca {
            font-size: 0.72rem;
            color: #475569;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
    `;
    document.head.appendChild(estilos);

    // ==========================================
    // 4. CONSTRUÇÃO CONDICIONAL DOS BOTÕES
    // ==========================================
    let htmlRedes = '';
    if (redesAutor.github) {
        htmlRedes += `<a href="${redesAutor.github}" target="_blank" class="creditos-rede-btn btn-github" title="GitHub"><i class="fa-brands fa-github"></i></a>`;
    }
    if (redesAutor.discord) {
        htmlRedes += `<a href="${redesAutor.discord}" target="_blank" class="creditos-rede-btn btn-discord" title="Discord"><i class="fa-brands fa-discord"></i></a>`;
    }
    if (redesAutor.twitter) {
        htmlRedes += `<a href="${redesAutor.twitter}" target="_blank" class="creditos-rede-btn btn-twitter" title="Twitter / X"><i class="fa-brands fa-twitter"></i></a>`;
    }

    // ==========================================
    // 5. MONTAGEM DO HTML ATUALIZADO
    // ==========================================
    const elementoCreditos = document.createElement('div');
    elementoCreditos.className = 'creditos-transparente';
    
    elementoCreditos.innerHTML = `
        <span class="creditos-label">Desenvolvido Por:</span>
        
        <div class="creditos-perfil">
            <img src="https://avatars.githubusercontent.com/u/250105175?v=4" class="creditos-avatar" alt="KaueTheProtogen">
            <span class="creditos-nome">KaueTheProtogen</span>
        </div>

        ${htmlRedes ? `<div class="creditos-redes">${htmlRedes}</div>` : ''}

        <div class="creditos-footer">
            <span class="creditos-carinho">Feito com carinho e com <span class="coracao-pulsante">&hearts;</span></span>
            
            <div class="creditos-copyright">
                &copy; 2026 - 
                <img src="${iconeSite}" class="creditos-site-img" alt="Ícone"> 
                <span>${nomeSite}</span>
            </div>
            <span class="creditos-licenca">Licença e Direitos Autorais Reservados</span>
        </div>
    `;

    // ==========================================
    // 6. INJEÇÃO INTELIGENTE MULTI-TELAS
    // ==========================================
    setTimeout(() => {
        const estaEmManutencao = (typeof emManutencao !== 'undefined' && emManutencao === true);
        const conteinerPainel = document.getElementById('container-creditos-interno');
        const conteinerErro = document.querySelector('.container-erro');

        if (estaEmManutencao) {
            if (conteinerErro) {
                conteinerErro.appendChild(elementoCreditos);
            } else {
                document.body.appendChild(elementoCreditos);
            }
        } else if (conteinerPainel) {
            conteinerPainel.appendChild(elementoCreditos);
        } else {
            document.body.appendChild(elementoCreditos);
        }
    }, 200);
})();
