var options = {
    angle: -0.2,
    lineWidth: 0.07,
    radiusScale: 0.75,
    pointer: {
        length: 0.6,
        strokeWidth: 0.02,
        color: '#22A7F0'
    },
    limitMax: true,
    limitMin: false,
    colorStart: '#4183D7',
    colorStop: '#4183D7',
    strokeColor: '#ECECEC',
    generateGradient: true,
    highDpiSupport: true,
    percentColors: [
        [0.0, "#F03434"],
        [0.45, "#F9BF3B"],
        [1.0, "#26A65B"]
    ],
    renderTicks: {
        divisions: 10,
        divWidth: 1,
        divLength: 0.6,
        divColor: '#22313F',
        subDivisions: 3,
        subLength: 0.5,
        subWidth: 0.6,
        subColor: '#2C3E50'
    }
};

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

    $('#btnCrear, #btnEditar, #btnEliminar, #btnAtras,#cantIridioNave,#cantPlatinoNave,#cantPaladioNave,#cantEZeroNave').popover({
        trigger: 'hover'
    });

    $("#btnEstado").on("click", function () {
        $(this).toggleClass("fa-chevron-circle-down fa-chevron-circle-up active");
        $("#containerEstado").toggleClass("active");
    });

    var canvasCombustible = document.getElementById("combustibleNivelNave"); // your canvas element
    var indicadorCombustible = new Gauge(canvasCombustible).setOptions(options); // create sexy gauge!
    indicadorCombustible.maxValue = 200000;
    indicadorCombustible.setMinValue(0);
    // indicadorCombustible.animationSpeed = 32;
    indicadorCombustible.set(200000);

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
    var value = 0;
    $("#btnInfoFooter").on("click", function () {
        // value += 10000;
        // indicadorCombustible.set(value);
        // $("#combustibleNivelNave").attr("data-content", value + "L");
        $('#overlay').fadeIn();
        $('#footerGame,#closeFooter').addClass("active");
    });
    $("#closeFooter").on("click", function () {
        $('#overlay').fadeOut();
        $('#footerGame,#closeFooter').removeClass("active");
    });
});

function cargarFormularioNebulosa() {
    $('.estiloSistemaSolar').addClass("d-none"); // ocultar estilos sistema solar

    $("#crearTituloInfo").text("Creación de Nebulosa"); // cambiar titulo
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
    $("#inputNombre").attr("placeholder", "Ingrese el nombre del Sistema Solar"); //cambiar Placeholder
    $('.estiloSistemaSolar').removeClass("d-none"); // mostrar estilos sistema solar
    $("#listaElementosTituloInfo").text("Lista de Planetas"); // cambiar texto listas
    $("#btnCrearElemento").text("Crear Planeta"); // cambiar texto botón crear
}

function cargarFormularioPlaneta() {
    //De Sistema solar a Planeta
    $('.estiloSistemaSolar').addClass("d-none"); // ocultar estilos sistema solar
    $("#listaContainer").addClass("d-none"); // ocultar lista de elementos
    $("#btnCrearElemento").addClass("d-none"); // ocultar boton crear elemento
    $("#inputNombre").attr("placeholder", "Ingrese el nombre del Planeta");
    $("#crearTituloInfo").text("Creación de Planeta"); // cambiar titulo
    $("#tipoPlanetaSelect").removeClass("d-none"); // mostrar selección de tipo
    $('.estiloPlaneta').removeClass("d-none"); // mostrar estilos planetas
    $("#materialesPlaneta").removeClass("d-none"); //mostrar materiales
}

// $('#theprogressbar').attr('aria-valuenow', newprogress).css('width',newprogress);