/*Premissia
-A ultima cidade tem que ser a inicial
-Não deve haver cidades repetidas
-As distancias nao podem passar de um valor de infinito
*/

//configurações
var arrDistancia = [];
var cidadeInicial = 1;
var totalPopulacao = 300;
var localCorte = 5;
var taxaMutacao = 20;
var criterioParada = 5000; //total de geracoes sem novos otimos encontrados
var infinito = 1000000000;
var geracoes = 1000;

var resultadosGeracoes = []
var novaPopulacao = [];
var arrPopulacao = [];
var arrMelhores = [];
var arrPiores = [];
var filho1 = [];
var filho2 = [];
var eleitoMelhor;
var eleitoPior;
var BEST = infinito; //infinito
var ARRBEST = []
var geracoesSemOtimo = 0;

function geraPopulacaoInicial() {
    for (var i = 0; i < totalPopulacao; i++) {
        arrPopulacao.push(geraIndividuos());
    }

    //        console.log("%cPOPULACAO INICIAL", 'color: red');
    //        console.table(arrPopulacao);
    //        console.log("%cDISTANCIAS ", 'color: red');
    //        console.table(arrDistancia);
}

function geraIndividuos() {
    var novoIndividuo = [];

    novoIndividuo.push(cidadeInicial);

    var j = 1;

    //    for(var i = 1;i<totalCidades;i++) {
    //        var ran = Math.floor(Math.random() * (totalCidades));
    //        
    //        if (novoIndividuo.indexOf(arrCidades[ran]) == -1) {
    //            novoIndividuo.push(arrCidades[ran]);
    //        }
    //    }

    do {
        var ran = Math.floor(Math.random() * (totalCidades));

        if (novoIndividuo.indexOf(arrCidades[ran]) == -1) {
            novoIndividuo.push(arrCidades[ran]);
            j++;
        }
    } while (j < totalCidades);

    novoIndividuo.push(cidadeInicial);

    //        console.log(novoIndividuo);

    var distancia = calculaDistancia(novoIndividuo);

    arrDistancia.push(distancia);

    return novoIndividuo;
}

function dividePopulacao(populacao, distancias) {
    var n = Math.trunc(populacao.length / 2);
    var cloneDistancias = [...distancias];
    var p = 0;
    var t = cloneDistancias.length;
    var totalMelhores = 0;
    arrMelhores = [];
    arrPiores = [];

    console.log("%cSEPARANDO MELHORES DOS POPULACAO", 'color: red');

    for (var j = 0; j < n; j++) {
        var menor = infinito;

        //seleciona o melhor resultado
        for (var i = 0; i < t; i++) {
            if (cloneDistancias[i] < menor) {
                menor = cloneDistancias[i];
                p = i;
            }
        }

        arrMelhores.push([p, cloneDistancias[p]]);
        cloneDistancias[p] = infinito;
    }

    //    console.log("%cmelhores: ", 'color: green');
    //    console.table(arrMelhores);

    //    console.table(cloneDistancias);

    for (var i = 0; i < t; i++) {
        var menor = infinito;

        if (cloneDistancias[i] < menor) {
            arrPiores.push([i, cloneDistancias[i]]);
        }
    }

    //    console.log("%cpiores: ", 'color: green');
    //    console.table(arrPiores);

    selecaoCrossover();
}

