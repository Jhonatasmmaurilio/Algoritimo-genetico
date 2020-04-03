/*
	
	Language: Português-BR
	Author: Hanor Sátiro Cintra
	
	Resumo - 
	Este exemplo abaixo é o algoritmo genético implementado. Os passos bases do algoritmo genético estão descritos no site: http://www.obitko.com/tutorials/genetic-algorithms/
	Objetivo - 
	O algoritmo genético é extremamente eficaz para uma série de fatores e aplicações, porém, para o exemplo abaixo, defino um número em que quero chegar e executo o algoritmo 
	genético para tentar obter em 50 gerações o número almejado.
*/


var objective = 80;
var maxGerations = 2;
var iterator = 0;
var genesis = [];
var maxCromons = 10;
var maxInterval = 85;

function cromonStruct() {
    this.number = null;
    this.pontuation = null;
}

//Primeiro passo do algoritmo genético: Criar uma população genêsis(população inicial)

for (var i = 0; i < maxCromons; i++) {
    var newCromon = new cromonStruct();
    newCromon.number = Math.floor((Math.random() * maxInterval) + 1) // número aleatório entre 1 e 100;
    genesis.push(newCromon);
}
//genesis está completa. Segundo Passo: Chamar a função do AG passando a população inicial


var algoritmoGenetico = {
    init: function (population) {
        var self = this;
        console.log("POPULACAO INICIAL");
//        console.table(population);
        self.setup(population);
    },
    setup: function (population) {
        var self = this;
        if (iterator < maxGerations)
            self.geneticArc(population);
        else
            self.showResult(population)
    },
    adequationArc: function (cromon) {
        var self = this;
        //conforme a proximidade com a melhor resposta, o valor da pontuação é maior
        var diff = objective - cromon.number;
        if (diff < 0)
            diff = diff * -1;

        cromon.pontuation = 100 - diff;
        return cromon.pontuation;
    },
    geneticArc: function (population) {
        var self = this;
        var newPopulation = [];
        var maxPontuation = 0;
        
        console.log("popolacao antiga");
        console.table(population);

        //Está é a função arquiteta do AG. Terceiro Passo: Cada individuo da população deve receber uma pontuação. 
        //A pontuação é dada conforme o nível de proximidade com a melhor resposta
        console.log("PONTUANDO");
        for (var i = 0; i < population.length; i++) {
            var cromon = population[i];
            maxPontuation += self.adequationArc(cromon);
        }

        console.log("ORDENANDO");
        
        //ordena do mais pontuado ao menos pontuado
        population.sort(function (a, b) {
            if (a.pontuation > b.pontuation) {
                return -1;
            }
            if (a.pontuation < b.pontuation) {
                return 1;
            }
            return 0;
        })
        
        console.table(population);
        
        console.log("CRIANDO NOVA POPULACAO");

        if (iterator < maxGerations && population[0].number != objective) {
            //Individuos receberam pontuações e tb, foram ordenados. Quarto passo: Hereditariedade

            //o tamanho da minha população é 10. Assim como na natureza, aquilo que se é bom geralmente é preservado, por está razão, os dois melhores individuos
            //serão mantidos para a proxima população. HEREDITARIEDADE!		
            newPopulation.push(population[0]);
            newPopulation.push(population[1]);
            
            console.log("melhores adicioandos");
            console.table(newPopulation);

            //Os dois melhores da população foram salvos. Quinto Passo: O Cruzamento

            for (var i = 0; i < (maxCromons - 2); i++) {
                // é necessário obter um pai
                var father = self.getParents(population, maxPontuation);
                // é necessário obter uma mãe que seja diferente do pai
                var mother = self.getParents(population, maxPontuation, father); // obtenho um individuo para ser a mãe se o mesmo for diferente do pai.
                var newCromon = new cromonStruct();
                //Já sei que são os pais. Sexto passo: Mutação
                var randMutation = Math.floor((Math.random() * 100) + 1); // um bom valor para mutação está entre 0.5 e 1 %;
                if (randMutation == 10) //se for 1, mutação :)
                {
                    newCromon.number = Math.floor((Math.random() * maxInterval) + 1)
                    console.log("ARRRRRRRRRRRRRRYHHHHHHHHHGGGGGGGGGGGGGG MUTAÇÃO!!!  Sentinelas:[ON] auhsdhuasd");
                } else {
                    //					console.log("Pai:"+father.number)
                    //					console.log("Mãe: "+mother.number)
                    newCromon.number = Math.floor((father.number + mother.number) / 2);
                }
                newPopulation.push(newCromon);
            }
            iterator++;
            
            console.log("reiniando AG");
            console.log("POPULCAO CRIADA");
            console.table(newPopulation);
            
            self.geneticArc(newPopulation);
        } else {
            self.showResult(population);
        }

    },
    getParents: function (population, maxPontuation, father) {
        var self = this;
        var rand = Math.floor((Math.random() * maxPontuation) + 1);
        var max = 0;
        for (var i = 0; i < population.length; i++) {
            max += population[i].pontuation;
            if (rand <= max) {
                if (father && population[i] == father) {
                    return self.getParents(population, maxPontuation, father);
                } else {
                    return population[i];
                }
            }
        }
    },
    showResult: function (population) {
        console.log("Individuo máximo: " + population[0].number + "\nNúmero de Interações: " + iterator + "\nPontuação: " + population[0].pontuation);
        
        console.log("populacao final");
        console.table(population);
        
    }
}

var newAg = Object.create(algoritmoGenetico);
newAg.init(genesis)
