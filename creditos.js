(function() {
    'use strict';

    // Evita injeções duplicadas
    if (document.getElementById('pwa-componente-creditos')) return;

    // ==========================================
    // 1. CONFIGURAÇÃO DAS REDES SOCIAIS
    // ==========================================
    const redesAutor = {
        github: "https://github.com/kauericardo159-hub",
        discord: "", 
        twitter: ""  
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
    // 3. ESTILIZAÇÃO TRANSPARENTE E PREMIUM
    // ==========================================
    const estilos = document.createElement('style');
    estilos.textContent = `
        .creditos-transparente {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            padding: 10px 0 0 0;
            background: transparent;
            text-align: center;
            width: 100%;
            box-sizing: border-box;
            user-select: none;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
            margin-top: 16px;
        }

        .creditos-label {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 0.68rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #64748b;
            font-weight: 700;
        }

        .creditos-perfil {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }

        .creditos-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid rgba(244, 114, 182, 0.2);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease;
        }

        .creditos-transparente:hover .creditos-avatar {
            transform: scale(1.05);
        }

        .creditos-nome {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 1rem;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.2px;
        }

        .creditos-redes {
            display: flex;
            justify-content: center;
            gap: 8px;
            width: 100%;
        }

        .creditos-rede-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.06);
            color: #94a3b8;
            font-size: 1.1rem;
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .btn-github:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: #ffffff;
            color: #ffffff;
            transform: translateY(-2px);
        }

        .creditos-footer {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
        }

        .creditos-carinho {
            font-size: 0.78rem;
            color: #64748b;
            display: flex;
            align-items: center;
            gap: 4px;
            font-weight: 500;
        }

        .coracao-pulsante {
            color: #f472b6;
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
            gap: 6px;
            font-size: 0.78rem;
            color: #cbd5e1;
            font-weight: 600;
        }

        .creditos-site-img {
            width: 16px;
            height: 16px;
            border-radius: 4px;
            object-fit: contain;
        }

        .creditos-licenca {
            font-size: 0.65rem;
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
    // 5. MONTAGEM DO HTML
    // ==========================================
    const elementoCreditos = document.createElement('div');
    elementoCreditos.id = 'pwa-componente-creditos';
    elementoCreditos.className = 'creditos-transparente';
    
    elementoCreditos.innerHTML = `
        <span class="creditos-label">Desenvolvido Por:</span>
        
        <div class="creditos-perfil">
            <img src="https://github.com/kauericardo159-hub.png" class="creditos-avatar" alt="KaueTheProtogen" onerror="this.src='./icon-192.png'">
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
            <span class="creditos-licenca">Direitos Reservados</span>
        </div>
    `;

    // ==========================================
    // 6. INJEÇÃO INTELIGENTE (Manutenção ou Painel)
    // ==========================================
    const inserirNoDestino = () => {
        const conteinerManutencao = document.getElementById('container-creditos-manu');
        const conteinerPainel = document.getElementById('container-creditos-interno');

        if (conteinerManutencao) {
            conteinerManutencao.appendChild(elementoCreditos);
        } else if (conteinerPainel) {
            conteinerPainel.appendChild(elementoCreditos);
        } else {
            // Fallback caso nenhum container específico exista
            document.body.appendChild(elementoCreditos);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inserirNoDestino);
    } else {
        inserirNoDestino();
    }
})();
