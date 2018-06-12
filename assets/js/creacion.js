//Este modulo se encarga de tener los objetos y métodos necesarios para la creación de la simulación
var galaxia = new Galaxia("Via Láctea");
var nave;
var indicadorCombustible;
var seleccionAux = [];

var ancho = $(window).width();
var alto = $(window).height();
var fondo;
var game;
var grupoSprites;

$(document).ready(function () {
    //Botones de interfaz
    $('#btnCrear, #btnEditar, #btnEliminar, #btnAtras,#cantIridioNave,#cantPlatinoNave,#cantPaladioNave,#cantEZeroNave').popover({
        trigger: 'hover'
    });

    $("#btnCrear").on("click", function () {
        mostrarSideBarConfig();
    });

    $("#btnCerrarSideBar").on("click", function () {
        $('#sideBarConfig, #btnCerrarSideBar').removeClass('active');
        $('#overlay').fadeOut();
    });

    function mostrarSideBarConfig() {
        $('#sideBarConfig, #btnCerrarSideBar').addClass('active');
        $('#overlay').fadeIn();
    }

    $("#btnEliminar").on("click", function () {
        var nombreElemento;
        var arrayElementos;
        var indexElemento;
        var esOrigen;
        var alertOrigen = "";
        var tipo;
        if (planetaActual !== -1) {
            indexElemento = planetaActual;
            arrayElementos = galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[sistemaSolarActual].planetas;
            nombreElemento = arrayElementos[planetaActual].nombre;
            esOrigen = galaxia.planetaOrigen.length > 0 && nebulosaActual === galaxia.planetaOrigen[0] && sistemaSolarActual === galaxia.planetaOrigen[1] && planetaActual === galaxia.planetaOrigen[2];
            tipo = "Planeta";
            if (esOrigen) {
                alertOrigen = "<br>(Es el planeta Inicial)"
            }
        } else if (sistemaSolarActual !== -1) {
            indexElemento = sistemaSolarActual;
            arrayElementos = galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios;
            nombreElemento = arrayElementos[sistemaSolarActual].nombre;
            esOrigen = galaxia.planetaOrigen.length > 0 && nebulosaActual === galaxia.planetaOrigen[0] && sistemaSolarActual === galaxia.planetaOrigen[1];
            tipo = "Sistema Solar";
            if (esOrigen) {
                alertOrigen = "<br>(Contiene el planeta Inicial)"
            }
        } else {
            indexElemento = nebulosaActual;
            arrayElementos = galaxia.Nebulosas;
            nombreElemento = arrayElementos[nebulosaActual].nombre;
            esOrigen = galaxia.planetaOrigen.length > 0 && nebulosaActual === galaxia.planetaOrigen[0];
            tipo = "Nebulosa";
            if (esOrigen) {
                alertOrigen = "<br>(Contiene el planeta Inicial)"
            }
        }

        alertify.confirm('<h3 class="alertify-titulo-info">Eliminar ' + tipo + '</h3>', '<div class="text-center">¿Desea eliminar ' + nombreElemento + '?' + alertOrigen + ' </div>',
            function () {
                $("#btnAtras").click();
                arrayElementos.splice(indexElemento, 1);
                if (esOrigen) {
                    galaxia.planetaOrigen = [];
                }
                var lenArray = arrayElementos.length;
                while (indexElemento < lenArray) {
                    arrayElementos[indexElemento].id = indexElemento;
                    indexElemento++;
                }
                alertify.confirm().destroy();
            },
            function () {
                alertify.confirm().destroy();
            }).set({
            labels: {
                cancel: 'Cancelar',
                ok: 'Aceptar'
            },
            reverseButtons: false
        });
    });

    $("#infoSeleccion").on("click", function () {
        deseleccionar();
    });

    $("#btnInfoFooter").on("click", function () {
        $('#overlay').fadeIn();
        $('#footerGame,#closeFooter').addClass("active");
    });

    $("#closeFooter").on("click", function () {
        $('#overlay').fadeOut();
        $('#footerGame,#closeFooter').removeClass("active");
    });

    indicadorCombustible = new Gauge(document.getElementById("combustibleNivelNave")).setOptions({
        angle: -0.2,
        lineWidth: 0.07,
        radiusScale: 0.75,
        pointer: {
            length: 0.6,
            strokeWidth: 0.02,
            color: '#22A7F0'
        },
        limitMax: true,
        limitMin: false,
        colorStart: '#4183D7',
        colorStop: '#4183D7',
        strokeColor: '#ECECEC',
        generateGradient: true,
        highDpiSupport: true,
        percentColors: [
            [0.0, "#F03434"],
            [0.45, "#F9BF3B"],
            [1.0, "#26A65B"]
        ],
        renderTicks: {
            divisions: 10,
            divWidth: 1,
            divLength: 0.6,
            divColor: '#22313F',
            subDivisions: 3,
            subLength: 0.5,
            subWidth: 0.6,
            subColor: '#2C3E50'
        }
    });
    indicadorCombustible.maxValue = 200000;
    indicadorCombustible.setMinValue(100000);

    //------Creación------

    //Activacion de estilo
    $('.estiloNebulosa').on("click", function () {
        if (!$(this).hasClass("activo")) {
            $(".estiloNebulosa.activo").removeClass("activo");
            $(this).addClass("activo");
        }
    });
    $('.estiloSistemaSolar').on("click", function () {
        if (!$(this).hasClass("activo")) {
            $(".estiloSistemaSolar.activo").removeClass("activo");
            $(this).addClass("activo");
        }
    });
    $('.estiloPlaneta').on("click", function () {
        if (!$(this).hasClass("activo")) {
            $(".estiloPlaneta.activo").removeClass("activo");
            $(this).addClass("activo");
        }
        switch ($(this).attr("data-idImg")) {
            case "planeta1":
                $("#cantIridioRango").val(1000);
                $("#cantPlatinoRango").val(1000);
                $("#cantPaladioRango").val(1000);
                $("#cantEZeroRango").val(1000);
                break;
            case "planeta2":
                $("#cantIridioRango").val(5000);
                $("#cantPlatinoRango").val(3000);
                $("#cantPaladioRango").val(1500);
                $("#cantEZeroRango").val(100);
                break;
            case "planeta3":
                $("#cantIridioRango").val(1000);
                $("#cantPlatinoRango").val(3000);
                $("#cantPaladioRango").val(5000);
                $("#cantEZeroRango").val(7000);
                break;
            case "planeta4":
                $("#cantIridioRango").val(2000);
                $("#cantPlatinoRango").val(5000);
                $("#cantPaladioRango").val(3000);
                $("#cantEZeroRango").val(3000);
                break;
            case "planeta5":
                $("#cantIridioRango").val(6000);
                $("#cantPlatinoRango").val(7000);
                $("#cantPaladioRango").val(5000);
                $("#cantEZeroRango").val(1000);
                break;
        }
        $("#cantIridioRango").trigger("input");
        $("#cantPlatinoRango").trigger("input");
        $("#cantPaladioRango").trigger("input");
        $("#cantEZeroRango").trigger("input");
    });
    $('.estiloEEspacial').on("click", function () {
        if (!$(this).hasClass("activo")) {
            $(".estiloEEspacial.activo").removeClass("activo");
            $(this).addClass("activo");
        }
    });
    $('.estiloTTransportador').on("click", function () {
        if (!$(this).hasClass("activo")) {
            $(".estiloTTransportador.activo").removeClass("activo");
            $(this).addClass("activo");
        }
    });

    $("#selectTipoPlaneta").change(function () {
        switch ($(this).val()) {
            case "planeta":
                $('.estiloPlaneta').removeClass("d-none"); // mostrar estilos planetas 
                $("#materialesPlaneta").removeClass("d-none"); //mostrar materiales
                $('.estiloEEspacial').addClass("d-none"); // ocultar estilos estacion espacial 
                $('.estiloTTransportador').addClass("d-none"); // ocultar estilos teletransportador 
                break;
            case "ecombustible":
                $('.estiloEEspacial').removeClass("d-none"); // mostrar estilos estacion espacial  
                $('.estiloPlaneta').addClass("d-none"); // ocultar estilos planetas 
                $("#materialesPlaneta").addClass("d-none"); // ocultar materiales
                $('.estiloTTransportador').addClass("d-none"); // ocultar estilos teletransportador 
                break;
            case "teletrasportador":
                $('.estiloTTransportador').removeClass("d-none"); // mostrar estilos planetas 
                $('.estiloPlaneta').addClass("d-none"); // ocultar estilos planetas 
                $("#materialesPlaneta").addClass("d-none"); // ocultar materiales
                $('.estiloEEspacial').addClass("d-none"); // ocultar estilos estacion espacial 
                break;
        }
    });
    $("#cantIridioRango").on("input", function () {
        $("#cantIridio").text(this.value + "T");
    });
    $("#cantPlatinoRango").on("input", function () {
        $("#cantPlatino").text(this.value + "T");
    });
    $("#cantPaladioRango").on("input", function () {
        $("#cantPaladio").text(this.value + "T");
    });
    $("#cantEZeroRango").on("input", function () {
        $("#cantEZero").text(this.value + "T");
    });

    $("#btnUbicar").on("click", function () {
        if (nebulosaActual === -1) {
            newNebulosa();
        } else if (sistemaSolarActual === -1) {
            newSisPlanetario();
        } else if (planetaActual === -1) {
            newPlanet();
        }
    });

    //Creación de objetos luego de cargada la pagina
    game = new Phaser.Game(ancho, alto, Phaser.AUTO, 'gameContainer', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });

    function preload() {
        game.load.image('fondoGalaxia', 'assets/images/galaxia.jpg');

        game.load.image('nebulosa1', 'assets/images/nebulosa1.png');
        game.load.image('nebulosa2', 'assets/images/nebulosa2.png');
        game.load.image('nebulosa3', 'assets/images/nebulosa3.png');
        game.load.image('nebulosa4', 'assets/images/nebulosa4.png');
        game.load.image('nebulosa5', 'assets/images/nebulosa5.png');
        game.load.image('fondoNebulosa1', 'assets/images/fondoNebulosa1.png');
        game.load.image('fondoNebulosa2', 'assets/images/fondoNebulosa2.jpeg');
        game.load.image('fondoNebulosa3', 'assets/images/fondoNebulosa3.jpg');
        game.load.image('fondoNebulosa4', 'assets/images/fondoNebulosa4.jpg');
        game.load.image('fondoNebulosa5', 'assets/images/fondoNebulosa5.jpg');
        game.load.image('nebulosa1Peligrosa', 'assets/images/nebulosa1P.png');
        game.load.image('nebulosa2Peligrosa', 'assets/images/nebulosa2P.png');
        game.load.image('nebulosa3Peligrosa', 'assets/images/nebulosa3P.png');
        game.load.image('nebulosa4Peligrosa', 'assets/images/nebulosa4P.png');
        game.load.image('nebulosa5Peligrosa', 'assets/images/nebulosa5P.png');

        game.load.image('sistemasolar1', 'assets/images/sistemasolar1.png');
        game.load.image('sistemasolar2', 'assets/images/sistemasolar2.png');
        game.load.image('sistemasolar3', 'assets/images/sistemasolar3.png');

        game.load.image('fondoSistemaSolar1', 'assets/images/fondoSistemaSolar1.jpg');
        game.load.image('fondoSistemaSolar2', 'assets/images/fondoSistemaSolar2.jpg');
        game.load.image('fondoSistemaSolar3', 'assets/images/fondoSistemaSolar3.jpg');

        game.load.spritesheet('planeta1', 'assets/images/planeta1.png', 100, 100, 91);
        game.load.spritesheet('planeta2', 'assets/images/planeta2.png', 100, 100, 43);
        game.load.spritesheet('planeta3', 'assets/images/planeta3.png', 100, 100, 49);
        game.load.spritesheet('planeta4', 'assets/images/planeta4.png', 100, 100, 80);
        game.load.spritesheet('planeta5', 'assets/images/planeta5.png', 100, 100, 14);
        game.load.image('fondoPlaneta1', 'assets/images/fondoPlaneta1.jpg');
        game.load.image('fondoPlaneta2', 'assets/images/fondoPlaneta2.jpg');
        game.load.image('fondoPlaneta3', 'assets/images/fondoPlaneta3.jpg');
        game.load.image('fondoPlaneta4', 'assets/images/fondoPlaneta4.jpg');
        game.load.image('fondoPlaneta5', 'assets/images/fondoPlaneta5.jpg');

        game.load.image('estacionEspacial1', 'assets/images/estacionEspacial1.png');
        game.load.image('estacionEspacial2', 'assets/images/estacionEspacial2.png');

        game.load.spritesheet('teletransportador1', 'assets/images/teletransportador1.png', 100, 100, 49);
        game.load.spritesheet('teletransportador2', 'assets/images/teletransportador2.png', 100, 100, 72);

        game.load.image('nave', 'assets/images/nave (3).png');

        grupoSprites = game.add.group();
    }


    function create() {
        fondo = game.add.sprite(0, 0, 'fondoGalaxia');
        fondo.height = alto;
        fondo.width = ancho;
        game.world.bringToTop(grupoSprites);
        startGame();
    }

    function update() {
        checkCollision();
        updateLines();
        game.world.bringToTop(grupoSprites);
    }

    function render() {
        if (nebulosaActual !== -1 && sistemaSolarActual === -1) {
            printLines(galaxia.Nebulosas[nebulosaActual].lineas);
        }
        if (sistemaSolarActual !== -1 && planetaActual === -1) {
            printLines(galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[sistemaSolarActual].lineas);
        } else {
            printLines([]);
        }
    }

});

