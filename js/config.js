//var arrCidades = [1, 2, 3, 4, 5];
//var mDist = [
//    [00,01,15,05,02],
//    [01,00,01,52,27],
//    [15,01,00,01,14],
//    [05,52,01,00,01],
//    [02,27,14,01,00]
//];

//var arrCidades = [1, 2, 3, 4,6,7,8];
//var mDist = [
//[0, 1, 35, 72, 12, 86, 55],
//[1, 0, 1, 120, 88, 13, 42],
//[35, 1, 0, 1, 53, 120, 113],
//[72, 120, 1, 0, 1, 155, 132],
//[12, 88, 53, 1, 0, 1, 110],
//[86, 13, 120, 155, 1, 0, 1],
//[55, 42, 113, 132, 110, 1, 0]
//];

//var arrCidades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//var mDist = [
//[0, 1, 35, 72, 12, 86, 55, 43, 99, 30],
//[1, 0, 1, 120, 88, 13, 42, 33, 68, 74],
//[35, 1, 0, 1, 53, 120, 113, 155, 41, 110],
//[72, 120, 1, 0, 1, 155, 132, 166, 170, 110],
//[12, 88, 53, 1, 0, 1, 110, 75, 190, 180],
//[86, 13, 120, 155, 1, 0, 1, 142, 111, 152],
//[55, 42, 113, 132, 110, 1, 0, 1, 187, 195],
//[43, 33, 155, 166, 75, 142, 1, 0, 1, 220],
//[99, 68, 41, 170, 190, 111, 187, 1, 0, 1],
//[30, 74, 110, 110, 180, 152, 195, 220, 1, 0]
//];

//configurações
var geracoes = 4000;
var iteracao = 0;
var totalPopulacao = 700;
var cidadeInicial = 1;
var localCorte = totalCidades / 2;
var taxaMutacao = 30;
var preservacao = 3; //total de individuos a serem preservados em cada geracao
var arrCidades = [];