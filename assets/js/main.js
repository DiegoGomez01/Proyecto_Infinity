$(document).ready(function () {
    $('body').on('contextmenu', 'canvas', function (e) {
        return false;
    });

    $("#btnUbicar").on("click", function () {
        var nombre = document.getElementById("inputNombre").value;
        if((nombre.trim()).length!==0) {
            if (nebulosaVisitada === -1) {
                newNebulosa();
            } else if (sisPlanetarioVisitada === -1) {
                newSisPlanetario();
            } else if (planetaVisitada === -1) {
                newPlanet();
            }
        }else{
            alertify.alert("Por favor ingrese el nombre.").setHeader("Error!");
        }
    });

    $("#btnAtras").on("click", function () {
        if(nebulosaVisitada!==-1) {
            if (planetaVisitada !== -1) {
                cargarFormularioPlaneta();
                actualizarUbicacionVista("sisPlanetario");
                killSprite(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada].planetas);
                planetaVisitada = -1;
            } else if (sisPlanetarioVisitada !== -1) {
                cargarFormularioSistemaSolar();
                killSprite(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada].planetas);
                sisPlanetarioVisitada = -1;
                actualizarUbicacionVista("nebulosa");
            } else {
                cargarFormularioNebulosa();
                killSprite(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios);
                nebulosaVisitada = -1;
                actualizarUbicacionVista("galaxia");
            }
            pintarFondo();
        }
    });

    var posicionesLineas = [];
    var elementoSeleccionado = [];
    var nebulosaVisitada = -1;
    var sisPlanetarioVisitada = -1;
    var planetaVisitada = -1;
    var fondo;

    var ancho = $(window).width();
    var alto = $(window).height();

    var galaxia = new Galaxia("Via Láctea");

    var game = new Phaser.Game(ancho, alto, Phaser.AUTO, 'gameContainer', {
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
    }


    function create() {
        fondo = game.add.sprite(0, 0, 'fondoGalaxia');
        fondo.height = alto;
        fondo.width = ancho;
        startGame();
    }

    function update() {
        updateLines();
    }

    function render() {
        if (nebulosaVisitada !== -1 && sisPlanetarioVisitada === -1) {
            printLines(galaxia.Nebulosas[nebulosaVisitada].lineas);
        }
        if (sisPlanetarioVisitada !== -1 && sisPlanetarioVisitada !== -1 && planetaVisitada === -1) {
            printLines(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada].lineas);
        } else {
            printLines([]);
        }
    }

    function startGame() {
        game.input.mouse.capture = true;
    }

    function pintarFondo() {
        if (nebulosaVisitada === -1) {
            fondo.loadTexture('fondoGalaxia', 0);
            resetScript(galaxia.Nebulosas);
        } else if (sisPlanetarioVisitada === -1) {
            var numeroNebulosa = returnIdBackground("sisPlanetarios");
            fondo.loadTexture('fondoNebulosa'+numeroNebulosa, 0);
            resetScript(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios);
        } else if (planetaVisitada === -1) {
            var numeroSisP = returnIdBackground("planetas");
            fondo.loadTexture('fondoSistemaSolar'+numeroSisP, 0);
            resetScript(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada].planetas);
        } else {
            //LA VISTA CONCRETA DENTRO DE UN PLANETA
        }
        fondo.height = alto;
        fondo.width = ancho;
    }

    function returnIdBackground(Ubicacion){
        var object="";
        var numero=-1;
        if(Ubicacion==="sisPlanetarios"){
            object = galaxia.Nebulosas[nebulosaVisitada].sprite.key;
            numero = object.substr(object.length-1,object.length-1);
            if(numero==="a"){//ultima letra de peligrosa => a
                numero = object.substr(object.length-10,object.length-10);//elimino la subsecuencia Peligrosa
                console.log(numero);
            }
        }else{
            object = galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada].sprite.key;
            numero = object.substr(object.length-1,object.length-1);
        }
        return parseInt(numero);
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

    function newNebulosa() {
        var idNeb = galaxia.Nebulosas.length;
        var peligrosa = false;
        document.getElementById("checkNebulosaEsPeligrosa").checked ? peligrosa = true : false;
        var selected = objectSelected(".estiloNebulosa", peligrosa);
        var nebulaSprite = game.add.sprite(100, 100, selected);
        nebulaSprite.width = 180;
        nebulaSprite.height = 180;
        nebulaSprite.inputEnabled = true;
        nebulaSprite.events.onInputUp.add(clickNebula, {
            idNeb: idNeb
        }, this);
        nebulaSprite.input.enableDrag();
        var nombre = document.getElementById("inputNombre").value;
        var nebulosa = new Nebulosa(idNeb, nombre, peligrosa, nebulaSprite);
        galaxia.Nebulosas.push(nebulosa);
        document.getElementById("inputNombre").value="";
    }

    function newSisPlanetario() {
        if (nebulosaVisitada !== -1) {
            var idSisPlanetario = galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios.length;
            var selected = objectSelected(".estiloSistemaSolar", false);
            var sisPlanSprite = game.add.sprite(100, 100, selected);
            sisPlanSprite.width = 100;
            sisPlanSprite.height = 100;
            sisPlanSprite.inputEnabled = true;
            sisPlanSprite.events.onInputDown.add(clickSisPlanetario, {
                id: idSisPlanetario
            }, this);
            sisPlanSprite.input.enableDrag();
            var nombre = document.getElementById("inputNombre").value;
            var sistemaPlanetario = new SistemasPlanetarios(idSisPlanetario, nombre, sisPlanSprite);
            galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios.push(sistemaPlanetario);
            addColumnMatrizAdy(galaxia.Nebulosas[nebulosaVisitada].matrizAdy);
            document.getElementById("inputNombre").value="";
        } else {
            console.log("No hay seleccionada ninguna nebulosa");
        }
    }

    function newPlanet() {
        var idPlaneta = galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada].planetas.length;
        var tipoPlaneta = document.getElementById("selectTipoPlaneta").value;
        var selected = "";
        switch (tipoPlaneta) {
            case "planeta":
                selected = objectSelected(".estiloPlaneta", false);
                break;
            case "ecombustible":
                selected = objectSelected(".estiloEEspacial", false);
                break;
            case "teletrasportador":
                selected = objectSelected(".estiloTTransportador", false);
                break;
        }
        var Sprite = game.add.sprite(100, 100, selected);
        Sprite.width = 100;
        Sprite.height = 100;
        Sprite.inputEnabled = true;
        Sprite.events.onInputDown.add(clickPlaneta, {
            id: idPlaneta
        }, this);
        Sprite.input.enableDrag();
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
        if(tipoPlaneta==="teletrasportador" || tipoPlaneta==="planeta"){
            var giro = Sprite.animations.add('giro');
            Sprite.animations.play('giro', 30, true);
        }
        var nombre = document.getElementById("inputNombre").value;
        var planeta = new Planetas(idPlaneta, nombre, iridio, platino, paladio, elemento0, tipoPlaneta, Sprite);
        galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada].planetas.push(planeta);
        addColumnMatrizAdy(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada].matrizAdy);
        document.getElementById("inputNombre").value="";
    }

    function clickNebula(sprite, pointer) {
        if (!isDrag()) {
            cargarFormularioSistemaSolar();
            nebulosaVisitada = this.idNeb;
            actualizarUbicacionVista("nebulosa");
            resetScript(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios);
            killSprite(galaxia.Nebulosas);
            pintarFondo();
        }
    }

    function clickSisPlanetario(sprite, pointer) {
        ObjectsToCreateMatriz(pointer, "sisPlanetario", galaxia.Nebulosas[nebulosaVisitada], this.id);
    }

    function clickPlaneta(sprite, pointer) {
        ObjectsToCreateMatriz(pointer, "Planeta", galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada], this.id);
    }

    function ObjectsToCreateMatriz(pointer, tipo, Object, id) {
        if (!isDrag()) {
            if (pointer.rightButton.isUp) {
                //Click IZQUIERDO
                tipo === "sisPlanetario" ? gotoSistemaPlanetario(id) : gotoPlanet(id);
            } else {
                //Click DERECHO
                posicionesLineas.push(pointer.position.x);
                posicionesLineas.push(pointer.position.y);
                elementoSeleccionado.push(id);
                if (posicionesLineas.length === 4) {
                    if (elementoSeleccionado[0] !== elementoSeleccionado[1]) {
                        idElementoSeleccionado1 = elementoSeleccionado[0];
                        idElementoSeleccionado2 = elementoSeleccionado[1];
                        if (tipo === "sisPlanetario") {
                            var origen = Object.sistemasPlanetarios[idElementoSeleccionado1].nombre;
                            var destino = Object.sistemasPlanetarios[idElementoSeleccionado2].nombre;
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
                                        Object.matrizAdy[idElementoSeleccionado1][idElementoSeleccionado2] = parseInt(costo);
                                        Object.matrizAdy[idElementoSeleccionado2][idElementoSeleccionado1] = parseInt(costo);
                                        var line = new Phaser.Line(posicionesLineas[0], posicionesLineas[1], posicionesLineas[2], posicionesLineas[3]);
                                        Object.lineas.push(line);
                                        printLines(Object.lineas);
                                        Object.lineasXmatriz.push([line, idElementoSeleccionado1, idElementoSeleccionado2]);
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
                            Object.matrizAdy[idElementoSeleccionado1][idElementoSeleccionado2] = 1;
                            Object.matrizAdy[idElementoSeleccionado2][idElementoSeleccionado1] = 1;
                            var line = new Phaser.Line(posicionesLineas[0], posicionesLineas[1], posicionesLineas[2], posicionesLineas[3]);
                            Object.lineas.push(line);
                            printLines(Object.lineas);
                            Object.lineasXmatriz.push([line, idElementoSeleccionado1, idElementoSeleccionado2]);
                        }
                    }
                    elementoSeleccionado = [];
                    posicionesLineas = [];
                }
            }
        }
    }

    function gotoSistemaPlanetario(id) {
        setTimeout(function () {
            if (!isDrag()) {
                cargarFormularioPlaneta();
                sisPlanetarioVisitada = id;
                actualizarUbicacionVista("sisPlanetario");
                resetScript(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada].planetas);
                killSprite(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios);
                pintarFondo();
            }
        }, 200);
    }

    function gotoPlanet(id) {
        setTimeout(function () {
            if (!isDrag()) {
                actualizarUbicacionVista("planeta");
                console.log("ABRIRA EL PLANETA");
            }
        }, 200);
    }

    function killSprite(Object) {
        Object.forEach(function (obj) {
            obj.sprite.kill();

        });
    }

    function resetScript(Object) {
        Object.forEach(function (obj) {
            obj.sprite.reset(obj.sprite.position.x, obj.sprite.position.y);
        });
    }

    function printLines(arrayLineas) {
        if (arrayLineas.length === 0) {
            var line = new Phaser.Line(0, 0, 0, 0);
            arrayLineas = [line];
        }
        arrayLineas.forEach(function (line) {
            game.debug.geom(line, "#ffffff");
        });
    }


    function updateLines() {
        if (sisPlanetarioVisitada !== -1) {
            lineasObjectToDraw(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada], galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada].planetas);
        } else if (nebulosaVisitada !== -1) {
            lineasObjectToDraw(galaxia.Nebulosas[nebulosaVisitada], galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios);
        }
    }

    function lineasObjectToDraw(Object, elemento) {
        Object.lineasXmatriz.forEach(function (element) {
            var sprite1 = elemento[element[1]].sprite;
            var sprite2 = elemento[element[2]].sprite;
            element[0].fromSprite(sprite1, sprite2, true);
        });
    }

    function addColumnMatrizAdy(matriz) {
        matriz.push(new Array(matriz.length).fill(0));
        for (var i = 0; i < matriz.length; i++) {
            matriz[i].push(0);
        }
    }

    function isDrag() {
        var distanceFromLastUp = Phaser.Math.distance(game.input.activePointer.positionDown.x, game.input.activePointer.positionDown.y, game.input.activePointer.x, game.input.activePointer.y);
        if (distanceFromLastUp !== 0) {
            return true;
        } else {
            return false;
        }
    }

    function actualizarUbicacionVista(ubicacion) {
        var nebulosa="";
        var sisPlanetario="";
        var planeta="";
        switch (ubicacion){
            case "nebulosa":
                nebulosa= galaxia.Nebulosas[nebulosaVisitada].nombre;
                document.getElementById("infoUbic").innerHTML = galaxia.nombre+" / "+nebulosa;
                break;
            case "sisPlanetario":
                nebulosa= galaxia.Nebulosas[nebulosaVisitada].nombre;
                sisPlanetario = galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada].nombre;
                document.getElementById("infoUbic").innerHTML = galaxia.nombre+" / "+nebulosa +" / "+sisPlanetario;
                break;
            case "Planeta":
                nebulosa= galaxia.Nebulosas[nebulosaVisitada].nombre;
                sisPlanetario = galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada].nombre;
                planeta = galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada].planetas[planetaVisitada].nombre;
                document.getElementById("infoUbic").innerHTML = galaxia.nombre+" / "+nebulosa +" / "+sisPlanetario + " / "+planeta;
                break;
            default:
                document.getElementById("infoUbic").innerHTML = galaxia.nombre;
                break;
        }

    }

});