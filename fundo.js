(function() {
    'use strict';

    // Trava de segurança para manutenção
    if (window.emManutencao === true) return;

    // 1. Configurações
    const CONFIG = {
        tempoTroca: 20000, // 20 segundos
        fundos: [
            './fundo.png',
            './fundo2.png',
            './fundo3.png'
        ]
    };

    let indiceAtual = -1;
    let intervaloFundo = null;

    // 2. Função de Sorteio Inteligente
    function obterProximoIndice() {
        const totalFundos = CONFIG.fundos.length;
        if (totalFundos <= 1) return 0;

        let novoIndice;
        do {
            novoIndice = Math.floor(Math.random() * totalFundos);
        } while (novoIndice === indiceAtual);

        return novoIndice;
    }

    // 3. Aplicação do Fundo com Pré-carregamento (Evita "piscar" em branco)
    function alternarFundo() {
        if (CONFIG.fundos.length === 0) return;

        indiceAtual = obterProximoIndice();
        const proximaImagem = CONFIG.fundos[indiceAtual];

        // Cria uma imagem na memória para garantir que ela carregue antes de exibir
        const imgPreload = new Image();
        imgPreload.src = proximaImagem;
        
        imgPreload.onload = () => {
            document.body.style.setProperty('--bg-dinamico', `url('${proximaImagem}')`);
        };
    }

    // 4. Inicialização Segura
    function iniciar() {
        alternarFundo();
        
        // Garante que não existam múltiplos intervalos rodando juntos
        if (intervaloFundo) clearInterval(intervaloFundo);
        intervaloFundo = setInterval(alternarFundo, CONFIG.tempoTroca);
    }

    // Executa quando o DOM estiver pronto para evitar problemas de renderização
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciar);
    } else {
        iniciar();
    }
})();