function selecaoCrossover() {
    console.log("%cSELECAO PARA CROSSOVER", "color: red");

    var totalMelhores = 0;
    var fitnes = 0;
    var melhorFitnes = 0;
    var piorFitnes = 0;
    var tamMelhores = arrMelhores.length;
    var roleta = Math.floor(Math.random() * (100));
    var tamPopulacao = arrPopulacao.length;
    var posMelhor;

    //    console.log("%croleta: ", "color:green", roleta);

    //    for (var i = 0; i < tamMelhores; i++) {
    //        totalMelhores = totalMelhores + (arrMelhores[i][1]);
    //    }
    //
    //    //calculo do fitsnes de cada melhor solucao
    //        console.log("%cConjunto de melhores", "color: green");
    //    //    console.log("Mais longe do maior valor");
    //
    //    for (var i = 0; i < tamMelhores; i++) {
    //        fitnes = arredondar((((totalMelhores - arrMelhores[i][1])) * 100) / totalMelhores);
    //
    ////                console.log("individuo" + (i + 1) + ": " + arrMelhores[i][0] + " (" + arrMelhores[i][1] + "-" + totalMelhores + "=" + (totalMelhores - arrMelhores[i][1]) + ")" + " - " + fitnes + "%");
    //
    //        if (fitnes > melhorFitnes) {
    //            eleitoMelhor = arrMelhores[i];
    //            melhorFitnes = fitnes;
    //            posMelhor = i;
    //        }
    //    }
    //
    //        console.log("->Eleito melhor: " + eleitoMelhor[0] + " = " + arrPopulacao[eleitoMelhor[0]]);

    //calculo do fitsnes da pior solucao
    //    var tamPiores = arrPiores.length;
    //    var roleta = Math.floor(Math.random() * (100));
    //    var totalPiores = 0;
    //
    //    console.log("%croleta: ", "color:green", roleta);
    //
    //    for (var i = 0; i < tamPiores; i++) {
    //        totalPiores = totalPiores + (arrPiores[i][1]);
    //    }
    //
    //        console.log("%cConjunto de piores", "color: green");
    //
    //    for (var i = 0; i < tamPiores; i++) {
    //        fitnes = arredondar((((arrPiores[i][1])) * 100) / totalPiores);
    //
    ////                console.log("individuo" + (i + 1) + ": " + arrPiores[i][0] + " (" + arrPiores[i][1] + ")" + " - " + fitnes + "%");
    //
    //        if (fitnes > piorFitnes) {
    //            eleitoPior = arrPiores[i];
    //            piorFitnes = fitnes;
    //        }
    //    }

    //        console.log("->Eleito pior: " + eleitoPior[0] + " = " + arrPopulacao[eleitoPior[0]]);

    //    eleitoMelhor = arrMelhores[0];
    //    eleitoPior = arrMelhores[1];

    //    console.log(eleitoMelhor);

    //    console.table(arrDistancia);

    var totalDistancias = 0;

    for (var i = 0; i < totalPopulacao; i++) {
        totalDistancias = totalDistancias + arrDistancia[i];
    }

    var roleta = Math.floor(Math.random() * (100));
    var maior = 0;
    var p;
    var probAnterior = 0.0;

    //    for (var i = 0; i < totalPopulacao; i++) {
    //        //        var fitness = ((calculaDistancia(arrPopulacao[i])) * 100) / totalDistancias;
    //        //        fitness = fitness.toFixed(2);
    ////        console.log(probAnterior);
    //
    //        var calc = arrDistancia[i] / totalDistancias;
    //        console.log(calc.toFixed(3));
    ////        probAnterior = probAnterior + calc.toFixed(3);
    //
    //        //        console.log(i + "=" + fitness);
    //
    //        //        if (fitness <= roleta && fitness > maior) {
    //        //            maior = fitness;
    //        //            p = i;
    //        //        }
    //    }

    //    console.log("maior: " + p + " = " + maior);

    var ran = 0;

    //        ran = Math.floor(Math.random() * (arrMelhores.length));
    //        eleitoMelhor = arrPopulacao[arrMelhores[ran][0]];
    //    
    //        ran = Math.floor(Math.random() * (arrPiores.length));
    //        eleitoPior = arrPopulacao[arrPiores[ran][0]];

    var ran1 = Math.floor(Math.random() * (arrMelhores.length));
    eleitoMelhor = arrPopulacao[ran1];

    do {
        var ran2 = Math.floor(Math.random() * (arrPiores.length));

    } while (ran2 == ran1);

    eleitoPior = arrPopulacao[ran2];

    //        console.table(arrMelhores);

    //    eleitoMelhor = arrPopulacao[arrMelhores[0][0]];
    //    eleitoPior = arrPopulacao[arrPiores[1][0]];

    var pai1 = eleitoMelhor;
    var pai2 = eleitoPior;

    console.log("sorteio melhor: " + pai1 + "=" + calculaDistancia(pai1));
    console.log("sorteio pior: " + pai2 + "=" + calculaDistancia(pai2));

    filho1 = crossover(pai1, pai2);

    console.log("%cNovo filho 1:", "color: green", filho1 + ": (" + calculaDistancia(filho1) + ")");

    filho2 = crossover(pai2, pai1);

    console.log("%cNovo filho 2:", "color: green", filho2 + ": (" + calculaDistancia(filho2) + ")");

    mutacao();
    geraNovaPopulacao(pai1, pai2);
}

function crossover(pai1, pai2) {
    console.log("%cPAI 1: " + pai1 + " - PAI 2: " + pai2, "color:orange");

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

    //Add gene aleatorio
    //    var genAdd = 0;
    //    do {
    //        var gen = Math.floor(Math.random() * (totalCidades));
    //
    //        if (filho.indexOf(pai2[gen]) == -1) {
    //            filho.push(pai2[gen]);
    //            genAdd++;
    //        }
    //    } while (genAdd < totalCidades - localCorte);

    return filho;
}

