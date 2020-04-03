function geraPopulacaoInicial() {
    var populacaoInicial = [];

    for (var i = 0; i < totalPopulacao; i++) {
        populacaoInicial.push(geraIndividuos());
    }

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
    var popMelhores = [];
    var n = Math.trunc(populacao.length / 2);
    var p = 0;

    populacao.sort(ordenar);

    for (var i = 0; i < totalPopulacao / 2; i++) {
        popMelhores.push(populacao[i]);
    }

    return popMelhores;
}

function selecaoCrossover(melhoresInd) {
    customLog("Melhor da geracao: " + melhoresInd[0], "Orange");

    var tamMelhores = melhoresInd.length;
    var popTemporaria = [];

    novaPopulacao = [];

    for (var i = 0; i < preservacao; i++) {
        novaPopulacao.push(melhoresInd[i]);
    }

    for (var i = 0; i < totalPopulacao - preservacao; i++) {
        var ran1 = Math.floor(Math.random() * (melhoresInd.length));;
        var ran2;
        var pai;
        var mae;

        do {
            ran2 = Math.floor(Math.random() * (melhoresInd.length));
        } while (ran2 == ran1);

        pai = melhoresInd[ran1];
        mae = melhoresInd[ran2];

        filho1 = crossover(pai, mae);
        filho1 = mutacao(filho1);
        filho1.push(calculaDistancia(filho1));

        filho2 = crossover(mae, pai);
        filho2 = mutacao(filho2);
        filho2.push(calculaDistancia(filho2));

        popTemporaria.push(filho1);
        popTemporaria.push(filho2);
    }

    for (var i = 0; i < totalPopulacao - preservacao; i++) {
        novaPopulacao.push(popTemporaria[i]);
    }

    return novaPopulacao;
}

function crossover(pai1, pai2) {
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
    }

    return filho;
}

function retornaMelhor(populacao) {
    populacao.sort(ordenar);

    return populacao[0];
}

function calculaDistancia(distancias) {
    var distTotal = 0;

    for (var i = 0; i < totalCidades; i++) {
        var cid1 = arrCidades.indexOf(distancias[i]);
        var cid2 = arrCidades.indexOf(distancias[i + 1]);

        distTotal = distTotal + mDist[cid1][cid2];

        if (mDist[cid1][cid2] == 0) {
            customLog("ALERTA DISTANCIA IGUAL A ZERO", "error");
        }
    }

    return distTotal;
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
        var melhoresIndividuos = dividePopulacao(populacaoInicial);
        var novaPopulacao = selecaoCrossover(melhoresIndividuos);

        populacaoInicial = novaPopulacao;
    }

    var melhor = retornaMelhor(populacaoInicial);
    testaMatriz();
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