function cargarFormularioNebulosa() {
    $('.estiloSistemaSolar').addClass("d-none"); // ocultar estilos sistema solar
    //Formulario Nebulosa
    $("#crearTituloInfo").text("Creación de Nebulosa"); // cambiar titulo
    $('#nebulosaEsPeligrosa').removeClass("d-none"); //mostrar check es peligrosa
    $('.estiloNebulosa').removeClass("d-none"); // mostrar estilos nebulosa
    $("#listaElementosTituloInfo").text("Lista de Sistemas Solares"); // cambiar texto listas
    $("#btnCrearElemento").text("Crear Sistema Solar"); // cambiar texto botón crear
}

function cargarFormularioSistemaSolar() {
    //De nebulosa a sistema solar
    $('#nebulosaEsPeligrosa').addClass("d-none"); //ocultar check es peligrosa
    $('.estiloNebulosa').addClass("d-none"); // ocultar estilos nebulosa
    //De planeta a sistema Solar
    $("#planetaEsOrigen").addClass("d-none"); // ocultar opción de planeta origen
    $("#tipoPlanetaSelect").addClass("d-none"); // ocultar selección de tipo
    $('.estiloPlaneta, .estiloTTransportador, .estiloEEspacial').addClass("d-none"); // ocultar estilos planetas
    $("#materialesPlaneta").addClass("d-none"); // ocultar materiales
    $("#listaContainer").removeClass("d-none"); // mostrar lista de elementos
    $("#btnCrearElemento").removeClass("d-none"); // mostrar boton crear elemento
    //Formulario Sistema Solar
    $("#crearTituloInfo").text("Creación de Sistema Solar"); // cambiar titulo
    $("#inputNombre").attr("placeholder", "Ingrese el nombre del Sistema Solar"); //cambiar Placeholder
    $('.estiloSistemaSolar').removeClass("d-none"); // mostrar estilos sistema solar
    $("#listaElementosTituloInfo").text("Lista de Planetas"); // cambiar texto listas
    $("#btnCrearElemento").text("Crear Planeta"); // cambiar texto botón crear
}

