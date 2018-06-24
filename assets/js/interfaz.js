$(document).ready(function () {
    //Botones de interfaz
    $('#btnCrear, #btnEditar, #btnEliminar, #btnAtras,#cantIridioNave,#cantPlatinoNave,#cantPaladioNave,#cantEZeroNave').popover({
        trigger: 'hover'
    });

    $("#btnCrear").on("click", function () {
        if ($("#btnUbicar").hasClass("d-none")) {
            $("#btnGuardar").addClass("d-none");
            $("#btnUbicar").removeClass("d-none");
            if (!$("#containerEstilos").is(":visible")) {
                $("#containerEstilos").removeClass("d-none");
            }
            if (sistemaSolarActual !== undefined) {
                cargarFormularioPlaneta();
            } else if (nebulosaActual !== undefined) {
                cargarFormularioSistemaSolar();
            } else {
                cargarFormularioNebulosa();
            }
        }
        mostrarSideBarConfig();
    });

    $("#btnCerrarSideBar,#overlay").on("click", function () {
        $('#sideBarConfig, #btnCerrarSideBar').removeClass('active');
        $('#overlay').fadeOut();
    });

    $("#btnEditar").on("click", function () {
        cargarEdicion();
        mostrarSideBarConfig();
    });

    $("#btnGuardar").on("click", function () {
        guardarEdicion();
        // mostrarSideBarConfig();
    });

    function mostrarSideBarConfig() {
        $('#sideBarConfig, #btnCerrarSideBar').addClass('active');
        $('#overlay').fadeIn();
    }

    $("#infoSeleccion").on("click", function () {
        deseleccionar();
    });

    $("#btnInfoFooter").on("click", function () {
        $('#overlay').fadeIn();
        $('#footerGame,#closeFooter').addClass("active");
    });

    $("#closeFooter").on("click", function () {
        $('#overlay').fadeOut();
        $('#footerGame,#closeFooter').removeClass("active");
    });

    $("#btnEliminar").on("click", function () {
        eliminarElementoActual();
    });

    //Activacion de estilo
    $('.estiloNebulosa').on("click", function () {
        if (!$(this).hasClass("activo")) {
            $(".estiloNebulosa.activo").removeClass("activo");
            $(this).addClass("activo");
        }
    });
    $('.estiloSistemaSolar').on("click", function () {
        if (!$(this).hasClass("activo")) {
            $(".estiloSistemaSolar.activo").removeClass("activo");
            $(this).addClass("activo");
        }
    });
    $('.estiloPlaneta').on("click", function () {
        if (!$(this).hasClass("activo")) {
            $(".estiloPlaneta.activo").removeClass("activo");
            $(this).addClass("activo");
        }
        switch ($(this).attr("data-idImg")) {
            case "planeta1":
                $("#cantIridioRango").val(1000);
                $("#cantPlatinoRango").val(1000);
                $("#cantPaladioRango").val(1000);
                $("#cantEZeroRango").val(1000);
                break;
            case "planeta2":
                $("#cantIridioRango").val(5000);
                $("#cantPlatinoRango").val(3000);
                $("#cantPaladioRango").val(1500);
                $("#cantEZeroRango").val(100);
                break;
            case "planeta3":
                $("#cantIridioRango").val(1000);
                $("#cantPlatinoRango").val(3000);
                $("#cantPaladioRango").val(5000);
                $("#cantEZeroRango").val(7000);
                break;
            case "planeta4":
                $("#cantIridioRango").val(2000);
                $("#cantPlatinoRango").val(5000);
                $("#cantPaladioRango").val(3000);
                $("#cantEZeroRango").val(3000);
                break;
            case "planeta5":
                $("#cantIridioRango").val(6000);
                $("#cantPlatinoRango").val(7000);
                $("#cantPaladioRango").val(5000);
                $("#cantEZeroRango").val(1000);
                break;
        }
        $("#cantIridioRango,#cantPlatinoRango,#cantPaladioRango,#cantEZeroRango").trigger("input");
    });
    $('.estiloEEspacial').on("click", function () {
        if (!$(this).hasClass("activo")) {
            $(".estiloEEspacial.activo").removeClass("activo");
            $(this).addClass("activo");
        }
    });
    $('.estiloTTransportador').on("click", function () {
        if (!$(this).hasClass("activo")) {
            $(".estiloTTransportador.activo").removeClass("activo");
            $(this).addClass("activo");
        }
    });

    $("#selectTipoPlaneta").change(function () {
        switch ($(this).val()) {
            case "planeta":
                $('.estiloPlaneta').removeClass("d-none"); // mostrar estilos planetas 
                $("#materialesPlaneta").removeClass("d-none"); //mostrar materiales
                $('.estiloEEspacial').addClass("d-none"); // ocultar estilos estacion espacial 
                $('.estiloTTransportador').addClass("d-none"); // ocultar estilos teletransportador 
                break;
            case "ecombustible":
                $('.estiloEEspacial').removeClass("d-none"); // mostrar estilos estacion espacial  
                $('.estiloPlaneta').addClass("d-none"); // ocultar estilos planetas 
                $("#materialesPlaneta").addClass("d-none"); // ocultar materiales
                $('.estiloTTransportador').addClass("d-none"); // ocultar estilos teletransportador 
                break;
            case "teletrasportador":
                $('.estiloTTransportador').removeClass("d-none"); // mostrar estilos planetas 
                $('.estiloPlaneta').addClass("d-none"); // ocultar estilos planetas 
                $("#materialesPlaneta").addClass("d-none"); // ocultar materiales
                $('.estiloEEspacial').addClass("d-none"); // ocultar estilos estacion espacial 
                break;
        }
    });
    $("#cantIridioRango").on("input", function () {
        $("#cantIridio").text(this.value + "T");
    });
    $("#cantPlatinoRango").on("input", function () {
        $("#cantPlatino").text(this.value + "T");
    });
    $("#cantPaladioRango").on("input", function () {
        $("#cantPaladio").text(this.value + "T");
    });
    $("#cantEZeroRango").on("input", function () {
        $("#cantEZero").text(this.value + "T");
    });

    $("#btnAtras").on("click", function () {
        irAtras();
        deseleccionar();
    });

    $("#btnUbicar").on("click", function () {
        if (nebulosaActual === undefined) {
            newNebulosa();
        } else if (sistemaSolarActual === undefined) {
            newSisPlanetario();
        } else if (planetaActual === undefined) {
            newPlanet();
        }
        document.getElementById("inputNombre").value = "";
    });

});

