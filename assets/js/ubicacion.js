//Este modulo maneja la ubicación actual de la simulación
var nebulosaActual = -1;
var sistemaSolarActual = -1;
var planetaActual = -1;


$(document).ready(function () {
    $("#btnAtras").on("click", function () {
        if (nebulosaActual !== -1) {
            deseleccionar();
            if (planetaActual !== -1) {
                cargarFormularioPlaneta();
                actualizarUbicacionVista("sisPlanetario");
                killSprite(galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[sistemaSolarActual].planetas);
                planetaActual = -1;
            } else if (sistemaSolarActual !== -1) {
                cargarFormularioSistemaSolar();
                killSprite(galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[sistemaSolarActual].planetas);
                sistemaSolarActual = -1;
                actualizarUbicacionVista("nebulosa");
            } else {
                cargarFormularioNebulosa();
                killSprite(galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios);
                nebulosaActual = -1;
                actualizarUbicacionVista("galaxia");
            }
            pintarFondo();
        } else {
            alertify.error('Imposible salir de la vía láctea');
        }
    });
});

function pintarFondo() {
    if (nebulosaActual === -1) {
        fondo.loadTexture('fondoGalaxia', 0);
        resetScript(galaxia.Nebulosas);
    } else if (sistemaSolarActual === -1) {
        var numeroNebulosa = returnIdBackground("sisPlanetarios");
        fondo.loadTexture('fondoNebulosa' + numeroNebulosa, 0);
        resetScript(galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios);
    } else if (planetaActual === -1) {
        var numeroSisP = returnIdBackground("planetas");
        fondo.loadTexture('fondoSistemaSolar' + numeroSisP, 0);
        resetScript(galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[sistemaSolarActual].planetas);
    } else {
        var numeroPlaneta = returnIdBackground("dentroDePlaneta");
        fondo.loadTexture('fondoPlaneta' + numeroPlaneta, 0);
    }
    fondo.height = alto;
    fondo.width = ancho;
}

function resetScript(Object) {
    Object.forEach(function (obj) {
        obj.sprite.reset(obj.sprite.position.x, obj.sprite.position.y);
    });
}

function returnIdBackground(Ubicacion) {
    var object = "";
    var numero = -1;
    if (Ubicacion === "sisPlanetarios") {
        object = galaxia.Nebulosas[nebulosaActual].sprite.key;
        numero = object.substr(object.length - 1, object.length - 1);
        if (numero === "a") { //ultima letra de peligrosa => a
            numero = object.substr(object.length - 10, object.length - 10); //elimino la subsecuencia Peligrosa
        }
    } else if (Ubicacion === "planetas") {
        object = galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[sistemaSolarActual].sprite.key;
        numero = object.substr(object.length - 1, object.length - 1);
    } else {
        object = galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[sistemaSolarActual].planetas[planetaActual].sprite.key;
        numero = object.substr(object.length - 1, object.length - 1);
    }
    return parseInt(numero);
}

function actualizarUbicacionVista(ubicacion) {
    var nebulosa = "";
    var sisPlanetario = "";
    var planeta = "";
    switch (ubicacion) {
        case "nebulosa":
            nebulosa = galaxia.Nebulosas[nebulosaActual].nombre;
            document.getElementById("infoUbic").innerHTML = galaxia.nombre + " / " + nebulosa;
            $("#btnCrear").attr("data-content", "Crear Nuevo Sistema Solar");
            $("#btnEliminar").attr("data-content", "Eliminar esta nebulosa");
            $("#btnEliminar").removeClass("d-none");
            break;
        case "sisPlanetario":
            nebulosa = galaxia.Nebulosas[nebulosaActual].nombre;
            sisPlanetario = galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[sistemaSolarActual].nombre;
            document.getElementById("infoUbic").innerHTML = galaxia.nombre + " / " + nebulosa + " / " + sisPlanetario;
            $("#btnCrear").attr("data-content", "Crear Nuevo Planeta");
            $("#btnEliminar").attr("data-content", "Eliminar este sistema solar");
            $("#btnCrear").removeClass("d-none");
            break;
        case "Planeta":
            nebulosa = galaxia.Nebulosas[nebulosaActual].nombre;
            sisPlanetario = galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[sistemaSolarActual].nombre;
            planeta = galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[sistemaSolarActual].planetas[planetaActual].nombre;
            document.getElementById("infoUbic").innerHTML = galaxia.nombre + " / " + nebulosa + " / " + sisPlanetario + " / " + planeta;
            $("#btnCrear").addClass("d-none");
            $("#btnEliminar").attr("data-content", "Eliminar este planeta");
            break;
        default:
            document.getElementById("infoUbic").innerHTML = galaxia.nombre;
            $("#btnCrear").attr("data-content", "Crear Nueva Nebulosa");
            $("#btnEliminar").addClass("d-none");
            break;
    }
}

function clickNebula(sprite, pointer) {
    if (!isDrag()) {
        deseleccionar();
        cargarFormularioSistemaSolar();
        nebulosaActual = this.idNeb;
        actualizarUbicacionVista("nebulosa");
        killSprite(galaxia.Nebulosas);
        pintarFondo();
    }
}

function clickSisPlanetario(sprite, pointer) {
    if (!isDrag()) {
        if (pointer.rightButton.isUp) {
            //Click IZQUIERDO
            gotoSistemaPlanetario(this.id);
        } else {
            //Click DERECHO
            createLine([pointer.position.x, pointer.position.y, this.id]);
        }
    }
}

function clickPlaneta(sprite, pointer) {
    if (!isDrag()) {
        if (pointer.rightButton.isUp) {
            gotoPlanet(this.id, this.tipo);
        } else {
            //Click DERECHO
            createLine([pointer.position.x, pointer.position.y, this.id]);
        }
    }
}

function gotoSistemaPlanetario(id) {
    setTimeout(function () {
        if (!isDrag()) {
            deseleccionar();
            cargarFormularioPlaneta();
            sistemaSolarActual = id;
            actualizarUbicacionVista("sisPlanetario");
            killSprite(galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios);
            pintarFondo();
        }
    }, 200);
}

function gotoPlanet(id, tipoPlaneta) {
    setTimeout(function () {
        if (!isDrag() && tipoPlaneta === "planeta") {
            deseleccionar();
            planetaActual = id;
            actualizarUbicacionVista("Planeta");
            killSprite(galaxia.Nebulosas[nebulosaActual].sistemasPlanetarios[sistemaSolarActual].planetas)
            pintarFondo();
        }
    }, 200);
}

function killSprite(Object) {
    Object.forEach(function (obj) {
        obj.sprite.kill();
    });
}