function cargarFormularioPlaneta() {
    //De Sistema solar a Planeta
    $('.estiloSistemaSolar').addClass("d-none"); // ocultar estilos sistema solar
    $("#listaContainer").addClass("d-none"); // ocultar lista de elementos
    $("#btnCrearElemento").addClass("d-none"); // ocultar boton crear elemento
    $("#inputNombre").attr("placeholder", "Ingrese el nombre del Planeta");
    //Formulario Planeta
    $("#crearTituloInfo").text("Creación de Planeta"); // cambiar titulo
    $("#planetaEsOrigen").removeClass("d-none"); // mostrar opción de planeta origen
    $("#tipoPlanetaSelect").removeClass("d-none"); // mostrar selección de tipo
    $("#selectTipoPlaneta").val("planeta"); //seleccionar tipo planeta
    $('.estiloPlaneta').removeClass("d-none"); // mostrar estilos planetas
    $("#materialesPlaneta").removeClass("d-none"); //mostrar materiales
}

function createLine(arraySelected) {
    var seleccionado;
    var padreSeleccionado;
    if (sistemaSolarActual == -1) {
        padreSeleccionado = galaxia.Nebulosas[nebulosaActual];
        seleccionado = padreSeleccionado.sistemasPlanetarios[arraySelected[2]];
    } else {
        padreSeleccionado = galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[sistemaSolarActual];
        seleccionado = padreSeleccionado.planetas[arraySelected[2]];
    }
    if (seleccionAux.length == 0) {
        seleccionAux = arraySelected;
        $("#infoSeleccion p").text("Se Seleccionó -> " + seleccionado.nombre);
        $("#infoSeleccion").addClass("active");
    } else if (seleccionAux[2] != arraySelected[2]) {
        var seleccionado0;
        if (sistemaSolarActual == -1) {
            seleccionado0 = padreSeleccionado.sistemasPlanetarios[seleccionAux[2]];
            var origen = seleccionado0.nombre;
            var destino = seleccionado.nombre;
            alertify.confirm('<h3 class="alertify-titulo-info">Definir Camino</h3>', '<div class="input-group mb-3">' +
                '<div class="input-group-prepend">' +
                '<span class="input-group-text">Origen:&nbsp;&nbsp;</span>' +
                '</div>' +
                '<input id="inputOrigenCamino" type="text" class="form-control" placeholder="Elemento de Origen" value="' + origen + '" disabled>' +
                '</div>' +
                '<div class="input-group mb-3">' +
                '<div class="input-group-prepend">' +
                '<span class="input-group-text">Destino:</span>' +
                '</div>' +
                '<input id="inputDestinoCamino" type="text" class="form-control" placeholder="Elemento de Destino" value="' + destino + '" disabled>' +
                '</div>' +
                '<div class="input-group mb-3">' +
                '<div class="input-group-prepend">' +
                '<span class="input-group-text">Costo:</span>' +
                '</div>' +
                '<input id="inputCostoCamino" type="text" class="form-control" placeholder="Costo del camino">' +
                '</div>',
                function (closeEvent) {
                    var costo = document.getElementById("inputCostoCamino").value;
                    if ($.isNumeric(costo)) {
                        padreSeleccionado.matrizAdy[seleccionAux[2]][arraySelected[2]] = parseInt(costo);
                        padreSeleccionado.matrizAdy[seleccionAux[2]][arraySelected[2]] = parseInt(costo);
                        var line = new Phaser.Line(seleccionAux[0], seleccionAux[1], arraySelected[0], arraySelected[1]);
                        padreSeleccionado.lineas.push(line);
                        printLines(padreSeleccionado.lineas);
                        padreSeleccionado.lineasXmatriz.push([line, seleccionAux[2], arraySelected[2]]);
                        deseleccionar();
                        alertify.confirm().destroy();
                    } else {
                        closeEvent.cancel = true;
                        alertify.error('Ingrese un valor numérico');
                    }
                },
                function () {
                    alertify.confirm().destroy();
                }).set({
                labels: {
                    cancel: 'Cancelar',
                    ok: 'Guardar'
                },
                reverseButtons: false
            });
        } else {
            padreSeleccionado.matrizAdy[seleccionAux[2]][arraySelected[2]] = 1;
            padreSeleccionado.matrizAdy[arraySelected[2]][seleccionAux[2]] = 1;
            var line = new Phaser.Line(seleccionAux[1], seleccionAux[1], arraySelected[0], arraySelected[1]);
            padreSeleccionado.lineas.push(line);
            printLines(padreSeleccionado.lineas);
            padreSeleccionado.lineasXmatriz.push([line, seleccionAux[2], arraySelected[2]]);
            deseleccionar();
        }
    }
}

