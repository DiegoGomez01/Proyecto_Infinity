// Motor de Movimiento

var sonidoTaladro;
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
    }, nave.msRecorrido);
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
            if(nebulosaActual.esPeligrosa){
                $("#btnAtacar").css({ opacity: 1 });
            }
            preloadExtraerElementos();
        }
    });
    rotacion.start();
}

function preloadExtraerElementos(){
    sacarSonda();
    sonidoTaladro = game.add.audio('taladro');
    sonidoTaladro.addMarker('inicioTaladro', 0, 0);
    sonidoTaladro.play("inicioTaladro");
    modificarBarraExtraccion(1);
}

// function quicksort(primero,ultimo,cantElementos,nombreElementos){
//     i = primero;
//     j = ultimo;
//     pivote = cantElementos[parseInt((i+j)/2)];
//     do{
//         while(cantElementos[i]<pivote){
//             i++;
//         }
//         while(cantElementos[j]>pivote){
//             j--;
//         }
//         if(i<=j){
//             aux=cantElementos[j];
//             cantElementos[j] = cantElementos[i]
//             cantElementos[i] = aux;
//             i++;
//             j--;
//         } 
//     }while(i<j);
//     if(primero<j){
//         quicksort(primero,j);
//     }
//     if(ultimo>i){    
//         quicksort(i,ultimo);
//     }
// }

function extraerElementos(cantIridio,cantPaladio,cantPlatino,cantEZero){
    nombreElementos=[""];
    cantElementos=[];

    if(nave.cantSondas>1){
        nave.setCantSondas(nave.cantSondas-2);
        nave.setCantIridio(cantIridio);
        nave.setCantPlatino(cantPlatino);
        nave.setCantPaladio(cantPaladio);
        nave.setCantEZero(cantEZero);
    }else{
        nave.setCantSondas(0);
        array =[nave.cantIridio,nave.cantPaladio,nave.cantPlatino,nave.cantEZero];
        for(var i=0;i<2;i++){
            if(Math.min(nave.cantIridio,nave.cantPaladio,nave.cantPlatino,nave.cantEZero)==nave.cantIridio){
                nave.setCantIridio(cantIridio);
                if(i==0){array.splice(0,1);}
            }else if(Math.min(nave.cantIridio,nave.cantPaladio,nave.cantPlatino,nave.cantEZero)==nave.cantPaladio){
                nave.setCantPaladio(cantPaladio);
                if(i==0){array.splice(1,1);}
            }else if(Math.min(nave.cantIridio,nave.cantPaladio,nave.cantPlatino,nave.cantEZero)==nave.cantPlatino){
                nave.setCantPlatino(cantPlatino);
                if(i==0){array.splice(2,1);}
            }else if(Math.min(nave.cantIridio,nave.cantPaladio,nave.cantPlatino,nave.cantEZero)==nave.cantEZero){
                nave.setCantEZero(cantEZero);
                if(i==0){array.splice(3,1);}
            }
        }
    }
    botarSonda();     
}

function modificarBarraExtraccion(porcentaje){
    var $barraCantidad = $("#progressBarSonda");
    if (porcentaje < 101) {
        if(!enemigoAtacando){
            $barraCantidad.width(porcentaje + "%");
            $("#progressBarSonda").html("Extrayendo Elementos... " + porcentaje + "%");
            setTimeout(function(){modificarBarraExtraccion(porcentaje+1);},200);
        }else{
            interrumpirExtraccion();
        }
    }else{
        alertify.success("La extracción de los materiales se realizó correctamente.");
        extraerElementos(1000,1000,1000,1000);
        $barraCantidad.width("0%");
        $("#progressBarSonda").html("");
    }
}

function interrumpirExtraccion(){
    nave.sondaSprite.destroy();
    $("#progressBarSonda").width("0%");
    $("#progressBarSonda").html("");
    sonidoTaladro.mute=true;
}

// salidaNave();
// entradaNave();
// teletransportar();

function sacarSonda(){
    //nave.sprite.rotation=0;
    //nave.sondaSprite.destroy();
    // console.log(nave.sondaSprite);
    nave.sondaSprite.reset(100, 300);
    // console.log(nave.sondaSprite);
    var sacarSonda = game.add.tween(nave.sondaSprite);
    sacarSonda.to({
        width: 100
    }, 1000);
    sacarSonda.onComplete.add(function () {
        sacarSonda.stop();
    });
    sacarSonda.start();
}

function botarSonda(){
    var ocultarSonda = game.add.tween(nave.sondaSprite);
    ocultarSonda.to({
        x: 190
    }, 1000);
    ocultarSonda.onComplete.add(function () {
        ocultarSonda.stop();
        nave.sondaSprite.kill();
    });
    ocultarSonda.start();
}

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