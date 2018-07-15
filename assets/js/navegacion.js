var menorCS;
var LNV = [];
var camino;
// this.iridio = planeta.iridio;
// this.platino = planeta.platino;
// this.paladio = planeta.paladio;
// this.eZero = planeta.elementoZero;

function calcularMejorRuta() {
    //caminoActual

}

function calcularCotaSuperior() {

}

function actualizarBeneficioXCosto() {
    var nec = calcularNecesidadMejoras();
    var costo = costoHaciaPlaneta();
    for (let i = 0; i < planetasCandidatos.length; i++) {
        planetasCandidatos[i].setBC(nec, costo);
    }
    planetasCandidatos.sort(function (a, b) {
        return b.BeneficioXCosto - a.BeneficioXCosto;
    });
}

function getPlanetasC() {
    var planetasCandidatos = [];
    for (var iN in galaxia.nebulosas) {
        var nebulosa = galaxia.nebulosas[iN];
        for (var iS in nebulosa.sistemasPlanetarios) {
            var sistemasolar = nebulosa.sistemasPlanetarios[iS];
            for (var iP in sistemasolar.planetas) {
                if (sistemasolar.planetas[iP].tipo == "planeta") {
                    planetasCandidatos.push(new planetaCandidato(sistemasolar.planetas[iP], iN, iS));
                }
            }
        }
    }
    return planetasCandidatos;
}

function costoHaciaPlaneta(iSD, iND, iSO, iNO) {
    var costo = 0;
    if (galaxia.nebulosas[iND].esPeligrosa) {
        costo += 4000;
    }
    nebOrg = galaxia.nebulosas[iNO];
    if (iND !== iNO) {
        var nebDes = galaxia.nebulosas[iND];
        if (nebOrg.teletransportador.length > 0 && nebDes.teletransportador.length > 0) {
            if (nebOrg.teletransportador[1] !== iSO) {
                costo += nebOrg.matrizAdyacencia[iSO][nebOrg.teletransportador[1]][1];
            }
            if (nebDes.teletransportador[1] !== iSD) {
                costo += nebOrg.matrizAdyacencia[nebDes.teletransportador[1]][iSD][1];
            }
        } else {
            costo = Infinity;
        }
    } else if (iSD !== iSO) {
        costo += nebOrg.matrizAdyacencia[iSO][iSD][1];
    }
    return costo;

}
//caminoAS.push("S");

function obtenerCamino(iPD, iSD, iND, iPAct, iSAct, iNAct, caminoAS) {
    if (iNAct !== iND) {
        var nebAct = galaxia.nebulosas[iNAct];
        var nebDes = galaxia.nebulosas[iND];
        obtenerCamino(nebAct.teletransportador[0], nebAct.teletransportador[1], iNAct, iPAct, iSAct, iNAct, caminoAS);
        caminoAS.push(["T", iND]);
        obtenerCamino(iPD, iSD, iND, nebDes.teletransportador[0], nebDes.teletransportador[1], iND, caminoAS);
    } else if (iSAct !== iSD) {
        caminoAS.push("SN");
        var newiSAct;
        do {
            newiSAct = galaxia.nebulosas[iNAct].matrizAdyacencia[iSAct][iSD];
            caminoAS.push(["M", newiSAct[0], newiSAct[1]]);
            iSAct = newiSAct[0];
        } while (iSAct != iSD);
        var pE = Object.keys(galaxia.nebulosas[iNAct].sistemasPlanetarios[iSAct].planetas)[0];
        caminoAS.push(["E", pE]);
        obtenerCamino(iPD, iSD, iND, pE, iSAct, iNAct, caminoAS);
    } else if (iPAct !== iPD) {
        do {
            iPAct = galaxia.nebulosas[iNAct].sistemasPlanetarios[iSAct].matrizAdyacencia[iPAct][iPD][0];
            caminoAS.push(["M", iPAct, 0]);
        } while (iPAct !== iPD);
    }
}

function calcularNecesidadMejoras() {
    var cantIridio = 0;
    var cantPlatino = 0;
    var cantPaladio = 0;
    var cantEZero = 0;
    var total = 0;
    var res = [];
    var capacidad = nave.combustible.maxValue;
    for (let index = 0; index < nave.mejoras.length; index++) {
        cantIridio += nave.mejoras[index].iridio;
        cantPaladio += nave.mejoras[index].paladio;
        cantPlatino += nave.mejoras[index].platino;
        cantEZero += nave.mejoras[index].zero;
    }
    total = cantEZero + cantIridio + cantPaladio + cantPlatino;
    res[0] = ((cantIridio / total) * capacidad) - nave.cantIridio;
    res[1] = ((cantPlatino / total) * capacidad) - nave.cantPlatino;
    res[2] = ((cantPaladio / total) * capacidad) - nave.cantPaladio;
    res[3] = ((cantEZero / total) * capacidad) - nave.cantEZero;
    return res;
}