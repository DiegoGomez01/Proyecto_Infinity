var costoActual = Infinity;
var LNV = [];
// this.iridio = planeta.iridio;
// this.platino = planeta.platino;
// this.paladio = planeta.paladio;
// this.eZero = planeta.elementoZero;

function calcularMejorRuta() {
    //caminoActual
    var planetasCandidatos = getPlanetasC();
    var ubicacionActual = [planetaActual.id, sistemaSolarActual.id, nebulosaActual.id];
    var mejoras = [];
    for (let iM = 0; iM < nave.mejoras.length; iM++) {
        const mejora = nave.mejoras[iM];
        mejoras.push({
            nombre: mejora.nombre,
            iridio: mejora.iridio,
            platino: mejora.platino,
            paladio: mejora.paladio,
            eZero: mejora.zero
        });
    }
    var naveEst = {
        vida: ((nave.vida * 100) / nave.vidaMaxima),
        combustible: nave.combustible.value,
        sondas: nave.cantSondas,
        capacidadCombustible: nave.combustible.maxValue,
        capacidad: nave.capacidadCarga,
        iridio: nave.cantIridio,
        platino: nave.cantPlatino,
        paladio: nave.cantPaladio,
        eZero: nave.cantEZero,
        mejorasF: mejoras
    };
    iniciarEstado(ubicacionActual, planetasCandidatos, naveEst, accion);
}

function iniciarEstado(ubicacionActual, planetas, naveEst) {
    var newObject = jQuery.extend(true, {}, oldObject);
}

function estado(ubicacionActual, planetas, naveEst, accion) {
    switch (accion[0]) {
        case "V":

            break;
        case "CC":

            break;
        case "CS":

            break;
        case "M":

            break;
    }
    let necesidadesM = calcularNecesidadMejoras(naveEst);
    let estacionEC = galaxia.nebulosas[ubicacionActual[2]].sistemasPlanetarios[ubicacionActual[1]].planetas[ubicacionActual[0]].estacionECercana;
    actualizarBeneficioXCosto(ubicacionActual[1], ubicacionActual[2], planetas, naveEst, necesidadesM);
    if (naveEst.sondas >= 2) {
        //Visitar Planeta
        for (let p = 0; p < planetas.length; p++) {
            const planeta = planetas[p];
            let cantEiridio;
            let cantEplatino;
            let cantEpaladio;
            let cantEeZero;
            if (planeta.BeneficioXCosto > 0) {
                if ((planeta.iridio - necesidadesM[0]) >= 0) {
                    cantEiridio = necesidadesM[0];
                } else {
                    cantEiridio = planeta.iridio;
                }
                if ((planeta.platino - necesidadesM[1]) >= 0) {
                    cantEplatino = necesidadesM[1];
                } else {
                    cantEplatino = planeta.platino;
                }
                if ((planeta.paladio - necesidadesM[2]) >= 0) {
                    cantEpaladio = necesidadesM[2];
                } else {
                    cantEpaladio = planeta.paladio;
                }
                if ((planeta.eZero - necesidadesM[3]) >= 0) {
                    cantEeZero = necesidadesM[3];
                } else {
                    cantEeZero = planeta.eZero;
                }
                estado(planeta.pos, jQuery.extend(true, {}, planetas), jQuery.extend(true, {}, naveEst), ["V", cantEiridio, cantEplatino, cantEpaladio, cantEeZero]);
            } else {
                break;
            }
        }

        //comprar Combustible llenar al 100%
        let necCombustible = naveEst.capacidadCombustible - naveEst.combustible;
        let necIridio = (compraCombustible[0] * necCombustible) / compraCombustible[4];
        let necPlatino = (compraCombustible[1] * necCombustible) / compraCombustible[4];
        let necPaladio = (compraCombustible[2] * necCombustible) / compraCombustible[4];
        let necEZero = (compraCombustible[3] * necCombustible) / compraCombustible[4];
        if (naveEst.iridio >= necIridio && naveEst.platino >= necPlatino && naveEst.paladio >= necPaladio && naveEst.eZero >= necEZero) {
            estado([estacionEC[0], estacionEC[1], estacionEC[2]], jQuery.extend(true, {}, planetas), jQuery.extend(true, {}, naveEst), ["CC", necIridio, necPlatino, necPaladio, necEZero, necCombustible]);
        }
    }

    //Comprar un paquete de sondas
    let puedoComprarSondas = (naveEst.iridio >= compraSondas[0]) && (naveEst.platino >= compraSondas[1]) && (naveEst.paladio >= compraSondas[2]) && (naveEst.eZero >= compraSondas[3]);
    if (puedoComprarSondas) {
        estado([estacionEC[0], estacionEC[1], estacionEC[2]], jQuery.extend(true, {}, planetas), jQuery.extend(true, {}, naveEst), ["CS"]);
    }

    for (let m = 0; m < naveEst.mejoras.length; m++) {
        const mejora = naveEst.mejoras[m];
        if (naveEst.iridio >= mejora.iridio && naveEst.platino >= mejora.platino && naveEst.paladio >= mejora.paladio && naveEst.eZero >= mejora.eZero) {
            estado(ubicacionActual, jQuery.extend(true, {}, planetas), jQuery.extend(true, {}, naveEst), ["M", mejora.nombre]);
        }
    }
}

