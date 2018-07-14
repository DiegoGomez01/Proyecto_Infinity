var spritesActuales = [];
var flagMovimiento = false;
var caminoActual = [];

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
    alertify.dismissAll();
    $("#btnIniciar").toggleClass("fa-play-circle fa-pause-circle");
    if (game.paused = !game.paused) {
        alertify.message('Simulación Pausada', 0);
    }
}
// Motor de Movimiento
function empezarMovimiento() {
    if (caminoActual.length) {
        flagMovimiento = true;
        moverNave();
    }
}

function moverNave() {
    var etapa = caminoActual.shift();
    var cantRotacion = game.physics.arcade.angleBetween(nave.sprite, {
        x: etapa[0],
        y: etapa[1]
    });
    if (cantRotacion < 0) {
        cantRotacion += 2 * Math.PI;
    }
    var rotacion = game.add.tween(nave.sprite);
    var movimientoNave = game.add.tween(nave.sprite);
    rotacion.to({
        rotation: cantRotacion
    }, 500);
    movimientoNave.to({
        x: etapa[0],
        y: etapa[1]
    }, 2000);
    rotacion.onComplete.add(function () {
        rotacion.stop();
        if (etapa[2] > 0) {
            consumirCombustible(etapa[2] / 10, 0);
        }
        movimientoNave.start();
    });
    movimientoNave.onComplete.add(function () {
        movimientoNave.stop();
        if (caminoActual.length) {
            moverNave();
        } else {
            flagMovimiento = false;
            //Sacar Sonda
            nave.sondaSprite.reset(100, 300);
            var sacarSonda = game.add.tween(nave.sondaSprite);
            sacarSonda.to({
                width: 100
            }, 1000);
            sacarSonda.onComplete.add(function () {
                sacarSonda.stop();
            });
            sacarSonda.start();
        }
    });
    rotacion.start();
}

// salidaNave();
// entradaNave();
// teletransportar();
//Sacar Sonda
// var ocultarSonda = game.add.tween(nave.sondaSprite);
// ocultarSonda.to({
//     x: 190
// }, 1000);
// ocultarSonda.onComplete.add(function () {
//     ocultarSonda.stop();
//     nave.sondaSprite.kill();
// });
// ocultarSonda.start();

function consumirCombustible(cantCombustible, tiempo) {
    nave.combustible.set(nave.combustible.value - cantCombustible);
    if (tiempo < 1800) {
        setTimeout(() => {
            consumirCombustible(cantCombustible, tiempo + 200);
        }, 200);
    }
}

function salidaNave() {
    var salida = game.add.tween(nave.sprite.scale);
    salida.to({
        x: 1,
        y: 1,
    }, 500);
    salida.onComplete.add(function () {
        salida.stop();
        nave.sprite.scale.setTo(0.001, 0.001);
        if (planetaActual !== undefined) {
            nave.sprite.x = planetaActual.sprite.x;
            nave.sprite.y = planetaActual.sprite.y;
        } else {
            nave.sprite.x = sistemaSolarActual.sprite.x;
            nave.sprite.y = sistemaSolarActual.sprite.y;
        }
        salir();
        var salida2 = game.add.tween(nave.sprite);
        salida2.to({
            width: 100,
            height: 100,
        }, 500);
        salida2.onComplete.add(function () {
            salida2.stop();
        });
        salida2.start();
    });
    salida.start();
}

function entradaNave() {
    var entrada = game.add.tween(nave.sprite.scale);
    entrada.to({
        x: 0.001,
        y: 0.001,
    }, 2000);
    entrada.onComplete.add(function () {
        entrada.stop();
        // nave.sprite.width = 100;
        // nave.sprite.height = 100;
    });
    entrada.start();
}

function teletransportar() {
    var cantRotacion = game.physics.arcade.angleBetween(nave.sprite, {
        x: 0,
        y: 300
    });
    nave.sprite.x = 1410;
    nave.sprite.y = 300;
    nave.rotation = cantRotacion;
    killSpritesActuales();
    fondo.loadTexture('fondoHiperespacio');
    fondo.height = alto;
    fondo.width = ancho;
    fondo.animations.add('movimiento');
    fondo.animations.play('movimiento', 100, true);
    $("#infoUbic").text("En Algún lugar del Hiperespacio...");
    ocultarInterfazNave();
    var teletransporte = game.add.tween(nave.sprite);
    teletransporte.to({
        x: -110
    }, 1500);
    teletransporte.onComplete.add(function () {
        teletransporte.stop();
        alert("ya");
    });
    setTimeout(() => {
        teletransporte.start();
    }, 500);
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