function deseleccionar() {
    if (seleccionAux.length > 0) {
        $("#infoSeleccion").removeClass("active");
        $("#infoSeleccion p").text("");
        seleccionAux = [];
    }
}

function newNebulosa() {
    var idNeb = galaxia.Nebulosas.length
    var peligrosa = false;
    document.getElementById("checkNebulosaEsPeligrosa").checked ? peligrosa = true : false;
    var selected = objectSelected(".estiloNebulosa", peligrosa);
    var nebulaSprite = game.add.sprite(100, 100, selected);
    grupoSprites.add(nebulaSprite);
    nebulaSprite.width = 180;
    nebulaSprite.height = 180;
    nebulaSprite.inputEnabled = true;
    nebulaSprite.events.onInputUp.add(clickNebula, {
        idNeb: idNeb
    }, this);
    nebulaSprite.input.enableDrag();
    var nombre = document.getElementById("inputNombre").value;
    if ((nombre.trim()).length === 0) {
        nombre = "Nebulosa " + (idNeb + 1)
    }
    var nebulosa = new Nebulosa(idNeb, nombre, peligrosa, nebulaSprite);
    galaxia.Nebulosas.push(nebulosa);
    document.getElementById("inputNombre").value = "";
}

function newSisPlanetario() {
    if (nebulosaActual !== -1) {
        var idSisPlanetario = galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios.length;
        var selected = objectSelected(".estiloSistemaSolar", false);
        var sisPlanSprite = game.add.sprite(100, 100, selected);
        sisPlanSprite.width = 100;
        sisPlanSprite.height = 100;
        sisPlanSprite.inputEnabled = true;
        sisPlanSprite.events.onInputDown.add(clickSisPlanetario, {
            id: idSisPlanetario
        }, this);
        sisPlanSprite.input.enableDrag();
        grupoSprites.add(sisPlanSprite);
        var nombre = document.getElementById("inputNombre").value;
        if ((nombre.trim()).length === 0) {
            nombre = "Sistema Solar " + (idSisPlanetario + 1)
        }
        var sistemaPlanetario = new SistemasPlanetarios(idSisPlanetario, nombre, sisPlanSprite);
        galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios.push(sistemaPlanetario);
        addColumnMatrizAdy(galaxia.Nebulosas[nebulosaActual].matrizAdy);
        document.getElementById("inputNombre").value = "";
    } else {
        console.log("No hay seleccionada ninguna nebulosa");
    }
}

