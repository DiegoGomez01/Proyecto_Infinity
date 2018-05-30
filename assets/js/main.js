$(document).ready(function () {

    $("#btnConfig").on("click", function () {
        $('#sideBarConfig').addClass('active');
        $('#overlay').fadeIn();
    });
    $("#prueba").on("click", function () {
        newNebulosa();
    });

    $("#sisPlanetario").on("click", function () {
        newSisPlanetario();
    });

    $("#costo").on("click", function () {
        !activarCosto?activarCosto=true:activarCosto=false;
    });
    $("#atras").on("click", function () {
        console.log(nebulosaVisitada);
        console.log(sisPlanetarioVisitada);
        console.log(planetaVisitada);
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

    var activarCosto=false;
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
    }


    function create() {
        fondo = game.add.sprite(0, 0, 'fondoGalaxia');
        fondo.height=alto;
        fondo.width=ancho;
        startGame();
    }

    function update() {
        updateLineGalaxia();
    }

    function render() {
        printLines(galaxia.lineas);
    }

    function startGame(){
        game.input.mouse.capture=true;
    }

    function pintarFondo(){
        //var fondo;
        if(nebulosaVisitada===-1){
            fondo.loadTexture('fondoGalaxia',0);
            //setTimeout(function(){ fondo.loadTexture('fondoNebula',0)}, 1000);
            resetScript(galaxia.Nebulosas);
        }else if (sisPlanetarioVisitada===-1){
            fondo.loadTexture('fondoNebula',0);
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
        //addColumnMatrizAdy(galaxia.matrizAdy);
    }

    function clickNebula(sprite, pointer){
        if(!isDrag()){
            nebulosaVisitada=this.idNeb;
            //galaxia.Nebulosas[0].sprite.kill();
            //console.log(galaxia.Nebulosas);
            //setTimeout(function(){ galaxia.Nebulosas[0].sprite.reset(100,100); }, 1000);
            resetScript(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios);
            killSprite(galaxia.Nebulosas);
            pintarFondo();
        }
    }

    function newSisPlanetario() {
        if(nebulosaVisitada!==-1) {
            var idSisPlanetario = galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios.length;
            var sisPlanSprite = game.add.sprite(100, 100, 'sistemasolar1');
            sisPlanSprite.width = 30;
            sisPlanSprite.height = 30;
            sisPlanSprite.inputEnabled = true;
            sisPlanSprite.events.onInputUp.add(clickSisPlanetario, {idSisPlan: idSisPlanetario}, this);
            sisPlanSprite.input.enableDrag();
            var sistemaPlanetario = new SistemasPlanetarios(idSisPlanetario,"HOLA",sisPlanSprite);
            addColumnMatrizAdy(sistemaPlanetario.matrizAdy);
            galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios.push(sistemaPlanetario);
            //addColumnMatrizAdy(galaxia.Nebulosas[nebulosaVisitada].sistemasPlanetarios.matrizAdy);
        }else{
            console.log("No hay seleccionada ninguna nebulosa");
        }
    }

    function clickSisPlanetario(sprite, pointer) {

    }

    function clickSprite(sprite, pointer) {
        if(activarCosto){
            posicionesLineas.push(pointer.position.x);
            posicionesLineas.push(pointer.position.y);
            elementoSeleccionado.push(this.idNeb);
            if(posicionesLineas.length===4){
                if(elementoSeleccionado[0]!==elementoSeleccionado[1]) {
                    var line = new Phaser.Line(0, 0, 0, 0);
                    //var line = new Phaser.Line(posicionesLineas[0], posicionesLineas[1], posicionesLineas[2], posicionesLineas[3]);
                    galaxia.lineas.push(line);
                    printLines(galaxia.lineas);
                    idElementoSeleccionado1 = elementoSeleccionado[0];
                    idElementoSeleccionado2 = elementoSeleccionado[1];
                    alertify.prompt("Por favor ingrese el costo.", "",
                        function (evt, value) {
                            galaxia.matrizAdy[idElementoSeleccionado1][idElementoSeleccionado2] = parseInt(value);
                            galaxia.matrizAdy[idElementoSeleccionado2][idElementoSeleccionado1] = parseInt(value);
                        });
                    galaxia.lineasXmatriz.push([line, idElementoSeleccionado1, idElementoSeleccionado2]);
                }
                elementoSeleccionado=[];
                posicionesLineas=[];
            }
        }else{
            nebulosaVisitada=this.idNeb;
        }

    }

    function killSprite(Object) {
        Object.forEach(function(obj) {
            obj.sprite.kill();
            console.log(obj);
        });
    }

    function resetScript(Object) {
        Object.forEach(function(obj) {
            obj.sprite.reset(obj.sprite.position.x,obj.sprite.position.y);
        });
    }

    function printLines(arrayLineas) {
        arrayLineas.forEach(function(line) {
            game.debug.geom(line);
        });
    }

    function updateLineGalaxia(){
        galaxia.lineasXmatriz.forEach(function(element) {
            element[0].fromSprite(galaxia.Nebulosas[element[1]].sprite,galaxia.Nebulosas[element[2]].sprite,true);
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