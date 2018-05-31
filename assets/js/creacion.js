$(document).ready(function () {
    alertify.defaults = {
        autoReset: true,
        basic: false,
        closable: false,
        closableByDimmer: false,
        frameless: false,
        maintainFocus: true,
        maximizable: false,
        modal: true,
        movable: false,
        moveBounded: false,
        overflow: true,
        padding: false,
        pinnable: true,
        pinned: true,
        preventBodyShift: false,
        resizable: false,
        startMaximized: false,
        transition: "zoom",
        notifier: {
            delay: 5,
            position: 'bottom-right',
            closeButton: false
        },
        glossary: {
            ok: 'Aceptar',
            cancel: 'Cancelar'
        },
        theme: {
            input: "form-control",
            ok: "btn btn-primario",
            cancel: "btn btn-secundario"
        }
    };

    var nivelCreacion = 1; //Niveles 0-Galaxia, 1-Nebulosa, 2-Sistema Solar y 3-Planeta

    $("#btnCrear").on("click", function () {
        mostrarSideBarConfig();
    });

    $("#btnCerrarSideBar").on("click", function () {
        $('#sideBarConfig, #btnCerrarSideBar').removeClass('active');
        $('#overlay').fadeOut();
    });

    function mostrarSideBarConfig() {
        $('#sideBarConfig, #btnCerrarSideBar').addClass('active');
        $('#overlay').fadeIn();
    }

    $('#btnCrear, #btnEditar, #btnEliminar, #btnAtras').popover({
        trigger: 'hover'
    })

    $("#btnCrearNebu").on("click", function () {
        nivelCreacion = 1;
    });

    $("#btnCrearElemento").on("click", function () {
        switch (nivelCreacion) {
            case 1:
                cargarFormularioSistemaSolar(true);
                nivelCreacion = 2;
                break;
            case 2:
                cargarFormularioPlaneta();
                nivelCreacion = 3;
                break;
        }
    });

    $("#btnCancelar").on("click", function () {
        switch (nivelCreacion) {
            case 1:
                alert("yaaa");
                nivelCreacion = 0;
                break;
            case 2:
                cargarFormularioNebulosa();
                nivelCreacion = 1;
                break;
            case 3:
                cargarFormularioSistemaSolar(false);
                nivelCreacion = 2;
                break;
        }
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
        $("#cantIridioRango").trigger("input");
        $("#cantPlatinoRango").trigger("input");
        $("#cantPaladioRango").trigger("input");
        $("#cantEZeroRango").trigger("input");
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
                $('.estiloEEspacial').addClass("d-none"); // ocultar estilos planetas 
                $('.estiloTTransportador').addClass("d-none"); // ocultar estilos planetas 
                break;
            case "ecombustible":
                $('.estiloEEspacial').removeClass("d-none"); // mostrar estilos planetas 
                $('.estiloPlaneta').addClass("d-none"); // mostrar estilos planetas 
                $('.estiloTTransportador').addClass("d-none"); // mostrar estilos teletransportador 
                $("#materialesPlaneta").addClass("d-none"); // ocultar materiales
                break;
            case "teletrasportador":
                $('.estiloTTransportador').removeClass("d-none"); // mostrar estilos planetas 
                $('.estiloPlaneta').addClass("d-none"); // mostrar estilos planetas 
                $('.estiloEEspacial').addClass("d-none"); // mostrar estilos estacion espacial 
                $("#materialesPlaneta").addClass("d-none"); // ocultar materiales
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
});

function cargarFormularioNebulosa() {
    $('.estiloSistemaSolar').addClass("d-none"); // ocultar estilos sistema solar

    $("#crearTituloInfo").text("Creación de Nebulosa"); // cambiar titulo
    $("#inputNombre").val("Nebulosa 1"); // cambiar nombre
    $('#nebulosaEsPeligrosa').removeClass("d-none"); //mostrar check es peligrosa
    $('.estiloNebulosa').removeClass("d-none"); // mostrar estilos nebulosa
    $("#listaElementosTituloInfo").text("Lista de Sistemas Solares"); // cambiar texto listas
    $("#btnCrearElemento").text("Crear Sistema Solar"); // cambiar texto botón crear
}

function cargarFormularioSistemaSolar() {
    //De nebulosa a sistema solar
    $('#nebulosaEsPeligrosa').addClass("d-none"); //ocultar check es peligrosa
    $('.estiloNebulosa').addClass("d-none"); // ocultar estilos nebulosa
    //De planeta a sistema Solar
    $("#tipoPlanetaSelect").addClass("d-none"); // ocultar selección de tipo
    $('.estiloPlaneta').addClass("d-none"); // ocultar estilos planetas
    $("#materialesPlaneta").addClass("d-none"); // ocultar materiales
    $("#listaContainer").removeClass("d-none"); // mostrar lista de elementos
    $("#btnCrearElemento").removeClass("d-none"); // mostrar boton crear elemento

    $("#crearTituloInfo").text("Creación de Sistema Solar"); // cambiar titulo
    $("#inputNombre").val("Sistema Solar 1"); // cambiar nombre
    $('.estiloSistemaSolar').removeClass("d-none"); // mostrar estilos sistema solar
    $("#listaElementosTituloInfo").text("Lista de Planetas"); // cambiar texto listas
    $("#btnCrearElemento").text("Crear Planeta"); // cambiar texto botón crear
}

function cargarFormularioPlaneta() {
    //De Sistema solar a Planeta
    $('.estiloSistemaSolar').addClass("d-none"); // ocultar estilos sistema solar
    $("#listaContainer").addClass("d-none"); // ocultar lista de elementos
    $("#btnCrearElemento").addClass("d-none"); // ocultar boton crear elemento

    $("#crearTituloInfo").text("Creación de Planeta"); // cambiar titulo
    $("#inputNombre").val("Planeta 1"); // cambiar nombre
    $("#tipoPlanetaSelect").removeClass("d-none"); // mostrar selección de tipo
    $('.estiloPlaneta').removeClass("d-none"); // mostrar estilos planetas
    $("#materialesPlaneta").removeClass("d-none"); //mostrar materiales
}