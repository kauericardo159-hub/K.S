(function() {
    'use strict';
    
    // Trava de segurança para o modo manutenção global
    if (typeof window.emManutencao !== 'undefined' && window.emManutencao === true) return;

    // Dicionário para suporte a Singular (S) e Plural (P)
    const LABELS = {
        anos: { S: 'Ano', P: 'Anos' },
        meses: { S: 'Mês', P: 'Meses' },
        semanas: { S: 'Semana', P: 'Semanas' },
        dias: { S: 'Dia', P: 'Dias' },
        horas: { S: 'Hora', P: 'Horas' },
        minutos: { S: 'Minuto', P: 'Minutos' },
        segundos: { S: 'Segundo', P: 'Segundos' }
    };

    const chaves = ['anos', 'meses', 'semanas', 'dias', 'horas', 'minutos', 'segundos'];
    const cacheElementos = {};

    // --- TEMPO ESTÁTICO / FIXADO (MARCO FINAL) ---
    const TEMPO_CONGELADO = {
        anos: 0,
        meses: 3,
        semanas: 1,
        dias: 4,
        horas: 19,
        minutos: 53,
        segundos: 0
    };

    // --- 1. MONTAGEM E INJEÇÃO DA ESTRUTURA CORE ---
    const cardPrincipal = document.createElement('div');
    cardPrincipal.className = 'card';
    cardPrincipal.innerHTML = `
        <img src="cardfundo.png" class="card-video-fundo" alt="Fundo do Card" loading="eager">

        <img src="efeito1.png" class="efeito-img efeito-esquerdo" alt="Efeito" loading="eager">
        <img src="efeito2.png" class="efeito-img efeito-direito" alt="Efeito" loading="eager">
        
        <div class="topo-relacionamento">
            <div class="perfil-container">
                <div class="perfil-wrapper kaue-borda">
                    <img src="kaue.png" class="foto-perfil" alt="Kauê">
                    <img src="moldura2.png" class="moldura" alt="Moldura">
                </div>
                <span class="nome nome-kaue">Kauê</span>
            </div>
            
            <div class="centro-container">
                <div class="meme-wrapper"><img src="meme.gif" class="meme-gif" alt="Meme"></div>
                <span class="e-simbolo">&amp;</span>
            </div>
            
            <div class="perfil-container">
                <div class="perfil-wrapper sky-borda">
                    <img src="sky.png" class="foto-perfil" alt="Sky">
                    <img src="moldura1.png" class="moldura" alt="Moldura">
                </div>
                <span class="nome nome-sky">Sky</span>
            </div>
        </div>

        <div class="info-tempo">
            <p class="subtitulo">
                <i class="fa-solid fa-heart icon-heart"></i> 
                Nossa história • 25/04/2026 
                <i class="fa-solid fa-heart icon-heart"></i>
            </p>
            <div id="contador" class="contador-horizontal"></div>
        </div>
    `;
    
    document.body.appendChild(cardPrincipal);

    // --- 2. CONSTRUÇÃO E CACHEAMENTO DOS SLOTS DO CONTADOR ---
    const contadorContainer = document.getElementById('contador');
    
    chaves.forEach(chave => {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'tempo-item';

        const spanValor = document.createElement('span');
        spanValor.className = 'valor valor-zero';
        spanValor.textContent = '0';

        const spanLabel = document.createElement('span');
        spanLabel.className = 'label';
        spanLabel.textContent = LABELS[chave].P;

        itemContainer.appendChild(spanValor);
        itemContainer.appendChild(spanLabel);
        contadorContainer.appendChild(itemContainer);

        cacheElementos[chave] = {
            valorEl: spanValor,
            labelEl: spanLabel
        };
    });

    // --- 3. EXIBIÇÃO ESTÁTICA DO CRONÔMETRO ---
    function aplicarTempoCongelado() {
        chaves.forEach(chave => {
            const num = TEMPO_CONGELADO[chave];
            const cache = cacheElementos[chave];

            if (cache) {
                cache.valorEl.textContent = num;
                
                if (num > 0) {
                    cache.valorEl.classList.remove('valor-zero');
                    cache.valorEl.classList.add('valor-ativo');
                } else {
                    cache.valorEl.classList.remove('valor-ativo');
                    cache.valorEl.classList.add('valor-zero');
                }

                cache.labelEl.textContent = num === 1 ? LABELS[chave].S : LABELS[chave].P;
            }
        });
    }

    // Executa a renderização estática imediata (sem loop de setInterval)
    aplicarTempoCongelado();
})();
