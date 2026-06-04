(function() {
    'use strict';
    
    // Trava de segurança para o modo manutenção
    if (typeof emManutencao !== 'undefined' && emManutencao === true) return;

    // Data marco do relacionamento
    const DATA_RELACIONAMENTO = new Date('2026-04-25T01:30:00-03:00');

    // Dicionário premium para suporte a Singular (S) e Plural (P)
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

    // --- 1. MONTAGEM E INJEÇÃO DA ESTRUTURA CORE ---
    const cardPrincipal = document.createElement('div');
    cardPrincipal.className = 'card';
    cardPrincipal.innerHTML = `
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
                <i class="fa-solid fa-heart" style="color: #f472b6;"></i> 
                Juntos desde 25/04/2026 
                <i class="fa-solid fa-heart" style="color: #3b82f6;"></i>
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

        // Mapeia os elementos para evitar a execução lenta de querySelectors no loop
        cacheElementos[chave] = {
            valorEl: spanValor,
            labelEl: spanLabel
        };
    });

    // --- 3. ENGENHARIA DE CÁLCULO CALENDÁRICO REAL ---
    function atualizarContador() {
        const agora = new Date();
        if (agora < DATA_RELACIONAMENTO) return;

        // Cálculo dinâmico respeitando as variações de dias de cada mês do ano
        let anos = agora.getFullYear() - DATA_RELACIONAMENTO.getFullYear();
        let meses = agora.getMonth() - DATA_RELACIONAMENTO.getMonth();
        let dias = agora.getDate() - DATA_RELACIONAMENTO.getDate();
        let horas = agora.getHours() - DATA_RELACIONAMENTO.getHours();
        let minutos = agora.getMinutes() - DATA_RELACIONAMENTO.getMinutes();
        let segundos = agora.getSeconds() - DATA_RELACIONAMENTO.getSeconds();

        // Ajustes matemáticos de estouro de tempo (Underflow)
        if (segundos < 0) { segundos += 60; minutos--; }
        if (minutos < 0) { minutos += 60; horas--; }
        if (horas < 0) { horas += 24; dias--; }
        if (dias < 0) {
            // Puxa exatamente quantos dias tinha o mês anterior
            const diasNoMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
            dias += diasNoMesAnterior;
            meses--;
        }
        if (meses < 0) {
            meses += 12;
            anos--;
        }

        // Extrai as semanas e deixa o resto em dias úteis
        const semanas = Math.floor(dias / 7);
        dias = dias % 7;

        // Consolida os dados calculados de forma limpa
        const resultados = { anos, meses, semanas, dias, horas, minutos, segundos };

        // --- 4. RENDERIZAÇÃO DE ALTA PERFORMANCE (SEM ZEROS À ESQUERDA) ---
        chaves.forEach(chave => {
            const num = resultados[chave];
            const cache = cacheElementos[chave];

            if (cache) {
                // Atualiza o valor numérico puro
                cache.valorEl.textContent = num;
                
                // Gerencia classes de atividade de design de forma reativa
                cache.valorEl.className = num > 0 ? 'valor valor-ativo' : 'valor valor-zero';

                // Gramática automática inteligente (Singular vs Plural)
                cache.labelEl.textContent = num === 1 ? LABELS[chave].S : LABELS[chave].P;
            }
        });
    }

    // Execução contínua otimizada em intervalos estáveis de 1 segundo
    setInterval(atualizarContador, 1000);
    atualizarContador();
})();
