$(document).ready(function () {
    $('body').on('contextmenu', 'canvas', function(e){ return false; });

    $("#btnConfig").on("click", function () {
        $('#sideBarConfig').addClass('active');
        $('#overlay').fadeIn();
    });

    $("#nebulosa").on("click", function () {
        newNebulosa();
    });

    $("#planeta").on("click", function () {
        newPlanet();
    });

    $("#sisPlanetario").on("click", function () {
        newSisPlanetario();
    });


    $("#atras").on("click", function () {
        if(planetaVisitada!==-1){
            killSprite(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada].planetas);
            planetaVisitada=-1;
        }else if(sisPlanetarioVisitada!==-1){
            killSprite(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada].planetas);
            sisPlanetarioVisitada=-1;
        }else{
            killSprite(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios);
            nebulosaVisitada=-1;
        }

        pintarFondo();
    });

    var posicionesLineas=[];
    var elementoSeleccionado=[];
    var nebulosaVisitada=-1;
    var sisPlanetarioVisitada=-1;
    var planetaVisitada=-1;
    var fondo;

    var ancho = $(window).width();
    var alto = $(window).height();

    var galaxia = new Galaxia("Galaxia");

    var game = new Phaser.Game(ancho,alto,Phaser.AUTO,'gameContainer',{preload:preload,create:create,update:update,render:render});

    function preload() {
        game.load.image('image', 'assets/images/favicon.png');
        game.load.image('sistemasolar1', 'assets/images/sistemasolar1.png');
        game.load.image('fondoGalaxia', 'assets/images/galaxia.jpg');
        game.load.image('fondoNebula', 'assets/images/nebulosas.jpg');
        game.load.image('planeta1','assets/images/planeta1.png');
    }


    function create() {
        fondo = game.add.sprite(0, 0, 'fondoGalaxia');
        fondo.height=alto;
        fondo.width=ancho;
        startGame();
    }

    function update() {
        updateLines();
    }

    function render() {
        if(nebulosaVisitada!==-1) {
            printLines(galaxia.Nebulosas[nebulosaVisitada].lineas);
        }
        if(sisPlanetarioVisitada!==-1) {
            printLines(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada].lineas);
        }
    }

    function startGame(){
        game.input.mouse.capture=true;
    }

    function pintarFondo(){
        if(nebulosaVisitada===-1){
            fondo.loadTexture('fondoGalaxia',0);
            resetScript(galaxia.Nebulosas);
        }else if (sisPlanetarioVisitada===-1){
            fondo.loadTexture('fondoNebula',0);
            resetScript(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios);
        }else if (planetaVisitada===-1){
            fondo.loadTexture('sistemasolar1',0);
            resetScript(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada].planetas);
        }else{
            //LA VISTA CONCRETA DENTRO DE UN PLANETA

        }
        fondo.height=alto;
        fondo.width=ancho;
    }

    function newNebulosa() {
        var idNeb = galaxia.Nebulosas.length;
        var nebulaSprite = game.add.sprite(100, 100, 'image');
        nebulaSprite.width=30;
        nebulaSprite.height=30;
        nebulaSprite.inputEnabled=true;
        nebulaSprite.events.onInputUp.add(clickNebula,{idNeb:idNeb},this);
        nebulaSprite.input.enableDrag();
        var nebulosa = new Nebulosa(idNeb,"NOMBRE"+idNeb,false,false,nebulaSprite);
        galaxia.Nebulosas.push(nebulosa);
    }
    function newSisPlanetario() {
        if(nebulosaVisitada!==-1) {
            var idSisPlanetario = galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios.length;
            var sisPlanSprite = game.add.sprite(100, 100, 'sistemasolar1');
            sisPlanSprite.width = 30;
            sisPlanSprite.height = 30;
            sisPlanSprite.inputEnabled = true;
            sisPlanSprite.events.onInputDown.add(clickSisPlanetario, {id: idSisPlanetario}, this);
            sisPlanSprite.input.enableDrag();
            var sistemaPlanetario = new SistemasPlanetarios(idSisPlanetario,"HOLA",sisPlanSprite);
            galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios.push(sistemaPlanetario);
            addColumnMatrizAdy(galaxia.Nebulosas[nebulosaVisitada].matrizAdy);
        }else{
            console.log("No hay seleccionada ninguna nebulosa");
        }
    }
    function newPlanet() {
        var idPlaneta = galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada].planetas.length;
        var planetaSprite = game.add.sprite(100, 100, 'planeta1');
        planetaSprite.width=30;
        planetaSprite.height=30;
        planetaSprite.inputEnabled=true;
        planetaSprite.events.onInputDown.add(clickPlaneta,{id:idPlaneta},this);
        planetaSprite.input.enableDrag();
        var planeta = new Planetas(idPlaneta,"Planeta"+idPlaneta,1000,1000,1000,1000,"planeta",planetaSprite);
        galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada].planetas.push(planeta);
        addColumnMatrizAdy(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada].matrizAdy);
    }

    function clickNebula(sprite, pointer){
        if(!isDrag()){
            nebulosaVisitada=this.idNeb;
            resetScript(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios);
            killSprite(galaxia.Nebulosas);
            pintarFondo();
        }
    }
    function clickSisPlanetario(sprite, pointer) {
        ObjectsToCreateMatriz(pointer,"sisPlanetario",galaxia.Nebulosas[nebulosaVisitada],this.id);
    }

    function clickPlaneta(sprite, pointer) {
        ObjectsToCreateMatriz(pointer,"Planeta",galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada],this.id);
    }

    function ObjectsToCreateMatriz(pointer,tipo,Object,id){
        if(!isDrag()) {
            if (pointer.rightButton.isUp) {
                //Click IZQUIERDO
                tipo==="sisPlanetario"?gotoSistemaPlanetario(id):gotoPlanet(id);
            } else {
                //Click DERECHO
                posicionesLineas.push(pointer.position.x);
                posicionesLineas.push(pointer.position.y);
                elementoSeleccionado.push(id);
                if(posicionesLineas.length===4){
                    if(elementoSeleccionado[0]!==elementoSeleccionado[1]) {
                        var line = new Phaser.Line(posicionesLineas[0], posicionesLineas[1], posicionesLineas[2], posicionesLineas[3]);
                        Object.lineas.push(line);
                        printLines(Object.lineas);
                        idElementoSeleccionado1 = elementoSeleccionado[0];
                        idElementoSeleccionado2 = elementoSeleccionado[1];
                        if(tipo==="sisPlanetario") {
                            alertify.prompt("Por favor ingrese el costo.", "",
                                function (evt, value) {
                                    Object.matrizAdy[idElementoSeleccionado1][idElementoSeleccionado2] = parseInt(value);
                                    Object.matrizAdy[idElementoSeleccionado2][idElementoSeleccionado1] = parseInt(value);
                                });
                        }else{
                            Object.matrizAdy[idElementoSeleccionado1][idElementoSeleccionado2] = 1;
                            Object.matrizAdy[idElementoSeleccionado2][idElementoSeleccionado1] = 1;
                        }
                        Object.lineasXmatriz.push([line, idElementoSeleccionado1, idElementoSeleccionado2]);
                    }
                    elementoSeleccionado=[];
                    posicionesLineas=[];
                }
            }
        }
    }


    function gotoSistemaPlanetario(id) {
        setTimeout(function () {
            if(!isDrag()){
                sisPlanetarioVisitada=id;
                resetScript(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada].planetas);
                killSprite(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios);
                pintarFondo();
            }
        },200);
    }

    function gotoPlanet(id) {
        setTimeout(function () {
            if(!isDrag()){
                console.log("ABRIRA EL PLANETA");
            }
        },200);

    }

    function killSprite(Object) {
        Object.forEach(function(obj) {
            obj.sprite.kill();

        });
    }

    function resetScript(Object) {
        Object.forEach(function(obj) {
            obj.sprite.reset(obj.sprite.position.x,obj.sprite.position.y);
        });
    }

    function printLines(arrayLineas) {
        arrayLineas.forEach(function (line) {
            game.debug.geom(line);
        });
    }


    function updateLines(){
        if(sisPlanetarioVisitada!==-1){
            lineasObjectToDraw(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada],galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios[sisPlanetarioVisitada].planetas);
        }else if(nebulosaVisitada!==-1) {
            lineasObjectToDraw(galaxia.Nebulosas[nebulosaVisitada],galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios);
        }
    }

    function lineasObjectToDraw(Object,elemento) {
        Object.lineasXmatriz.forEach(function (element) {
            var sprite1= elemento[element[1]].sprite;
            var sprite2= elemento[element[2]].sprite;
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

});