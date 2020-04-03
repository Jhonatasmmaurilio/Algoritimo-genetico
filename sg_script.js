function geraPopulacaoInicial() {
    testaMatriz();
    customLog("POPULACAO INICIAL", 'info');

    var populacaoInicial = [];

    for (var i = 0; i < totalPopulacao; i++) {
        populacaoInicial.push(geraIndividuos());
    }

    //        console.table(populacaoInicial);

    return populacaoInicial;
}

function geraIndividuos() {
    var novoIndividuo = [];
    var j = 1;
    var distancia;

    novoIndividuo.push(cidadeInicial);

    do {
        var ran = Math.floor(Math.random() * (totalCidades));

        if (novoIndividuo.indexOf(arrCidades[ran]) == -1) {
            novoIndividuo.push(arrCidades[ran]);
            j++;
        }
    } while (j < totalCidades);

    novoIndividuo.push(cidadeInicial);
    distancia = calculaDistancia(novoIndividuo);
    novoIndividuo.push(distancia);

    return novoIndividuo;
}

function dividePopulacao(populacao) {
    customLog("SELECIONANDO MELHORES", 'info');

    var popMelhores = [];
    var n = Math.trunc(populacao.length / 2);
    var p = 0;

    customLog("Ordenando", 'info');
    populacao.sort(ordenar);
    //    console.table(populacao);

    customLog("Coletando metade dos melhores", 'info');

    for (var i = 0; i < totalPopulacao / 2; i++) {
        popMelhores.push(populacao[i]);
    }

    //    console.table(popMelhores);

    return popMelhores;
}

function selecaoCrossover(melhoresInd) {
    customLog("SELECAO PARA CROSSOVER", 'info');
    customLog("Melhor da geracao: " + melhoresInd[0], "Orange");

    var tamMelhores = melhoresInd.length;
    var popTemporaria = [];

    novaPopulacao = [];

    for (var i = 0; i < preservacao; i++) {
        novaPopulacao.push(melhoresInd[i]);
    }

    customLog("Preservando os melhores", 'info');
    //    console.table(novaPopulacao);

    for (var i = 0; i < totalPopulacao - preservacao; i++) {
        //            customLog("Cruzando", 'info');

        var ran1 = Math.floor(Math.random() * (melhoresInd.length));;
        var ran2;

        do {
            ran2 = Math.floor(Math.random() * (melhoresInd.length));
        } while (ran2 == ran1);

        var pai = melhoresInd[ran1];
        var mae = melhoresInd[ran2];

        //            customLog("Sorteados", 'info');
        //            console.log("pai:     " + pai + "=(" + calculaDistancia(pai) + ")");
        //            console.log("mae:     " + mae + "=(" + calculaDistancia(mae) + ")");

        filho1 = crossover(pai, mae);
        filho1 = mutacao(filho1);
        filho1.push(calculaDistancia(filho1));

        //                    console.log("%cfilho 1:", "color: green", filho1 + "=(" + calculaDistancia(filho1) + ")");

        filho2 = crossover(mae, pai);
        filho2 = mutacao(filho2);
        filho2.push(calculaDistancia(filho2));

        //                    console.log("%cfilho 2:", "color: green", filho2 + "=(" + calculaDistancia(filho2) + ")");

        popTemporaria.push(filho1);
        popTemporaria.push(filho2);
    }

    customLog("Ordenando", 'info');
    //    console.table(popTemporaria);

    for (var i = 0; i < totalPopulacao - preservacao; i++) {
        novaPopulacao.push(popTemporaria[i]);
    }

    customLog("Nova populacao", 'info');
    //    console.table(novaPopulacao);

    return novaPopulacao;
}

function crossover(pai1, pai2) {
    //    customLog("Local corte:" + localCorte, "error");
    var filho = [];

    for (var i = 0; i < localCorte; i++) {
        filho.push(pai1[i]);
    }

    for (var i = 0; i < totalCidades; i++) {
        if (filho.indexOf(pai2[i]) == -1) {
            filho.push(pai2[i]);
        }
    }

    filho.push(cidadeInicial);

    return filho;
}

function mutacao(filho) {
    var roleta = Math.floor(Math.random() * (100));

    if (roleta <= taxaMutacao) {
        //        customLog("MUTACAO DETECTADA", "error");

        var posicao;
        var gene = [];
        var g1, g2;

        g1 = Math.floor(Math.random() * ((totalCidades - 1) - 1 + 1) + 1);

        do {
            g2 = Math.floor(Math.random() * ((totalCidades - 1) - 1 + 1) + 1);
        }
        while (g2 == g1);

        var ram = Math.floor(Math.random() * (2));

        var m1 = filho[g1];
        var m2 = filho[g2];

        filho[g1] = m2;
        filho[g2] = m1;
        //        console.log("%cx-men:", "color: green", filho + "=" + calculaDistancia(filho));
    }

    return filho;
}

function selecionaPai(populacao) {

}

function retornaMelhor(populacao) {
    populacao.sort(ordenar);
    customLog("MELHOR ENCONTRADO", "green");
    console.log(populacao[0]);

    return populacao[0];
}

function calculaDistancia(distancias) {
    var distTotal = 0;
    var test = "";

    for (var i = 0; i < totalCidades; i++) {
        var cid1 = arrCidades.indexOf(distancias[i]);
        var cid2 = arrCidades.indexOf(distancias[i + 1]);

        distTotal = distTotal + mDist[cid1][cid2];

        //        console.log(distancias[i] + "+" + distancias[i+1]);

        if (mDist[cid1][cid2] == 0) {
            console.log("%c>>>>>>>>>>>>>ALERTA Distancia em zero", "color. red");
            console.log(cid1);
            console.log(cid2);
        }

        test = test + mDist[cid1][cid2] + "+";
    }

    //    console.log(test);

    return distTotal;
}

function arredondar(valor) {
    return Math.round(valor);
}

function ordenar(a, b) {
    if (a[totalCidades + 1] === b[totalCidades + 1]) {
        return 0;
    } else {
        return (a[totalCidades + 1] < b[totalCidades + 1]) ? -1 : 1;
    }
}

function customLog(message, color = 'black') {
    switch (color) {
        case 'success':
            color = 'Green'
            break
        case 'info':
            color = 'Blue'
            break;
        case 'error':
            color = 'Red'
            break;
        case 'warning':
            color = 'Orange'
            break;
        default:
            color = color
    }

    if (color == "Orange") {
        console.log(`%c${message}`, `color:${color}`);
    }

    //    if (color == "Red") {
    //        console.log(`%c${message}`, `color:${color}`);
    //    }

    //    console.log(`%c${message}`, `color:${color}`);
}

function main() {
    var populacaoInicial = geraPopulacaoInicial();

    for (var i = 0; i < geracoes; i++) {
        customLog("======================================================== G" + i, "error");

        var melhoresIndividuos = dividePopulacao(populacaoInicial);
        var novaPopulacao = selecaoCrossover(melhoresIndividuos);

        populacaoInicial = novaPopulacao;
    }
    
    var melhor = retornaMelhor(populacaoInicial);
}

function testaMatriz() {
    var msg = "";

    for (var i = 0; i < mDist.length; i++) {
        for (var j = 0; j < mDist[0].length; j++) {
            msg += mDist[i][j] + " | ";

            if (mDist[i][j] != mDist[j][i]) {
                customLog("ERRO NA MATRIZ: " + i + "-" + j);
            }
        }

        msg += "\n"
    }
}

main();
