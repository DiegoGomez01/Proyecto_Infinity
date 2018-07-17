var costoActual = Infinity;
var estadosCreador = 0;
var caminoglobal = [];

function calcularMejorRuta() {
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
        mejoras: nave.mejoras
    };
    caminoglobal = estado(ubicacionActual, 0, planetasCandidatos, naveEst, [""]); // estado inicial
    alert(costoActual);
    alert(estadosCreador);
    if (caminoglobal !== undefined && caminoglobal.length > 0) {
        alertify.success('¡Recorriendo una nueva ruta!');
        console.log(caminoglobal);
    } else {
        alertify.error('Lastimosamente, no se encontró una solución al problema. <br/> ¡La tierra está perdida! :(', 0);
    }
}

function estado(ubicacionActual, costo, planetas, naveEst, accion) {
    estadosCreador++;
    let costoLocal = costo;
    let caminoLocal = [];
    let siguienteCamino;
    //Actualizar el estado
    switch (accion[0]) {
        case "V":
            let p = accion[1];
            naveEst.iridio += accion[2];
            naveEst.platino += accion[3];
            naveEst.paladio += accion[4];
            naveEst.eZero += accion[5];
            planetas[p].iridio -= accion[2];
            planetas[p].platino -= accion[3];
            planetas[p].paladio -= accion[4];
            planetas[p].eZero -= accion[5];
            naveEst.sondas -= 2;
            caminoLocal.push(["Ex", accion[2], accion[3], accion[4], accion[5]]);
            break;
        case "CC":
            naveEst.iridio -= accion[1];
            naveEst.platino -= accion[2];
            naveEst.paladio -= accion[3];
            naveEst.eZero -= accion[4];
            naveEst.combustible += accion[5];
            caminoLocal.push(["CC", accion[1], accion[2], accion[3], accion[4], accion[5]]);
            break;
        case "CS":
            naveEst.iridio -= compraSondas[0];
            naveEst.platino -= compraSondas[1];
            naveEst.paladio -= compraSondas[2];
            naveEst.eZero -= compraSondas[3];
            naveEst.sondas += compraSondas[4];
            caminoLocal.push(["CS"]);
            break;
        case "M":
            caminoLocal.push(["ME", accion[2]]);
            if (accion[2] == "capacidadDepositos") {
                naveEst.capacidad = 12000;
            } else if (accion[2] == "capacidadCombustible") {
                naveEst.capacidadCombustible = 250000;
            }
            naveEst.mejoras.splice(accion[1], 1);
            if (naveEst.mejoras.length == 0) {
                if (costoActual > costoLocal) {
                    costoActual = costoLocal;
                    return caminoLocal;
                }
            }
            break;
    }
    let necesidadesM = calcularNecesidadMejoras(naveEst);
    let estacionEC = galaxia.nebulosas[ubicacionActual[2]].sistemasPlanetarios[ubicacionActual[1]].planetas[ubicacionActual[0]].estacionECercana;
    alert(estacionEC.length);
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
                if ((planeta.costo + costoLocal) < costoActual) {
                    siguienteCamino = estado(planeta.pos, planeta.costo + costoLocal, jQuery.extend(true, [], planetas), jQuery.extend(true, {}, naveEst), ["V", p, cantEiridio, cantEplatino, cantEpaladio, cantEeZero]);
                    if (siguienteCamino.length > 0) {
                        obtenerCamino(planeta.pos[0], planeta.pos[1], planeta.pos[2], ubicacionActual[0], ubicacionActual[1], ubicacionActual[2], caminoLocal);
                        caminoLocal.push(siguienteCamino);
                    }
                }
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
        alert(estacionEC[3]);
        // alert((costoLocal + estacionEC[3]) < costoActual);
        if ((naveEst.iridio >= necIridio && naveEst.platino >= necPlatino && naveEst.paladio >= necPaladio && naveEst.eZero >= necEZero) && (costoLocal + estacionEC[3]) < costoActual) {
            alert("kvrass");
            siguienteCamino = estado([estacionEC[0], estacionEC[1], estacionEC[2]], estacionEC[3] + costoLocal, jQuery.extend(true, [], planetas), jQuery.extend(true, {}, naveEst), ["CC", necIridio, necPlatino, necPaladio, necEZero, necCombustible]);
            if (siguienteCamino.length > 0) {
                obtenerCamino(estacionEC[0], estacionEC[1], estacionEC[2], ubicacionActual[0], ubicacionActual[1], ubicacionActual[2], caminoLocal);
                caminoLocal.push(siguienteCamino);
            }
        }
    }

    //Comprar un paquete de sondas
    let puedoComprarSondas = (naveEst.iridio >= compraSondas[0]) && (naveEst.platino >= compraSondas[1]) && (naveEst.paladio >= compraSondas[2]) && (naveEst.eZero >= compraSondas[3]);
    if (puedoComprarSondas && (costoLocal + estacionEC[3]) < costoActual) {
        siguienteCamino = estado([estacionEC[0], estacionEC[1], estacionEC[2]], estacionEC[3] + costoLocal, jQuery.extend(true, [], planetas), jQuery.extend(true, {}, naveEst), ["CS"]);
        if (siguienteCamino.length > 0) {
            obtenerCamino(estacionEC[0], estacionEC[1], estacionEC[2], ubicacionActual[0], ubicacionActual[1], ubicacionActual[2], caminoLocal);
            caminoLocal.push(siguienteCamino);
        }
    }
    // alert(naveEst.mejoras.length);
    for (let m = 0; m < naveEst.mejoras.length; m++) {
        const mejora = naveEst.mejoras[m];
        // alert(naveEst.iridio + ">=" + mejora.iridio);
        // alert(naveEst.platino + ">=" + mejora.platino);
        // alert(naveEst.paladio + ">=" + mejora.paladio);
        // alert(naveEst.eZero + ">=" + mejora.zero);
        if (naveEst.iridio >= mejora.iridio && naveEst.platino >= mejora.platino && naveEst.paladio >= mejora.paladio && naveEst.eZero >= mejora.zero) {
            // alert("kvrass.com");
            siguienteCamino = estado(ubicacionActual, costoLocal, jQuery.extend(true, [], planetas), jQuery.extend(true, {}, naveEst), ["M", m, mejora.nombre]);
            if (siguienteCamino.length > 0) {
                caminoLocal.push(siguienteCamino);
            }
        }
    }
    return caminoLocal;
}