function actualizarBeneficioXCosto(iSA, iNA, planetasC, naveEst, necesidadesM) {
    for (let i = 0; i < planetasC.length; i++) {
        let costo = 0;
        let planetaC = planetasC[i];
        costo = costoHaciaPlaneta(planetaC.pos[1], planetaC.pos[2], iSA, iNA);
        if (galaxia.nebulosas[planetaC.pos[2]].esPeligrosa) {
            costo += 300000 / vidaNave;
        }
        if (planetaC.estacionEC.length > 0) {
            costo += planetaC.estacionEC[3];
        }
        if ((naveEst.combustible - costo) > 0) {
            let puntos = 0;
            puntos += planetaC.iridio * 100 / necesidadesM[0];
            puntos += planetaC.platino * 100 / necesidadesM[1];
            puntos += planetaC.paladio * 100 / necesidadesM[2];
            puntos += planetaC.eZero * 100 / necesidadesM[3];
            planetaC.BeneficioXCosto = puntos / costo;
        } else {
            planetaC.BeneficioXCosto = -1;
        }
    }
    planetasC.sort(function (a, b) {
        return b.BeneficioXCosto - a.BeneficioXCosto;
    });
}

function getPlanetasC() {
    var planetasCandidatos = [];
    var planetaAux;
    for (var iN in galaxia.nebulosas) {
        var nebulosa = galaxia.nebulosas[iN];
        for (var iS in nebulosa.sistemasPlanetarios) {
            var sistemasolar = nebulosa.sistemasPlanetarios[iS];
            for (var iP in sistemasolar.planetas) {
                planetaAux = sistemasolar.planetas[iP];
                if (planetaAux.estacionECercana.length == 0) {
                    if (planetaAux.tipo == "ecombustible") {
                        planetaAux.estacionECercana = [iP, iS, iN, 0];
                    } else {
                        planetaAux.estacionECercana = estacionMasCercana(iS, iN);
                    }
                }
                if (planetaAux.tipo == "planeta") {
                    planetasCandidatos.push({
                        pos: [iP, iS, iN],
                        iridio: planetaAux.iridio,
                        platino: planetaAux.platino,
                        paladio: planetaAux.paladio,
                        eZero: planetaAux.elementoZero,
                        BeneficioXCosto: 0,
                        estacionEC: planetaAux.estacionECercana
                    });
                }
            }
        }
    }
    return planetasCandidatos;
}

function calcularNecesidadMejoras(naveEst) {
    var cantIridio = 0;
    var cantPlatino = 0;
    var cantPaladio = 0;
    var cantEZero = 0;
    var total = 0;
    var res = [];
    for (let index = 0; index < naveEst.mejoras.length; index++) {
        cantIridio += naveEst.mejoras[index].iridio;
        cantPaladio += naveEst.mejoras[index].paladio;
        cantPlatino += naveEst.mejoras[index].platino;
        cantEZero += naveEst.mejoras[index].eZero;
    }
    total = cantEZero + cantIridio + cantPaladio + cantPlatino;
    res[0] = ((cantIridio / total) * naveEst.capacidad) - naveEst.iridio;
    res[1] = ((cantPlatino / total) * naveEst.capacidad) - naveEst.platino;
    res[2] = ((cantPaladio / total) * naveEst.capacidad) - naveEst.paladio;
    res[3] = ((cantEZero / total) * naveEst.capacidad) - naveEst.eZero;
    return res;
}

function costoHaciaPlaneta(iSD, iND, iSO, iNO) {
    var costo = 0;
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

function estacionMasCercana(iSO, iNO) {
    var estCercana = [];
    var costo = 0;
    for (const i in galaxia.nebulosas) {
        const nebulosaEst = galaxia.nebulosas[i].estacionEspacial;
        if (nebulosaEst.length > 0) {
            if (iNO == i && nebulosaEst[1] == iSO) {
                return [nebulosaEst[2], nebulosaEst[1], nebulosaEst[0], 0];
            }
            costo = costoHaciaPlaneta(nebulosaEst[1], nebulosaEst[0], iSO, iNO);
            if (estCercana.length == 0 || estCercana[3] > costo) {
                estCercana = [nebulosaEst[2], nebulosaEst[1], nebulosaEst[0], costo];
            }
        }
    }
    return estCercana;
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