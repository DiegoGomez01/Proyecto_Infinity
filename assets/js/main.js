var spritesActuales = [];

$(document).ready(function () {

    $(document).on('contextmenu', "canvas, .ajs-modal", function (e) {
        return false;
    });

    $("#btnEstado").on("click", function () {
        $(this).toggleClass("fa-chevron-circle-down fa-chevron-circle-up active");
        $("#containerEstado").toggleClass("active");
    });

    $("#btnIniciar").on("click", function () {
        $("#btnIniciar").toggleClass("fa-play-circle fa-pause-circle");
        game.state.start('simulacion', false);
        nebulosaActual = undefined;
        sistemaSolarActual = undefined;
        planetaActual = undefined;
        actualizarVista();
        // if (nebulosaActual === undefined) {
        //     console.log("no hay matriz de adyasencia.");
        // } else if (sistemaSolarActual === undefined) {
        //     nave = game.add.sprite(galaxia.nebulosas[0].sprite.position.x, galaxia.nebulosas[0].sprite.position.y, "nave");
        //     nave.width = 100;
        //     nave.height = 100;
        //     nave.inputEnabled = true;
        //     nave.input.enableDrag();
        //     var s2 = galaxia.nebulosas[nebulosaActual].sistemasPlanetarios[2].sprite;
        //     var s1 = galaxia.nebulosas[nebulosaActual].sistemasPlanetarios[1].sprite;
        //     game.physics.enable([nave, s2, s1], Phaser.Physics.ARCADE);
        //     nave.body.setSize(2, 2, nave.position.x, nave.position.y);
        //     s2.body.collideWorldBounds = true;
        //     s1.body.collideWorldBounds = true;
        //     nave.body.collideWorldBounds = true;
        //     var camino = new Dijkstra(galaxia.nebulosas[nebulosaActual].matrizAdyacencia, 0, galaxia.nebulosas[nebulosaActual].matrizAdyacencia.length);
        //     console.log(camino.caminosMinimos(1));
        //     game.physics.arcade.moveToObject(nave, s2, 100);
        // } else if (planetaActual === undefined) {

        // }
    });
});

//Metodos Phaser

function isDrag() {
    var distanceFromLastUp = Phaser.Math.distance(game.input.activePointer.positionDown.x, game.input.activePointer.positionDown.y, game.input.activePointer.x, game.input.activePointer.y);
    if (distanceFromLastUp !== 0) {
        return true;
    } else {
        return false;
    }
}

//Metodos de update de Phaser
function checkCollision() {
    // if (nebulosaActual !== undefined && sistemaSolarActual === undefined) {
    //     if (galaxia.nebulosas[nebulosaActual].sistemasPlanetarios.length >= 3) {
    //         if (game.physics.arcade.collide(nave, galaxia.nebulosas[nebulosaActual].sistemasPlanetarios[1].sprite)) {
    //             //console.log("colision1");
    //             nave.body.velocity.setTo(0, 0);
    //             galaxia.nebulosas[nebulosaActual].sistemasPlanetarios[1].sprite.body.velocity.setTo(0, 0);
    //             //game.physics.arcade.moveToObject(nave, galaxia.nebulosas[nebulosaActual].sistemasPlanetarios[2].sprite, 100);
    //         }
    //         if (game.physics.arcade.collide(nave, galaxia.nebulosas[nebulosaActual].sistemasPlanetarios[2].sprite)) {
    //             //console.log("colision2");
    //             nave.body.velocity.setTo(0, 0);
    //             galaxia.nebulosas[nebulosaActual].sistemasPlanetarios[2].sprite.body.velocity.setTo(0, 0);
    //             game.physics.arcade.moveToObject(nave, galaxia.nebulosas[nebulosaActual].sistemasPlanetarios[1].sprite, 100);
    //         }
    //     }
    // }
}

function printLines(arrayLineas) {
    if (arrayLineas.length === 0) {
        game.debug.geom();
    }
    arrayLineas.forEach(function (line) {
        printLine(line[0]);
    });
}

function printLine(line) {
    game.debug.geom(line, "#ffffff55");
}

function updateLines() {
    if (planetaActual === undefined && sistemaSolarActual !== undefined) {
        lineasObjectToDraw(sistemaSolarActual.lineas);
    } else if (nebulosaActual !== undefined) {
        lineasObjectToDraw(nebulosaActual.lineas);
    }
}

function lineasObjectToDraw(Lineas) {
    Lineas.forEach(function (linea) {
        linea[0].fromSprite(linea[1].sprite, linea[2].sprite, true);
    });
}

// indicadorCombustible.set(0);
// $("#combustibleNivelNave").attr("data-content", value + "L");
// $('#theprogressbar').attr('aria-valuenow', newprogress).css('width',newprogress);