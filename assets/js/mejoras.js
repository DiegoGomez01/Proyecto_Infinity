$(document).ready(function () {
    $("#Mejoras").on("click", function () {
        alert(hacerMejora("cañonPlasma"));
    });
});

var posicionDeMejora;

function hacerMejora(tipo){
    if(descontarElementos(tipo)){
        switch(tipo){
            case "escudoMultinucleo":
                mejoraEscudoMultinucleo(400);
                return true;
            break;
            case "blindajeNavesPesadas":
                blindajeNavesPesadas("compra");
                return true;
            break;
            case "cañonTanix":
                mejoraCañonTanix();
                return true;
            break;
            case "propulsorOnix":
                mejoraPropulsorOnix();
                return true;
            break;
            case "cañonPlasma":
                mejoraCañonPlasma();
                return true;
            break;
            case "capacidadDepositos":
                mejoraCapacidadDepositos();
                return true;
            break;
            case "vidaNave":
                mejoraVidaNave();
                return true;
            break;
            case "capacidadCombustible":
                mejoraCapacidadCombustible();
                return true;
            break;
        }
    }
    return false;
}

function mejoraEscudoMultinucleo(aumento){
    nave.setVida(nave.vida+aumento,"aumentar");
}
function blindajeNavesPesadas(tipo){
    nave.setEscudo(1200,"aumentar");
    if(tipo=="compra"){
        $("#escudoNave").width("100%");
        nave.mejoras[posicionDeMejora].activa=false;
    }
}
function mejoraCañonTanix(){
    nave.cañonTanixComprado=true;
    nave.disparoPorTanix=5;
}
function mejoraPropulsorOnix(){

}
function mejoraCañonPlasma(){
    nave.dañoArmaBase+=100;
}
function mejoraCapacidadDepositos(){

}
function mejoraVidaNave(){

}
function mejoraCapacidadCombustible(){

}

function descontarElementos(tipo){
    var zero,paladio,iridio,platino,activa;

    for(var i=0;i< nave.mejoras.length;i++){
        if(nave.mejoras[i].nombre==tipo){
            zero=nave.mejoras[i].zero;
            paladio=nave.mejoras[i].paladio;
            iridio=nave.mejoras[i].iridio;
            platino=nave.mejoras[i].platino;
            activa=nave.mejoras[i].activa;
            posicionDeMejora=i;
            break;
        }
    }
    if(activa && elementosSuficinetes(zero,paladio,iridio,platino)){
        nave.setCantIridio(nave.cantIridio-iridio);
        nave.setCantPlatino((nave.cantPlatino-platino));
        nave.setCantPaladio(nave.cantPaladio-paladio);
        nave.setCantEZero(nave.cantEZero-zero);
        return true;
    }
    return false;
}

function elementosSuficinetes(zero,paladio,iridio,platino){
    if(nave.cantIridio-iridio<0){
        return false;
    }
    if(nave.cantPlatino-platino<0){
        return false;
    }
    if(nave.cantPaladio-paladio<0){
        return false;
    }
    if(nave.cantEZero-zero<0){
        return false;
    }
    return true;
}