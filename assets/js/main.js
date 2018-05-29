$(document).ready(function () {

<<<<<<< HEAD
=======
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

>>>>>>> 76583c8a332b7484f1a953d92c275484d39efe9a
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
        updateLineGalaxia(galaxia.lineas,galaxia.Nebulosas);
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
        imagePrueba.events.onInputUp.add(clickSprite,{param:"HolaMundo"},this);
        imagePrueba.input.enableDrag();
        galaxia.Nebulosas.push(nebulosa);
        addColumnMatrizAdy(galaxia.matrizAdy);
    }


    function clickSprite(sprite, pointer) {
        if(activarCosto){
            posicionesLineas.push(pointer.position.x);
            posicionesLineas.push(pointer.position.y);
            if(posicionesLineas.length===4){
                var line = new Phaser.Line(posicionesLineas[0], posicionesLineas[1], posicionesLineas[2], posicionesLineas[3]);
                galaxia.lineas.push(line);
                printLines(galaxia.lineas);
                posicionesLineas=[];

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
    function updateLineGalaxia(arrayLineas,arrayNebulosas){

    }

});