function cargarFormularioNebulosa() {
    $('.estiloSistemaSolar').addClass("d-none"); // ocultar estilos sistema solar
    //Formulario Nebulosa
    $("#inputNombre").val("");
    $("#crearTituloInfo").text("Creación de Nebulosa"); // cambiar titulo
    $("#inputNombre").attr("placeholder", "Ingrese el nombre de la Nebulosa");
    $('#nebulosaEsPeligrosa').removeClass("d-none"); //mostrar check es peligrosa
    $('.estiloNebulosa').removeClass("d-none"); // mostrar estilos nebulosa
    $('#nebulosaEsPeligrosa').prop('checked', false);
    $(".estiloNebulosa").first().click();
}

function cargarFormularioSistemaSolar() {
    //De nebulosa a sistema solar
    $('#nebulosaEsPeligrosa').addClass("d-none"); //ocultar check es peligrosa
    $('.estiloNebulosa').addClass("d-none"); // ocultar estilos nebulosa
    //De planeta a sistema Solar
    $("#planetaEsOrigen").addClass("d-none"); // ocultar opción de planeta origen
    $("#tipoPlanetaSelect").addClass("d-none"); // ocultar selección de tipo
    $('.estiloPlaneta, .estiloTTransportador, .estiloEEspacial').addClass("d-none"); // ocultar estilos planetas
    $("#materialesPlaneta").addClass("d-none"); // ocultar materiales
    //Formulario Sistema Solar
    $("#inputNombre").val("");
    $("#crearTituloInfo").text("Creación de Sistema Solar"); // cambiar titulo
    $("#inputNombre").attr("placeholder", "Ingrese el nombre del Sistema Solar"); //cambiar Placeholder
    $('.estiloSistemaSolar').removeClass("d-none"); // mostrar estilos sistema solar
    $(".estiloSistemaSolar").first().click();
}

