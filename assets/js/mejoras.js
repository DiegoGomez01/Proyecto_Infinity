$(document).ready(function () {
    $("#Mejoras").on("click", function () {
        alert(hacerMejora("escudoMultinucleo"));
    });
});
function hacerMejora(tipo){
    switch(tipo){
        case "escudoMultinucleo":
            if(descontarElementos(500,1200,1800,1600)){
                mejoraEscudoMultinucleo(200);//aumento de escudo
                return true;
            }
        break;
        case "blindajeNavesPesadas":
            if(descontarElementos(4000,5500,3500,5100)){
                mejoraBlindajeNavesPesadas();
                return true;
            }
        break;
        case "cañonTTanix":
            if(descontarElementos(4000,6000,6000,6000)){
                mejoraCañonTTanix();
                return true;
            }
        break;
        case "propulsorOnix":
            if(descontarElementos(1000,800,1200,1500)){
                mejoraPropulsorOnix();
                return true;
            }
        break;
        case "cañonPlasma":
            if(descontarElementos(2500,3000,2800,3500)){
                mejoraCañonPlasma();
                return true;
            }
        break;
        case "capacidadDepositos":
            if(descontarElementos(4000,4000,4000,4000)){
                mejoraCapacidadDepositos();
                return true;
            }
        break;
        case "vidaNave":
            if(descontarElementos(500,1000,1000,1000)){
                mejoraVidaNave();
                return true;
            }
        break;
        case "capacidadCombustible":
            if(descontarElementos(1500,2000,1500,3000)){
                mejoraCapacidadCombustible();
                return true;
            }
        break;
    }
    return false;
}

function mejoraEscudoMultinucleo(aumento){
    nave.setEscudo(nave.escudo+aumento);
}
function mejoraBlindajeNavesPesadas(){
    nave.setEscudo(1200);
}
function mejoraCañonTTanix(){
    
}
function mejoraPropulsorOnix(){

}
function mejoraCañonPlasma(){

}
function mejoraCapacidadDepositos(){

}
function mejoraVidaNave(){

}
function mejoraCapacidadCombustible(){

}

function descontarElementos(zero,paladio,iridio,platino){
    if(elementosSuficinetes(zero,paladio,iridio,platino)){
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