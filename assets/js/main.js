var spritesActuales = [];
var hayMovimiento = false;

function iniciarSimulacion() {
    if (galaxia.planetaOrigen.length === 3) {
        nebulosaActual = galaxia.nebulosas[galaxia.planetaOrigen[0]];
        sistemaSolarActual = nebulosaActual.sistemasPlanetarios[galaxia.planetaOrigen[1]];
        planetaActual = sistemaSolarActual.planetas[galaxia.planetaOrigen[2]];
        ocultarEdicion();
        actualizarVista();
        game.state.start('simulacion', false);
        $("#btnIniciar").toggleClass("fa-play-circle fa-pause-circle");
        $("#btnIniciar").attr("onclick", "pausarSimulacion()");
        $("title").text("Simulación - Proyecto Infinity");
        DisableAllInputEnable();
        cargarFormularioNave();
    } else {
        alertify.error('Para iniciar la simulación es necesario tener un planeta de inicio');
    }
}



function DisableAllInputEnable() {
    for (var iN in galaxia.nebulosas) {
        galaxia.nebulosas[iN].sprite.inputEnabled = false;
        for (var iS in galaxia.nebulosas[iN].sistemasPlanetarios) {
            galaxia.nebulosas[iN].sistemasPlanetarios[iS].sprite.inputEnabled = false;
            for (var iP in galaxia.nebulosas[iN].sistemasPlanetarios[iS].planetas) {
                galaxia.nebulosas[iN].sistemasPlanetarios[iS].planetas[iP].sprite.inputEnabled = false;
            }
        }
    }
}

function pausarSimulacion() {
    alert("posición: X=" + nave.sprite.x + ", Y=" + nave.sprite.y);
    alertify.dismissAll();
    $("#btnIniciar").toggleClass("fa-play-circle fa-pause-circle");
    if (game.paused = !game.paused) {
        alertify.message('Simulación Pausada', 0);
    }
}
// Motor de Movimiento
function moverNaveHacia(x, y) {
    var rotacion = game.add.tween(nave.sprite);
    var movimientoNave = game.add.tween(nave.sprite);
    var cantRotacion = game.physics.arcade.angleBetween(nave.sprite, {
        x: x,
        y: y
    });
    rotacion.to({
        rotation: cantRotacion
    }, 500);
    movimientoNave.to({
        x: x,
        y: y
    }, 2000);
    rotacion.onComplete.add(function () {
        rotacion.stop();
        hayMovimiento = true;
        movimientoNave.start();
    });
    movimientoNave.onComplete.add(function () {
        movimientoNave.stop();
        hayMovimiento = false;
    });
    rotacion.start();
}

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

// var numN = galaxia.nebulosas.length;
// var numS = 0;
// var numP = 0;
// for (let index = 0; index < galaxia.nebulosas.length; index++) {
//     const element = galaxia.nebulosas[index];
//     numS += element.sistemasPlanetarios.length;
//     for (let index2 = 0; index2 < element.sistemasPlanetarios.length; index2++) {
//         const element2 = element.sistemasPlanetarios[index2];
//         for (let index3 = 0; index3 < element2.planetas.length; index3++) {
//             const element3 = element2.planetas[index3];
//             if (element3.tipo == "planeta") {
//                 numP += 1;
//             }
//         }
//     }
// }
// alert("nebulosas=" + numN + ", sis=" + numS + ", pl=" + numP);