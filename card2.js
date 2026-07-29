(function() {
    'use strict';
    
    // Trava de segurança para o modo manutenção
    if (typeof emManutencao !== 'undefined' && emManutencao === true) return;

    // Data marco de quando se conheceram
    const DATA_CONHECIMENTO = new Date('2022-12-16T00:00:00-00:00');

    // Dicionário para concordância gramatical (Singular vs Plural)
    const LABELS = {
        anos: { S: 'ano', P: 'anos' },
        meses: { S: 'mês', P: 'meses' },
        dias: { S: 'dia', P: 'dias' }
    };

    // 1. Criação da Infraestrutura Estática do Card
    const cardSecundario = document.createElement('div');
    cardSecundario.className = 'card-secundario';
    cardSecundario.id = 'container-card-secundario';
    cardSecundario.innerHTML = `
        <h3 class="card-secundario-titulo">Nós dois se conhecemos há:</h3>
        <div id="contador-tempo-conhecidos" class="contador-pequeno">
            <span class="tempo-destaque" id="conhecido-val-anos">0</span> <span id="conhecido-lbl-anos">anos</span>, 
            <span class="tempo-destaque" id="conhecido-val-meses">0</span> <span id="conhecido-lbl-meses">meses</span> e 
            <span class="tempo-destaque" id="conhecido-val-dias">0</span> <span id="conhecido-lbl-dias">dias</span>
        </div>
    `;

    // Armazenamento em cache dos nós do DOM para evitar lentidão
    let cacheEls = null;

    function mapearCacheDOM() {
        cacheEls = {
            anosVal: document.getElementById('conhecido-val-anos'),
            anosLbl: document.getElementById('conhecido-lbl-anos'),
            mesesVal: document.getElementById('conhecido-val-meses'),
            mesesLbl: document.getElementById('conhecido-lbl-meses'),
            diasVal: document.getElementById('conhecido-val-dias'),
            diasLbl: document.getElementById('conhecido-lbl-dias')
        };
    }

    // 2. Lógica Avançada de Cálculo Calendárico
    function atualizarContadorConhecidos() {
        if (!cacheEls) mapearCacheDOM();
        if (!cacheEls.anosVal) return; // Salvaguarda caso o elemento suma do DOM

        const agora = new Date();
        
        let anos = agora.getFullYear() - DATA_CONHECIMENTO.getFullYear();
        let meses = agora.getMonth() - DATA_CONHECIMENTO.getMonth();
        let dias = agora.getDate() - DATA_CONHECIMENTO.getDate();

        // Ajustes matemáticos finos para viradas de mês e ano
        if (dias < 0) {
            meses--;
            const mesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0);
            dias += mesAnterior.getDate();
        }
        if (meses < 0) {
            anos--;
            meses += 12;
        }

        // Injeção atômica de valores puros (Sem reconstruir o HTML)
        cacheEls.anosVal.textContent = anos;
        cacheEls.mesesVal.textContent = meses;
        cacheEls.diasVal.textContent = dias;

        // Pluralização Dinâmica Inteligente
        cacheEls.anosLbl.textContent = anos === 1 ? LABELS.anos.S : LABELS.anos.P;
        cacheEls.mesesLbl.textContent = meses === 1 ? LABELS.meses.S : LABELS.meses.P;
        cacheEls.diasLbl.textContent = dias === 1 ? LABELS.dias.S : LABELS.dias.P;
    }

    // 3. Inserção Controlada no DOM (Evita loops infinitos e polling desnecessário)
    const tentarInjecao = () => {
        const refCard1 = document.querySelector('.card');
        if (refCard1) {
            refCard1.parentNode.insertBefore(cardSecundario, refCard1.nextSibling);
            atualizarContadorConhecidos();
            
            // Ativa o batimento de atualização estável (1 minuto é perfeito para esta escala)
            setInterval(atualizarContadorConhecidos, 60000);
            return true;
        }
        return false;
    };

    // Tenta executar imediatamente (visto que o script roda com 'defer' logo após o Card1)
    if (!tentarInjecao()) {
        // Fallback de segurança com barreira de esgotamento (Timeout de 5s)
        const loopSeguranca = setInterval(() => {
            if (tentarInjecao()) clearInterval(loopSeguranca);
        }, 50);
        
        setTimeout(() => clearInterval(loopSeguranca), 5000);
    }
})();
