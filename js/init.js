var totalCidades = 0;

$(document).ready(function () {
    $('.modal').modal();
    $('select').formSelect();

    var matrizDistancia = [];
    var arrTemp = [];
    var arrNomeCidades = [];

    $(".gerarcidades").click(function () {
        if ($(".totalcidades")[0].checkValidity()) {
            totalCidades = Number.parseInt($(".totalcidades").val());
            $(".nomecidades").html("");

            for (var i = 0; i < totalCidades; i++) {
                $(".nomecidades").append(
                    "<div class='input-field col'>" +
                    "<input required='true' id='cid" + i + "' type='text' class='validate nomecidade-" + i + "'><label for='cid" + i + "'>Cidade " + (i + 1) + "</label>" +
                    "</div>");
            };

            $("#modalcidades").modal("open");
        }
    });

    $(".btnsalvar").click(function () {
        $(".calculardist").addClass("disabled");
        arrNomeCidades = [];

        for (var i = 0; i < totalCidades; i++) {
            arrNomeCidades.push($(".nomecidade-" + i).val());
        }

        if ($("#formcidade")[0].checkValidity()) {
            M.toast({
                html: 'Cidades cadastradas com sucesso!'
            });

            $("#modalcidades").modal("close");

            $(".inserirdistancias").removeClass("disabled");

        } else {
            M.toast({
                html: 'Todos os campos são obrigatorios'
            });
        }
    });

    $(".inserirdistancias").click(function () {
        var total = totalCidades;
        var table = "<table><thead><tr>";

        for (var i = 0; i < total + 1; i++) {
            if (i == 0) {
                table += "<th>#</th>";
            } else {
                table += "<th>c" + i + "</th>";
            }
        }

        table += "</tr></thead><tbody>";

        matrizDistancia = [];

        for (var j = 0; j < total; j++) {
            table += "<tr><td><b>c" + (j + 1) + "<b></td>";

            arrTemp = [];

            for (var i = 0; i < total; i++) {
                if (j == i) {
                    table += "<td><input data-esp='" + j + "-" + i + "' class='inputdist input-" + i + "-" + j + "' type='number' min='0' disabled value='0' required></td>";
                    arrTemp.push(0);
                } else {
                    table += "<td><input data-esp='" + j + "-" + i + "' class='inputdist input-" + i + "-" + j + "' type='number' min='0' required></td>";

                    arrTemp.push("");
                }
            }

            matrizDistancia.push(arrTemp);

            table += "</tr>";
        }

        table += "</tbody></table>";

        $(".matrizdistancia").html(table);

        $(".inputdist").focusout(function () {
            var el = $(this);
            if (el.val()) {
                $(".input-" + el.data("esp")).val(el.val());
                var str = el.data("esp").split("-");
                matrizDistancia[str[0]][str[1]] = Number.parseInt(el.val());
                matrizDistancia[str[1]][str[0]] = Number.parseInt(el.val());
            }
        });

        $("#modaldistancias").modal("open");
    });

    $(".salvardistancia").click(function () {
        var erro = false;

        $(".inputdist").each(function () {
            if (!$(this)[0].checkValidity()) {
                erro = true;
            }
        });

        if (!erro) {
            mDist = matrizDistancia;

            $("#modaldistancias").modal("close");
            $(".calculardist").removeClass("disabled");

            M.toast({
                html: 'Distancias cadastradas com sucesso!'
            });

        } else {
            M.toast({
                html: 'Todos os campos são obrigatorios, e somente números permitidos'
            });
        }
    });

    $(".calculardist").click(function () {
        var el = $(this);
        
        el.html("Aguarde uns instantes...");
        el.addClass("disabled");

        setTimeout(function () {
            var resultado = main();

            imprimeMelhorResultado(resultado);

            el.removeClass("disabled");
            el.html("Calcular distancias");
        }, 1000);
    });

    function imprimeMelhorResultado(resultado) {
        $(".resultado").html("");
        $(".resultado").html("<h5>A menor rota será:</h5><br>");

        for (var i = 0; i < resultado.length - 1; i++) {
            var nome = arrNomeCidades[resultado[i] - 1];

            $(".resultado").append("<span class='cidadebadge'>" + nome + "</span>");
        }

        $(".resultado").append("<br><h5>TOTAL: " + resultado[resultado.length - 1] + "</h5>");
    }
});
