//Este modulo maneja la ubicación actual de la simulación
var nebulosaActual = undefined;
var sistemaSolarActual = undefined;
var planetaActual = undefined;

function actualizarVista() {
    killSpritesActuales();
    if (planetaActual !== undefined) {
        document.getElementById("infoUbic").innerHTML = galaxia.nombre + " / " + nebulosaActual.nombre + " / " + sistemaSolarActual.nombre + " / " + planetaActual.nombre;
        var numeroPlaneta = returnIdBackground(planetaActual);
        fondo.loadTexture('fondoPlaneta' + numeroPlaneta, 0);
    } else if (sistemaSolarActual !== undefined) {
        resetSprites(sistemaSolarActual.planetas);
        var numeroSisP = returnIdBackground(sistemaSolarActual);
        fondo.loadTexture('fondoSistemaSolar' + numeroSisP, 0);
        document.getElementById("infoUbic").innerHTML = galaxia.nombre + " / " + nebulosaActual.nombre + " / " + sistemaSolarActual.nombre;
    } else if (nebulosaActual !== undefined) {
        resetSprites(nebulosaActual.sistemasPlanetarios);
        document.getElementById("infoUbic").innerHTML = galaxia.nombre + " / " + nebulosaActual.nombre;
        var numeroNebulosa = returnIdBackground(nebulosaActual);
        fondo.loadTexture('fondoNebulosa' + numeroNebulosa, 0);
    } else {
        resetSprites(galaxia.nebulosas);
        document.getElementById("infoUbic").innerHTML = galaxia.nombre;
        fondo.loadTexture('fondoGalaxia', 0);
    }
    fondo.height = alto;
    fondo.width = ancho;
}

function irAtras() {
    if (nebulosaActual !== undefined) {
        if (planetaActual !== undefined) {
            cargarVistaEdicion("S");
            planetaActual = undefined;
        } else if (sistemaSolarActual !== undefined) {
            cargarVistaEdicion("N");
            sistemaSolarActual = undefined;
        } else {
            cargarVistaEdicion("G");
            nebulosaActual = undefined;
        }
        actualizarVista();
        deseleccionar();
    } else {
        $("#portadaContainer").fadeIn("slow");
    }
}

function clickNebula(sprite, pointer) {
    if (!isDrag()) {
        deseleccionar();
        cargarVistaEdicion("N");
        nebulosaActual = galaxia.nebulosas[this.idNeb];
        actualizarVista();
    }
}

function clickSisPlanetario(sprite, pointer) {
    if (!isDrag()) {
        if (pointer.rightButton.isUp) { //Click IZQUIERDO
            var idaux = this.id;
            setTimeout(function () {
                if (!isDrag()) {
                    deseleccionar();
                    cargarVistaEdicion("S");
                    sistemaSolarActual = nebulosaActual.sistemasPlanetarios[idaux];
                    actualizarVista();
                }
            }, 200);
        } else {
            createLine([pointer.position.x, pointer.position.y, this.id]); //Click DERECHO
        }
    }
}

function clickPlaneta(sprite, pointer) {
    if (!isDrag()) {
        if (pointer.rightButton.isUp) { //Click IZQUIERDO
            var idaux = this.id;
            var tipoaux = this.tipo;
            setTimeout(function () {
                if (!isDrag() && tipoaux === "planeta") {
                    deseleccionar();
                    planetaActual = sistemaSolarActual.planetas[idaux];
                    cargarVistaEdicion("P");
                    actualizarVista();
                }
            }, 200);
        } else {
            createLine([pointer.position.x, pointer.position.y, this.id]); //Click DERECHO
        }
    }
}

function cargarVistaEdicion(nivel) {
    switch (nivel) {
        case "P":
            $("#btnCrear").addClass("d-none");
            $("#btnEditar").attr("data-content", "Editar este planeta");
            $("#btnEliminar").attr("data-content", "Eliminar este planeta");
            break;
        case "S":
            cargarFormularioPlaneta();
            $("#btnCrear").attr("data-content", "Crear Nuevo Planeta");
            $("#btnEditar").attr("data-content", "Editar este sistema solar");
            $("#btnEliminar").attr("data-content", "Eliminar este sistema solar");
            $("#btnCrear").removeClass("d-none");
            break;
        case "N":
            cargarFormularioSistemaSolar();
            $("#btnCrear").attr("data-content", "Crear Nuevo Sistema Solar");
            $("#btnEditar").attr("data-content", "Editar esta nebulosa");
            $("#btnEliminar").attr("data-content", "Eliminar esta nebulosa");
            $("#btnEliminar").removeClass("d-none");
            break;
        case "G":
            cargarFormularioNebulosa();
            $("#btnCrear").attr("data-content", "Crear Nueva Nebulosa");
            $("#btnEditar").attr("data-content", "Editar la galaxia");
            $("#btnEliminar").addClass("d-none");
            break;
    }
}

function returnIdBackground(objecto) {
    var objectKey = "";
    var numero = -1;
    objectKey = objecto.sprite.key;
    numero = objectKey.substr(objectKey.length - 1, objectKey.length - 1);
    if (numero === "a") { //ultima letra de peligrosa => a
        numero = objectKey.substr(objectKey.length - 10, objectKey.length - 10); //elimino la subsecuencia Peligrosa
    }
    return parseInt(numero);
}

function resetSprites(Object) {
    Object.forEach(function (obj) {
        obj.sprite.reset(obj.sprite.position.x, obj.sprite.position.y);
        spritesActuales.push(obj.sprite);
    });
}

function killSpritesActuales() {
    spritesActuales.forEach(function (sprite) {
        sprite.kill();
    });
    spritesActuales = [];
}

// printLines(galaxia.nebulosas[nebulosaActual].lineas);
// printLines(galaxia.nebulosas[nebulosaActual].sistemasPlanetarios[sistemaSolarActual].lineas);
// printLines([]);