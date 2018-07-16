class NaveInfinity {
    constructor(sprite, sonda, indicadorCombustible) {
        this.sprite = sprite;
        this.sondaSprite = sonda;
        this.combustible = indicadorCombustible;
        this.cantSondas = 0;
        this.cantIridio = 0;
        this.cantPlatino = 0;
        this.cantPaladio = 0;
        this.cantEZero = 0;
        this.msRecorrido = 2000; //2 segundos para hacer el recorrido entre objetos
        this.dañoArmaBase = 60;
        this.vidaMaxima = 1200;
        this.escudoMaximo = 1200;
        this.escudo = 0;
        this.vida = 1200;
        this.capacidadCarga = 8000;
        this.cañonTanixComprado = false;
        this.disparoPorTanix = false;
        this.contadorDisparos = 0;
        this.mejoras = [];
    }
    setEscudo(cant, opcion) {
        //cant es la cantidad a actualizar
        if (opcion == "aumentar") {
            if (cant > this.escudoMaximo) {
                cant = this.escudoMaximo;
                alertify.success("El escudo está al máximo");
            }
        } else if (opcion == "quitar") {
            if (cant < 0) {
                this.setVida(this.vida + cant, "quitar");
                cant = 0;
            }
        }
        this.escudo = cant;
        actualizarBarraEscudo(this.escudo);
    }
    setVida(cant, opcion) {
        //cant es la cantidad a actualizar
        if (opcion == "aumentar") {
            if (cant > this.vidaMaxima) {
                cant = this.vidaMaxima;
                alertify.success("La vida está al máximo");
            }
        } else if (opcion == "quitar") {
            if (cant < 0) {
                cant = 0;
                alertify.error("GAME OVER");
            }
        }
        this.vida = cant;
        actualizarBarraVidaNave(this.vida);
    }
    setCantSondas(cant) {
        $("#numSondas").text(cant);
        this.cantSondas = cant;
    }
    setCantIridio(cant) {
        this.cantIridio = cant;
        actualizarBarraMaterial(cant, "Iridio");
    }
    setCantPlatino(cant) {
        this.cantPlatino = cant;
        actualizarBarraMaterial(cant, "Platino");
    }
    setCantPaladio(cant) {
        this.cantPaladio = cant;
        actualizarBarraMaterial(cant, "Paladio");
    }
    setCantEZero(cant) {
        this.cantEZero = cant;
        actualizarBarraMaterial(cant, "EZero");
    }
}

class Mejora {
    constructor(nombre, zero, paladio, iridio, platino) {
        this.nombre = nombre;
        this.zero = zero;
        this.paladio = paladio;
        this.iridio = iridio;
        this.platino = platino;
    }
}

class Galaxia {
    constructor(nombre) {
        this.nombre = nombre;
        this.planetaOrigen = []; //nebulosa,sistema solar, planeta 
        this.nebulosas = [];
    }
    get arrayElementos() {
        return this.nebulosas;
    }
}

class Nebulosa {
    constructor(id, nombre, esPeligrosa, sprite) {
        this.id = id;
        this.nombre = nombre;
        this.esPeligrosa = esPeligrosa;
        this.estacionEspacial = [];
        this.teletransportador = [];
        this.sprite = sprite;
        this.sistemasPlanetarios = [];
        this.lineas = [];
        this.matrizAdyacencia = [];
    }
    get arrayElementos() {
        return this.sistemasPlanetarios;
    }
}

class SistemasPlanetario {
    constructor(id, nombre, sprite) {
        this.id = id;
        this.nombre = nombre;
        this.sprite = sprite;
        this.planetas = [];
        this.lineas = [];
        this.matrizAdyacencia = [];
    }
    get arrayElementos() {
        return this.planetas;
    }
}

class Planetas {
    constructor(id, nombre, iridio, platino, paladio, elementoZero, tipo, sprite) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.iridio = iridio;
        this.platino = platino;
        this.paladio = paladio;
        this.elementoZero = elementoZero;
        this.sprite = sprite;
    }
}

class Enemigo {
    constructor(id, tipo, vida, sprite) {
        this.id = id;
        this.tipo = tipo;
        this.vida = vida;
        this.sprite = sprite;
    }
}

class estado {
    constructor(planetas, combustible) {
        this.planetas = planetas;
        this.combustible = combustible;
    }
}

class planetaCandidato {
    constructor(planeta, nebID, sisID) {
        this.id = planeta.id;
        this.nebulosa = nebID;
        this.sistemaSolar = sisID;
        this.iridio = planeta.iridio;
        this.platino = planeta.platino;
        this.paladio = planeta.paladio;
        this.eZero = planeta.elementoZero;
        this.BeneficioXCosto = 0;
    }
    desMateriales(redIr, redPl, redPa, redEZ) {
        this.iridio -= redIr;
        this.platino -= redPl;
        this.paladio -= redPa;
        this.eZero -= redEZ;
    }
    setBC(necesidadesM, costo) {
        if ((nave.combustible.value - costo) > 0) {
            var puntos = 0;
            puntos += this.iridio * 100 / necesidadesM[0];
            puntos += this.platino * 100 / necesidadesM[1];
            puntos += this.paladio * 100 / necesidadesM[2];
            puntos += this.eZero * 100 / necesidadesM[3];
            this.BeneficioXCosto = puntos / costo;
        } else {
            this.BeneficioXCosto = -100;
        }
    }
}