function cargarFormularioPlaneta() {
    //De Sistema solar a Planeta
    $('.estiloSistemaSolar').addClass("d-none"); // ocultar estilos sistema solar
    $("#inputNombre").attr("placeholder", "Ingrese el nombre del Planeta");
    //Formulario Planeta
    $("#inputNombre").val("");
    $("#crearTituloInfo").text("Creación de Planeta"); // cambiar titulo
    $("#planetaEsOrigen").removeClass("d-none"); // mostrar opción de planeta origen
    $('#checkPlanetaEsOrigen').prop('checked', false);
    $("#tipoPlanetaSelect").removeClass("d-none"); // mostrar selección de tipo
    $("#selectTipoPlaneta").val("planeta"); //seleccionar tipo planeta
    $('.estiloPlaneta').removeClass("d-none"); // mostrar estilos planetas
    $(".estiloPlaneta").first().click();
    $('.estiloEEspacial').addClass("d-none"); // mostrar estilos planetas
    $('.estiloTTransportador').addClass("d-none"); // mostrar estilos planetas
    $("#materialesPlaneta").removeClass("d-none"); //mostrar materiales
}

function cargarEdicion() {
    $("#btnGuardar").removeClass("d-none");
    $("#btnUbicar").addClass("d-none");
    if (planetaActual !== undefined) {
        cargarFormularioPlaneta();
        var esOrigen = galaxia.planetaOrigen.length > 0 && nebulosaActual.id === galaxia.planetaOrigen[0] && sistemaSolarActual.id === galaxia.planetaOrigen[1] && planetaActual.id === galaxia.planetaOrigen[2];
        $("#crearTituloInfo").text("Edición de Planeta");
        $("#inputNombre").val(planetaActual.nombre);
        $("#inputNombre").attr("placeholder", "Ingrese el nombre del Planeta");
        $('#checkPlanetaEsOrigen').prop('checked', esOrigen);
        $("#tipoPlanetaSelect").addClass("d-none");
        $('.estiloPlaneta[data-idImg="planeta' + returnIdBackground(planetaActual) + '"]').click();
        $("#cantIridioRango").val(planetaActual.iridio);
        $("#cantPlatinoRango").val(planetaActual.platino);
        $("#cantPaladioRango").val(planetaActual.paladio);
        $("#cantEZeroRango").val(planetaActual.elementoZero);
        $("#cantIridioRango,#cantPlatinoRango,#cantPaladioRango,#cantEZeroRango").trigger("input");
    } else if (sistemaSolarActual !== undefined) {
        cargarFormularioSistemaSolar();
        $("#crearTituloInfo").text("Edición de Sistema Solar");
        $("#inputNombre").val(sistemaSolarActual.nombre);
        $("#inputNombre").attr("placeholder", "Ingrese el nombre del Sistema Solar");
        $('.estiloSistemaSolar[data-idImg="sistemasolar' + returnIdBackground(sistemaSolarActual) + '"]').click();
    } else if (nebulosaActual !== undefined) {
        cargarFormularioNebulosa();
        $("#crearTituloInfo").text("Edición de Nebulosa");
        $("#inputNombre").val(nebulosaActual.nombre);
        $("#inputNombre").attr("placeholder", "Ingrese el nombre de la Nebulosa");
        $('#nebulosaEsPeligrosa').prop('checked', nebulosaActual.esPeligrosa);
        $('.estiloNebulosa[data-idImg="nebulosa' + returnIdBackground(nebulosaActual) + '"]').click();
    } else {
        $("#crearTituloInfo").text("Editar Galaxia");
        $("#inputNombre").val(galaxia.nombre);
        $("#inputNombre").attr("placeholder", "Ingrese el nombre de la Galaxia");
        $("#nebulosaEsPeligrosa").addClass("d-none");
        $("#containerEstilos").addClass("d-none");
    }
}