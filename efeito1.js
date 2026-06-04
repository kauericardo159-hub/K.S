(function() {
    'use strict';

    // --- CONTROLE DE DATA E EXECUÇÃO ---
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    const mesAtual = agora.getMonth() + 1; // Janeiro é 0
    const diaAtual = agora.getDate();

    // TRAVA TEMPORAL CRÍTICA: Só executa no dia exato de 1 mês: 25/05/2026
    if (anoAtual !== 2026 || mesAtual !== 5 || diaAtual !== 25) {
        return; // Encerra silenciosamente em qualquer outro dia
    }

    // --- INJEÇÃO DE ESTILOS DA CELEBRAÇÃO ---
    const estilosComemorativos = document.createElement('style');
    estilosComemorativos.textContent = `
        #container-comemorativo-mesversario {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
        }

        /* Classe base para os elementos da chuva */
        .particula-festa {
            position: absolute;
            top: -50px;
            will-change: transform, opacity;
            animation: quedaFesta linear forwards;
        }

        /* Imagens de Emojis do Discord (Twemoji) */
        .emoji-discord {
            width: 32px;
            height: 32px;
            filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));
        }

        /* Pedaços de confete colorido tradicional */
        .confete-colorido {
            width: 12px;
            height: 12px;
            border-radius: 4px;
        }

        /* Animação Física de Queda com Balanço Lateral e Rotação */
        @keyframes quedaFesta {
            0% {
                transform: translateY(0) translateX(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(105vh) translateX(var(--drift-lateral)) rotate(var(--rotacao-final));
                opacity: 0.3;
            }
        }

        /* Banner sutil flutuante avisando a comemoração */
        .banner-mesversario {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(244, 114, 182, 0.9));
            padding: 10px 24px;
            border-radius: 50px;
            font-family: 'Poppins', sans-serif;
            font-size: 0.85rem;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: 1px;
            text-transform: uppercase;
            box-shadow: 0 10px 25px rgba(244, 114, 182, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(8px);
            z-index: 10000;
            animation: abrirBanner 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes abrirBanner {
            to { transform: translateX(-50%) translateY(0); }
        }

        @media (max-width: 600px) {
            .emoji-discord { width: 24px; height: 24px; }
            .confete-colorido { width: 8px; height: 8px; }
            .banner-mesversario { font-size: 0.75rem; padding: 8px 18px; width: 85%; text-align: center; }
        }
    `;
    document.head.appendChild(estilosComemorativos);

    // --- CRIAÇÃO DOS PALCOS VISUAIS ---
    const containerPalco = document.createElement('div');
    containerPalco.id = 'container-comemorativo-mesversario';
    document.body.appendChild(containerPalco);

    const bannerAviso = document.createElement('div');
    bannerAviso.className = 'banner-mesversario';
    bannerAviso.innerHTML = '🎉 Feliz 1 Mês de Namoro! 🎉';
    document.body.appendChild(bannerAviso);

    // IDs exatos dos caracteres da CDN oficial do Twemoji (Usados pelo Discord)
    const linksEmojisDiscord = [
        'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f370.svg', // 🍰
        'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f389.svg', // 🎉
        'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f499.svg', // 💙
        'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f6aa.svg', // 🩷 (Ajustado para o hex do coração rosa padrão)
        'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f388.svg', // 🎈
        'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f380.svg'  // 🎀
    ];
    
    const coresConfetes = ['#3b82f6', '#f472b6', '#60a5fa', '#fbcfe8', '#ffffff', '#ffd166'];

    /**
     * Instancia uma nova partícula (seja emoji ou confete) no topo da página
     * e calcula suas propriedades de física e tempo de forma aleatória.
     */
    function gerarParticulaChuva() {
        if (!containerPalco) return;

        const elementoParticula = document.createElement('div');
        elementoParticula.className = 'particula-festa';

        // Determina se criará um Emoji do Discord (40% de chance) ou Confete (60% de chance)
        const tipoChance = Math.random();
        
        if (tipoChance < 0.40) {
            // Criação do Emoji no padrão do Discord
            const tagImagem = document.createElement('img');
            tagImagem.className = 'emoji-discord';
            tagImagem.src = linksEmojisDiscord[Math.floor(Math.random() * linksEmojisDiscord.length)];
            tagImagem.alt = 'Emoji Discord Festa';
            elementoParticula.appendChild(tagImagem);
        } else {
            // Criação de um bloco de confete brilhante
            elementoParticula.classList.add('confete-colorido');
            elementoParticula.style.backgroundColor = coresConfetes[Math.floor(Math.random() * coresConfetes.length)];
        }

        // Variáveis de posicionamento inicial e comportamento dinâmico (CSS Variables)
        const posicaoXInicial = Math.random() * window.innerWidth;
        const duracaoQueda = Math.random() * 4 + 4; // Entre 4s e 8s para um efeito suave
        const driftLateral = (Math.random() * 150 - 75) + 'px'; // Oscilação para os lados durante a queda
        const rotacaoFinal = (Math.random() * 720 - 360) + 'deg'; // Rotações completas no próprio eixo

        elementoParticula.style.left = `${posicaoXInicial}px`;
        elementoParticula.style.animationDuration = `${duracaoQueda}s`;
        elementoParticula.style.setProperty('--drift-lateral', driftLateral);
        elementoParticula.style.setProperty('--rotacao-final', rotacaoFinal);

        // Remove o elemento do DOM assim que a animação terminar para evitar gargalos de memória
        elementoParticula.addEventListener('animationend', () => {
            elementoParticula.remove();
        });

        containerPalco.appendChild(elementoParticula);
    }

    // --- INICIALIZADOR DO CICLO DA CHUVA ---
    // Cria novas partículas continuamente. Taxa adaptada para não travar celulares.
    const delayGeracao = window.innerWidth < 600 ? 450 : 250;
    const intervaloChuva = setInterval(gerarParticulaChuva, delayGeracao);

    // Dispara uma explosão inicial de 15 itens logo na abertura do site para impacto visual imediato
    for (let i = 0; i < 15; i++) {
        setTimeout(gerarParticulaChuva, Math.random() * 800);
    }

})();