function actualizarBeneficioXCosto(iSA, iNA, planetasC, naveEst, necesidadesM) {
    for (let i = 0; i < planetasC.length; i++) {
        let costo = 0;
        let planetaC = planetasC[i];
        costo = costoHaciaPlaneta(planetaC.pos[1], planetaC.pos[2], iSA, iNA);
        if (galaxia.nebulosas[planetaC.pos[2]].esPeligrosa) {
            costo += 300000 / naveEst.vida;
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
        planetaC.costo = costo;
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
                        sistemasolar.planetas[iP].estacionECercana = [iP, iS, iN, 0];
                    } else {
                        sistemasolar.planetas[iP].estacionECercana = estacionMasCercana(iS, iN);
                    }
                }
                if (sistemasolar.planetas[iP].tipo == "planeta") {
                    planetasCandidatos.push({
                        pos: [iP, iS, iN],
                        estacionEC: planetaAux.estacionECercana,
                        iridio: planetaAux.iridio,
                        platino: planetaAux.platino,
                        paladio: planetaAux.paladio,
                        eZero: planetaAux.elementoZero,
                        BeneficioXCosto: 0,
                        costo: 0
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
        cantEZero += naveEst.mejoras[index].zero;
    }
    total = cantEZero + cantIridio + cantPaladio + cantPlatino;
    res[0] = ((cantIridio / total) * naveEst.capacidad) - naveEst.iridio;
    res[1] = ((cantPlatino / total) * naveEst.capacidad) - naveEst.platino;
    res[2] = ((cantPaladio / total) * naveEst.capacidad) - naveEst.paladio;
    res[3] = ((cantEZero / total) * naveEst.capacidad) - naveEst.eZero;
    return res;
}

function costoHaciaPlaneta(iSD, iND, iSO, iNO) {
    let costo = 0;
    nebOrg = galaxia.nebulosas[iNO];
    if (iND !== iNO) {
        let nebDes = galaxia.nebulosas[iND];
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

function obtenerCamino(iPD, iSD, iND, iPAct, iSAct, iNAct, caminoAS) {
    if (iNAct !== iND) {
        var nebAct = galaxia.nebulosas[iNAct];
        var nebDes = galaxia.nebulosas[iND];
        obtenerCamino(nebAct.teletransportador[2], nebAct.teletransportador[1], iNAct, iPAct, iSAct, iNAct, caminoAS);
        caminoAS.push(["T", iND]);
        obtenerCamino(iPD, iSD, iND, nebDes.teletransportador[0], nebDes.teletransportador[1], iND, caminoAS);
    } else if (iSAct !== iSD) {
        caminoAS.push(["SN"]);
        var newiSAct;
        do {
            newiSAct = galaxia.nebulosas[iNAct].matrizAdyacencia[iSAct][iSD];
            caminoAS.push(["M", newiSAct[0], newiSAct[1]]);
            iSAct = newiSAct[0];
        } while (iSAct != iSD);
        var pE = Object.keys(galaxia.nebulosas[iNAct].sistemasPlanetarios[iSAct].planetas)[0];
        caminoAS.push(["ES", pE]);
        obtenerCamino(iPD, iSD, iND, pE, iSAct, iNAct, caminoAS);
    } else if (iPAct !== iPD) {
        caminoAS.push(["S"]);
        do {
            iPAct = galaxia.nebulosas[iNAct].sistemasPlanetarios[iSAct].matrizAdyacencia[iPAct][iPD][0];
            caminoAS.push(["M", iPAct, 0]);
        } while (iPAct !== iPD);
        caminoAS.push(["E"]);
    }
}