$(document).ready(function () {
    $("#cargarJson").on("click", function () {
        $.getJSON("assets/Mapas/mapa1.json", function(json) {
            galaxia.planetaOrigen=json.planetaOrigen;
            cargarNebulosas(json.nebulosas);
        });
        console.log(galaxia);
    });
});

function cargarNebulosas(nebulosas){
    nebulosas.forEach(function(neb){
        var idNeb = galaxia.nebulosas.length;
        peligrosa = neb.peligrosa;
        var nebulaSprite = game.add.sprite(neb.sprite.posx, neb.sprite.posy, neb.sprite.selected);
        nebulaSprite.width = 180;
        nebulaSprite.height = 180;
        nebulaSprite.inputEnabled = true;
        nebulaSprite.events.onInputUp.add(clickNebula, {
            idNeb: idNeb
        }, this);
        nebulaSprite.input.enableDrag();
        spritesActuales.push(nebulaSprite);
        var nombre = neb.nombre
        if ((nombre.trim()).length === 0) {
            if (peligrosa) {
                nombre = "Nebulosa Peligrosa " + (idNeb + 1);
            } else {
                nombre = "Nebulosa " + (idNeb + 1);
            }
        }
        var nebulosa = new Nebulosa(idNeb, nombre, peligrosa, nebulaSprite);
        galaxia.nebulosas.push(nebulosa);
        cargarSistemasPlanetarios(nebulosa,neb.sistemasPlanetarios);
        cargarLineasJson(nebulosa,neb.lineas,neb.matrizAdy,"Nebulosa");
    });
    actualizarVista();
}

function cargarSistemasPlanetarios(nebulosaActual,sistemasPlanetarios){
    sistemasPlanetarios.forEach(function(sisPlan){
        var idSisPlanetario = nebulosaActual.sistemasPlanetarios.length;
        var sisPlanSprite = game.add.sprite(sisPlan.sprite.posx, sisPlan.sprite.posy, sisPlan.sprite.selected);
        sisPlanSprite.width = 100;
        sisPlanSprite.height = 100;
        sisPlanSprite.inputEnabled = true;
        sisPlanSprite.events.onInputDown.add(clickSisPlanetario, {
            id: idSisPlanetario
        }, this);
        sisPlanSprite.input.enableDrag();
        spritesActuales.push(sisPlanSprite);
        var nombre = sisPlan.nombre;
        if ((nombre.trim()).length === 0) {
            nombre = "Sistema Solar " + (idSisPlanetario + 1)
        }
        var sistemaPlanetario = new SistemasPlanetarios(idSisPlanetario, nombre, sisPlanSprite);
        nebulosaActual.sistemasPlanetarios.push(sistemaPlanetario);
        addColumnMatrizAdyacencia(nebulosaActual.matrizAdyacencia);
        cargarPlanetas(sistemaPlanetario,sisPlan.planetas);
        cargarLineasJson(sistemaPlanetario,sisPlan.lineas,sisPlan.matrizAdy,"SisPlanetarios");
        actualizarVista();
    });
}

function cargarPlanetas(sistemaSolarActual,PlanetasJson){
    PlanetasJson.forEach(function(planeta){
        var idPlaneta = sistemaSolarActual.planetas.length;
        var tipoPlaneta = planeta.tipo;
        var Sprite = game.add.sprite(planeta.sprite.posx, planeta.sprite.posy, planeta.sprite.selected);
        Sprite.width = 100;
        Sprite.height = 100;
        Sprite.events.onInputDown.add(clickPlaneta, {
            id: idPlaneta,
            tipo: tipoPlaneta
        }, this);
        Sprite.inputEnabled = true;
        Sprite.input.enableDrag();
        var elemento0 = 0;
        var iridio = 0;
        var platino = 0;
        var paladio = 0;
        if (tipoPlaneta === "planeta") {
            elemento0 = planeta.elementoZero;
            iridio = planeta.iridio;
            platino = planeta.platino;
            paladio = planeta.paladio;
        }
        if (tipoPlaneta === "teletrasportador" || tipoPlaneta === "planeta") {
            var giro = Sprite.animations.add('giro');
            Sprite.animations.play('giro', 5, true);
        }
        var nombre = planeta.nombre;
        if ((nombre.trim()).length === 0) {
            nombre = "Planeta " + (idPlaneta + 1)
        }
        spritesActuales.push(Sprite);
        var planeta = new Planetas(idPlaneta, nombre, iridio, platino, paladio, elemento0, tipoPlaneta, Sprite);
        sistemaSolarActual.planetas.push(planeta);
        addColumnMatrizAdyacencia(sistemaSolarActual.matrizAdyacencia);
    });
    actualizarVista();
}

function cargarLineasJson(padreSeleccionado,Lineas,MatrizAdy,ubicacion){
    Lineas.forEach(function(lineaJson){
        if(ubicacion!=="Nebulosa"){
            var s1x=padreSeleccionado.planetas[lineaJson[0]].sprite.position.x;
            var s1y=padreSeleccionado.planetas[lineaJson[0]].sprite.position.y;
            var s2x=padreSeleccionado.planetas[lineaJson[1]].sprite.position.x;
            var s2y=padreSeleccionado.planetas[lineaJson[1]].sprite.position.y;
            var s1 = padreSeleccionado.planetas[lineaJson[0]];
            var s2 = padreSeleccionado.planetas[lineaJson[1]];
        }else{
            var s1x=padreSeleccionado.sistemasPlanetarios[lineaJson[0]].sprite.position.x;
            var s1y=padreSeleccionado.sistemasPlanetarios[lineaJson[0]].sprite.position.y;
            var s2x=padreSeleccionado.sistemasPlanetarios[lineaJson[1]].sprite.position.x;
            var s2y=padreSeleccionado.sistemasPlanetarios[lineaJson[1]].sprite.position.y;
            var s1 = padreSeleccionado.sistemasPlanetarios[lineaJson[0]];
            var s2 = padreSeleccionado.sistemasPlanetarios[lineaJson[1]];
        }
        var line = new Phaser.Line(s1x,s1y,s2x,s2y);
        padreSeleccionado.lineas.push([line, s1, s2]);
        printLine(line);
        deseleccionar();
        padreSeleccionado.matrizAdyacencia=MatrizAdy;
    });
}