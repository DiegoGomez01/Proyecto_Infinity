$(document).ready(function () {

    $(document).on('contextmenu', "canvas, .ajs-modal", function (e) {
        return false;
    });

    $("#btnEstado").on("click", function () {
        $(this).toggleClass("fa-chevron-circle-down fa-chevron-circle-up active");
        $("#containerEstado").toggleClass("active");
    });

    $("#btnIniciar").on("click", function () {
        if (nebulosaActual === -1) {
            console.log("no hay matriz de adyasencia.");
        } else if (sistemaSolarActual === -1) {
            nave = game.add.sprite(galaxia.Nebulosas[0].sprite.position.x, galaxia.Nebulosas[0].sprite.position.y, "nave");
            nave.width = 100;
            nave.height = 100;
            nave.inputEnabled = true;
            nave.input.enableDrag();
            var s2 = galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[2].sprite;
            var s1 = galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[1].sprite;
            game.physics.enable([nave, s2, s1], Phaser.Physics.ARCADE);
            nave.body.setSize(2, 2, nave.position.x, nave.position.y);
            s2.body.collideWorldBounds = true;
            s1.body.collideWorldBounds = true;
            nave.body.collideWorldBounds = true;
            var camino = new Dijkstra(galaxia.Nebulosas[nebulosaActual].matrizAdy, 0, galaxia.Nebulosas[nebulosaActual].matrizAdy.length);
            console.log(camino.caminosMinimos(1));
            game.physics.arcade.moveToObject(nave, s2, 100);
        } else if (planetaActual === -1) {

        }
    });
});

//Metodos Phaser

function startGame() {
    game.input.mouse.capture = true;
}

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
    if (nebulosaActual !== -1 && sistemaSolarActual === -1) {
        if (galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios.length >= 3) {
            if (game.physics.arcade.collide(nave, galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[1].sprite)) {
                //console.log("colision1");
                nave.body.velocity.setTo(0, 0);
                galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[1].sprite.body.velocity.setTo(0, 0);
                //game.physics.arcade.moveToObject(nave, galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[2].sprite, 100);
            }
            if (game.physics.arcade.collide(nave, galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[2].sprite)) {
                //console.log("colision2");
                nave.body.velocity.setTo(0, 0);
                galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[2].sprite.body.velocity.setTo(0, 0);
                game.physics.arcade.moveToObject(nave, galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[1].sprite, 100);
            }
        }
    }
}

function printLines(arrayLineas) {
    if (arrayLineas.length === 0) {
        var line = new Phaser.Line(0, 0, 0, 0);
        arrayLineas = [line];
    }
    arrayLineas.forEach(function (line) {
        game.debug.geom(line, "#ffffff55");
    });
}

function updateLines() {
    if (sistemaSolarActual !== -1) {
        lineasObjectToDraw(galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[sistemaSolarActual], galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[sistemaSolarActual].planetas);
    } else if (nebulosaActual !== -1) {
        lineasObjectToDraw(galaxia.Nebulosas[nebulosaActual], galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios);
    }
}

function lineasObjectToDraw(Object, elemento) {
    Object.lineasXmatriz.forEach(function (element) {
        var sprite1 = elemento[element[1]].sprite;
        var sprite2 = elemento[element[2]].sprite;
        element[0].fromSprite(sprite1, sprite2, true);
    });
}

// indicadorCombustible.set(0);
// $("#combustibleNivelNave").attr("data-content", value + "L");
// $('#theprogressbar').attr('aria-valuenow', newprogress).css('width',newprogress);