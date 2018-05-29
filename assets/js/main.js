$(document).ready(function () {

    $("#btnConfig").on("click", function () {
        $('#sideBarConfig').addClass('active');
        $('#overlay').fadeIn();
    });
    $("#prueba").on("click", function () {
        newNebulosa();
    });

    $("#costo").on("click", function () {
        !activarCosto?activarCosto=true:activarCosto=false;
        console.log(activarCosto);
    });

    var activarCosto=false;
    var posicionesLineas=[];
    var elementoSeleccionado=[];

    var ancho = $(window).width();
    var alto = $(window).height();

    var galaxia = new Galaxia("Galaxia");

    var game = new Phaser.Game(ancho,alto,Phaser.AUTO,'gameContainer',{preload:preload,create:create,update:update,render:render});

    function preload() {
        game.load.image('image', 'assets/images/favicon.png');

    }


    function create() {
        startGame();
    }

    function update() {
        updateLineGalaxia();
        //line1.fromSprite(handle1, handle2, false);
    }

    function render() {
        renderLines(galaxia.lineas);
    }

    function startGame(){
        game.input.mouse.capture=true;
    }

    function newNebulosa() {
        var idNeb = galaxia.Nebulosas.length;
        var nebulosa = new Nebulosa(idNeb,"NOMBRE"+idNeb,100,100,false,false);
        var imagePrueba = game.add.sprite(100, 100, 'image');
        imagePrueba.width=30;
        imagePrueba.height=30;
        imagePrueba.inputEnabled=true;
        imagePrueba.events.onInputUp.add(clickSprite,{idNeb:idNeb},this);
        imagePrueba.input.enableDrag();
        galaxia.Nebulosas.push(nebulosa);
        addColumnMatrizAdy(galaxia.matrizAdy);
    }


    function clickSprite(sprite, pointer) {
        if(activarCosto){
            posicionesLineas.push(pointer.position.x);
            posicionesLineas.push(pointer.position.y);
            elementoSeleccionado.push(this.idNeb);
            if(posicionesLineas.length===4){
                var line = new Phaser.Line(posicionesLineas[0], posicionesLineas[1], posicionesLineas[2], posicionesLineas[3]);
                galaxia.lineas.push(line);
                printLines(galaxia.lineas);
                idElementoSeleccionado1=elementoSeleccionado[0];
                idElementoSeleccionado2=elementoSeleccionado[1];
                alertify.prompt("Por favor ingrese el costo.", "",
                    function(evt, value ){
                        galaxia.matrizAdy[idElementoSeleccionado1][idElementoSeleccionado2]=parseInt(value);
                        galaxia.matrizAdy[idElementoSeleccionado2][idElementoSeleccionado1]=parseInt(value);
                    });
                //updateLineGalaxia(line,galaxia.Nebulosas[idElementoSeleccionado1],galaxia.Nebulosas[idElementoSeleccionado2]);
                elementoSeleccionado=[];
                posicionesLineas=[];
                console.log(galaxia.matrizAdy);
            }
        }else{
            console.log(galaxia.Nebulosas);
        }

    }

    function printLines(arrayLineas) {
        arrayLineas.forEach(function(line) {
            game.debug.geom(line);
        });
    }

    function renderLines(arrayLineas){
        arrayLineas.forEach(function(line) {
            game.debug.geom(line);
        });
    }

    function updateLineGalaxia(linea,elemento1,elemento2){
        //linea.fromSprite(elemento1, elemento2, false);
    }

    function addColumnMatrizAdy(matriz) {
        matriz.push(new Array(matriz.length).fill(0));
        for (var i = 0; i < matriz.length; i++) {
            matriz[i].push(0);
        }
    }

});