function newPlanet() {
    var idPlaneta = galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[sistemaSolarActual].planetas.length;
    var tipoPlaneta = document.getElementById("selectTipoPlaneta").value;
    var selected = "";
    switch (tipoPlaneta) {
        case "planeta":
            selected = objectSelected(".estiloPlaneta", false);
            if ($("#checkPlanetaEsOrigen").is(":checked")) {
                if (galaxia.planetaOrigen.length == 3) {
                    alertify.confirm('<h3 class="alertify-titulo-info">Planeta Inicial</h3>', '<div class="text-center">Ya existe un planeta inicial <br>' +
                        '¿Desea elegir este planeta como inicial?</div>',
                        function () {
                            galaxia.planetaOrigen = [nebulosaActual, sistemaSolarActual, idPlaneta];
                            alert(nebulosaActual + "," + sistemaSolarActual + "," + idPlaneta);
                        },
                        function () {
                            alertify.confirm().destroy();
                        }).set({
                        labels: {
                            cancel: 'Cancelar',
                            ok: 'Aceptar'
                        },
                        reverseButtons: false
                    });
                } else {
                    galaxia.planetaOrigen = [nebulosaActual, sistemaSolarActual, idPlaneta];
                }
                $('#checkPlanetaEsOrigen').prop('checked', false);
            }
            break;
        case "ecombustible":
            selected = objectSelected(".estiloEEspacial", false);
            if (galaxia.Nebulosas[nebulosaActual].tieneEstacionEspacial) {
                alertify.error('La nebulosa ya cuenta con estación de combustible');
                return;
            } else {
                galaxia.Nebulosas[nebulosaActual].tieneEstacionEspacial = true;
            }
            break;
        case "teletrasportador":
            selected = objectSelected(".estiloTTransportador", false);
            if (galaxia.Nebulosas[nebulosaActual].tieneTeletransportador) {
                alertify.error('La nebulosa ya cuenta con teletransportador');
                return;
            } else {
                galaxia.Nebulosas[nebulosaActual].tieneTeletransportador = true;
            }
            break;
    }
    var Sprite = game.add.sprite(100, 100, selected);
    Sprite.width = 100;
    Sprite.height = 100;
    Sprite.events.onInputDown.add(clickPlaneta, {
        id: idPlaneta,
        tipo: tipoPlaneta
    }, this);
    Sprite.inputEnabled = true;
    Sprite.input.enableDrag();
    grupoSprites.add(Sprite);
    var elemento0 = 0;
    var iridio = 0;
    var platino = 0;
    var paladio = 0;
    if (tipoPlaneta === "planeta") {
        elemento0 = document.getElementById("cantEZeroRango").value;
        iridio = document.getElementById("cantIridioRango").value;
        platino = document.getElementById("cantPlatinoRango").value;
        paladio = document.getElementById("cantPaladioRango").value;
    }
    if (tipoPlaneta === "teletrasportador" || tipoPlaneta === "planeta") {
        var giro = Sprite.animations.add('giro');
        Sprite.animations.play('giro', 5, true);
    }
    var nombre = document.getElementById("inputNombre").value;
    if ((nombre.trim()).length === 0) {
        nombre = "Planeta " + (idPlaneta + 1)
    }
    var planeta = new Planetas(idPlaneta, nombre, iridio, platino, paladio, elemento0, tipoPlaneta, Sprite);
    galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[sistemaSolarActual].planetas.push(planeta);
    addColumnMatrizAdy(galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[sistemaSolarActual].matrizAdy);
    document.getElementById("inputNombre").value = "";
}

function addColumnMatrizAdy(matriz) {
    matriz.push(new Array(matriz.length).fill(99999999));
    for (var i = 0; i < matriz.length; i++) {
        matriz[i].push(99999999);
    }
}

function objectSelected(ObjectSearch, peligro) {
    var selected = "";
    $.each($(ObjectSearch), function (index, value) {
        if ($(value).hasClass("activo")) {
            selected = value.getAttribute("data-idImg");
            if (peligro) {
                selected += "Peligrosa";
            }
            return false;
        }
    });
    return selected;
}

alertify.defaults = {
    autoReset: true,
    basic: false,
    closable: false,
    closableByDimmer: false,
    frameless: false,
    maintainFocus: true,
    maximizable: false,
    modal: true,
    movable: false,
    moveBounded: false,
    overflow: true,
    padding: false,
    pinnable: true,
    pinned: true,
    preventBodyShift: false,
    resizable: false,
    startMaximized: false,
    transition: "zoom",
    notifier: {
        delay: 5,
        position: 'bottom-right',
        closeButton: false
    },
    glossary: {
        ok: 'Aceptar',
        cancel: 'Cancelar'
    },
    theme: {
        input: "form-control",
        ok: "btn btn-primario",
        cancel: "btn btn-secundario"
    }
};