function mutacao() {
    var roleta = Math.floor(Math.random() * (100));

    //    console.log("roleta: " + roleta);

    if (roleta <= taxaMutacao) {
        console.log("%cMUTACAO DETECTADA", "color: red");
        var posicao;
        var gene = [];
        var g1, g2;

        g1 = Math.floor(Math.random() * ((totalCidades - 1) - 1 + 1) + 1);

        do {
            g2 = Math.floor(Math.random() * ((totalCidades - 1) - 1 + 1) + 1);
        }
        while (g2 == g1);

        //        console.log("genes escolhidos: " + g1 + ", " + g2);

        var ram = Math.floor(Math.random() * (2));

        //        console.log("Filho sorteado: (" + ram + ")");

        if (ram == 0) {
            var m1 = filho1[g1];
            var m2 = filho1[g2];

            filho1[g1] = m2;
            filho1[g2] = m1;
            console.log("Novo filho 1:" + filho1 + "=" + calculaDistancia(filho1));
        } else {
            var m1 = filho2[g1];
            var m2 = filho2[g2];

            filho2[g1] = m2;
            filho2[g2] = m1;
            console.log("Novo filho 1:" + filho1 + "=" + calculaDistancia(filho1));
        }
    } else {
        console.log("%cSEM MUTACAO", "color: red");
    }
}

function geraNovaPopulacao(pai, mae) {
    var menorEncontrado = false;
    console.log("%cGERANDO NOVA POPULACAO", "color: red");



    //    var ran = Math.floor(Math.random() * (totalPopulacao));

    //    var tam = arrPiores.length;
    //    var menor = 0;
    //    var pior = [];

    //    for (var i = 0; i < tam; i++) {
    //        if (arrPiores[i][1] > menor) {
    //            pior = arrPiores[i][0];
    //            menor = arrPiores[i][1];
    //        }
    //    }

    //    arrPopulacao[pior] = ARRBEST;

    //    console.log("%cNova população", "color: green");
    //    console.table(novaPopulacao);

    for (var i = 0; i < totalPopulacao; i++) {
        if ((calculaDistancia(arrPopulacao[i])) < BEST) {
            ARRBEST = arrPopulacao[i];
            BEST = calculaDistancia(arrPopulacao[i]);
            menorEncontrado = true;
            geracoesSemOtimo = 0;
        }
    }

    novaPopulacao = [];

    for (var i = 0; i < totalPopulacao; i++) {
        if (i != pai && i != mae) {
            novaPopulacao.push(arrPopulacao[i]);
        }
    }

    console.log(">>>BEST: " + ARRBEST + "=" + calculaDistancia(ARRBEST));

    if (!menorEncontrado) {
        geracoesSemOtimo++;
    }

    if (calculaDistancia(filho1) < BEST) {
        novaPopulacao.push(filho1);
    } else {
        novaPopulacao.push(ARRBEST);
    }

    if (calculaDistancia(filho2) < BEST) {
        novaPopulacao.push(filho2);
    } else {
        novaPopulacao.push(mae);
    }

//    novaPopulacao.push(filho1);
//    novaPopulacao.push(filho2);

    arrPopulacao = novaPopulacao;
    //    console.log(arrPopulacao);
    atualizaDistancias();
    //        console.log(arrDistancia);

}

function atualizaDistancias() {
    //    console.log("%cATUALIZA DISTANCIAS", "color: red");
    arrDistancia = [];

    for (var i = 0; i < totalPopulacao; i++) {
        arrDistancia.push(calculaDistancia(arrPopulacao[i]));
    }

    //    console.table(arrDistancia);
}

function retornaMelhor() {
    var menor = infinito;
    var p = 0;

    for (var i = 0; i < arrDistancia.length; i++) {
        if (arrDistancia[i] < menor) {
            menor = arrDistancia[i];
            p = i;
        }
    }

    console.log("%cmelhor da populacao", "color:red", arrPopulacao[p] + " total = " + menor);
    console.log("%cmelhor global: ", "color:red", BEST);

    return menor;
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

function main() {
    geraPopulacaoInicial();
    var i = 0;

    do {
        geraPopulacaoInicial();
        dividePopulacao(arrPopulacao, arrDistancia);
        //        resultadosGeracoes.push(retornaMelhor());
        console.log("%c======================================================== G" + i, "color:red");
        i++;
    } while (i < geracoes);

    console.log(ARRBEST + " = " + calculaDistancia(ARRBEST));
}

main();
