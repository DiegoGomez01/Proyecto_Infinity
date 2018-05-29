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

    $("#btnConfig").on("click", function () {
        $('#sideBarConfig').addClass('active');
        $('#cerrarConfig').addClass('active');
        $('#overlay').fadeIn();
    });

    $("#cerrarConfig").on("click", function () {
        $('#sideBarConfig').removeClass('active');
        $('#cerrarConfig').removeClass('active');
        $('#overlay').fadeOut();
    });

    $("#btnCrearNebu").on("click", function () {
        nivelCreacion = 1;
    });
    //PRUEBA ALERTIFY
    $("#btnpruebaAle").on("click", function () {
        var origen = "nebulosa 1";
        var destino = "nebulosa 2";
        alertify.confirm('<h3 class="alertify-titulo-info">Definir Camino</h3>', '<div class="input-group mb-3">' +
            '<div class="input-group-prepend">' +
            '<span class="input-group-text">Origen:&nbsp;&nbsp;</span>' +
            '</div>' +
            '<input id="inputOrigenCamino" type="text" class="form-control" placeholder="Elemento de Origen" value="' + origen + '" disabled>' +
            '</div>' +
            '<div class="input-group mb-3">' +
            '<div class="input-group-prepend">' +
            '<span class="input-group-text">Destino:</span>' +
            '</div>' +
            '<input id="inputDestinoCamino" type="text" class="form-control" placeholder="Elemento de Destino" value="' + destino + '" disabled>' +
            '</div>' +
            '<div class="input-group mb-3">' +
            '<div class="input-group-prepend">' +
            '<span class="input-group-text">Costo:</span>' +
            '</div>' +
            '<input id="inputCostoCamino" type="text" class="form-control" placeholder="Costo del camino">' +
            '</div>',
            function () {
                var costo = document.getElementById("inputCostoCamino").value;
                if ($.isNumeric(costo)) {
                    alert("si");
                    alert(costo);
                    alertify.confirm().destroy();
                }
            },
            function () {
                alert("no");
            }).set({
            labels: {
                cancel: 'Cancelar',
                ok: 'Guardar'
            },
            reverseButtons: false
        });
    });

    $("#btnCrearElemento").on("click", function () {
        switch (nivelCreacion) {
            case 1:
                cargarFormularioSistemaSolar(true);
                // $("#btnGuardar").parent().addClass("d-none");// ocultar botón guardar
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
    // $("#btnGuardar").parent().addClass("d-none");
    $("#btnCrearElemento").click();
    $("#btnCrearElemento").click();

    function cargarFormularioNebulosa() {
        $('.estiloSistemaSolar').addClass("d-none"); // ocultar estilos sistema solar

        $("#crearTituloInfo").text("Creación de Nebulosa"); // cambiar titulo
        $("#inputNombre").val("Nebulosa 1"); // cambiar nombre
        $('#nebulosaEsPeligrosa').removeClass("d-none"); //mostrar check es peligrosa
        $('.estiloNebulosa').removeClass("d-none"); // mostrar estilos nebulosa
        $("#listaElementosTituloInfo").text("Lista de Sistemas Solares"); // cambiar texto listas
        $("#btnCrearElemento").text("Crear Sistema Solar"); // cambiar texto botón crear
    }

    function cargarFormularioSistemaSolar(desdeNebulosa) {
        if (desdeNebulosa) {
            //De nebulosa a sistema solar
            $('#nebulosaEsPeligrosa').addClass("d-none"); //ocultar check es peligrosa
            $('.estiloNebulosa').addClass("d-none"); // ocultar estilos nebulosa
        } else {
            //De planeta a sistema Solar
            $("#tipoPlanetaSelect").addClass("d-none"); // ocultar selección de tipo
            $('.estiloPlaneta').addClass("d-none"); // ocultar estilos planetas 
            $("#materialesPlaneta").addClass("d-none"); // ocultar materiales
            $("#listaContainer").removeClass("d-none"); // mostrar lista de elementos
            $("#btnCrearElemento").removeClass("d-none"); // mostrar boton crear elemento
        }

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
        switch ($(this).attr("data-tipoPlaneta")) {
            case "1":
                $("#cantIridioRango").val(1000);
                $("#cantPlatinoRango").val(1000);
                $("#cantPaladioRango").val(1000);
                $("#cantEZeroRango").val(1000);
                break;
            case "2":
                $("#cantIridioRango").val(5000);
                $("#cantPlatinoRango").val(3000);
                $("#cantPaladioRango").val(1500);
                $("#cantEZeroRango").val(100);
                break;
            case "3":
                $("#cantIridioRango").val(1000);
                $("#cantPlatinoRango").val(3000);
                $("#cantPaladioRango").val(5000);
                $("#cantEZeroRango").val(7000);
                break;
            case "4":
                $("#cantIridioRango").val(2000);
                $("#cantPlatinoRango").val(5000);
                $("#cantPaladioRango").val(3000);
                $("#cantEZeroRango").val(3000);
                break;
            case "5":
                $("#cantIridioRango").val(6000);
                $("#cantPlatinoRango").val(7000);
                $("#cantPaladioRango").val(5000);
                $("#cantEZeroRango").val(1000);
                break;
        }
        $("#cantIridioRango").change();
        $("#cantPlatinoRango").change();
        $("#cantPaladioRango").change();
        $("#cantEZeroRango").change();
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
            case "1":
                $('.estiloPlaneta').removeClass("d-none"); // mostrar estilos planetas 
                $("#materialesPlaneta").removeClass("d-none"); //mostrar materiales
                $('.estiloEEspacial').addClass("d-none"); // ocultar estilos planetas 
                $('.estiloTTransportador').addClass("d-none"); // ocultar estilos planetas 
                break;
            case "2":
                $('.estiloEEspacial').removeClass("d-none"); // mostrar estilos planetas 
                $('.estiloPlaneta').addClass("d-none"); // mostrar estilos planetas 
                $('.estiloTTransportador').addClass("d-none"); // mostrar estilos teletransportador 
                $("#materialesPlaneta").addClass("d-none"); // ocultar materiales
                break;
            case "3":
                $('.estiloTTransportador').removeClass("d-none"); // mostrar estilos planetas 
                $('.estiloPlaneta').addClass("d-none"); // mostrar estilos planetas 
                $('.estiloEEspacial').addClass("d-none"); // mostrar estilos estacion espacial 
                $("#materialesPlaneta").addClass("d-none"); // ocultar materiales
                break;
        }
    });

    $("#cantIridioRango").change(function () {
        $("#cantIridio").text(this.value + "T");
    });
    $("#cantPlatinoRango").change(function () {
        $("#cantPlatino").text(this.value + "T");
    });
    $("#cantPaladioRango").change(function () {
        $("#cantPaladio").text(this.value + "T");
    });
    $("#cantEZeroRango").change(function () {
        $("#cantEZero").text(this.value + "T");
    });
});