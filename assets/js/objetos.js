class NaveInfinity {
    constructor(sprite, sonda, indicadorCombustible) {
        this.sprite = sprite;
        this.sondaSprite = sonda;
        this.combustible = indicadorCombustible;
        this.cantSondas;
        this.cantIridio;
        this.cantPlatino;
        this.cantPaladio;
        this.cantEZero;
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
        this.setCantPlatino = cant;
        actualizarBarraMaterial(cant, "Platino");
    }
    setCantPaladio(cant) {
        this.setCantPaladio = cant;
        actualizarBarraMaterial(cant, "Paladio");
    }
    setCantEZero(cant) {
        this.cantEZero = cant;
        actualizarBarraMaterial(cant, "EZero");
    }
}

class Galaxia {
    constructor(nombre) {
        this.nombre = nombre;
        this.planetaOrigen = [];
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

class Dijkstra {

    constructor(totalPesos, verticeOrigen, cantidadNodos) {
        this.verticeOrigen = verticeOrigen;
        this.cantidadNodos = cantidadNodos;
        this.totalPesos = totalPesos;
        this.ultimoVertice = [cantidadNodos];
        this.costosMinimos = [cantidadNodos];
        this.revisado = [cantidadNodos];
    }

    caminosMinimos(ruta) {
        var salida = "";
        for (var i = 0; i < this.cantidadNodos; i++) {
            this.revisado[i] = false;
            this.costosMinimos[i] = this.totalPesos[this.verticeOrigen][i];
            this.ultimoVertice[i] = this.verticeOrigen;
        }
        this.revisado[this.verticeOrigen] = true;
        this.costosMinimos[this.verticeOrigen] = 99999999;
        for (var i = 0; i < this.cantidadNodos; i++) {
            var v = this.minimo();
            this.revisado[v] = true;
            for (var j = 0; j < this.cantidadNodos; j++) {
                if (this.costosMinimos[v] + this.totalPesos[v][j] < this.costosMinimos[j]) {
                    this.costosMinimos[j] = this.costosMinimos[v] + this.totalPesos[v][j];
                    this.ultimoVertice[j] = v;
                }
            }
        }
        for (var i = 0; i < this.cantidadNodos; i++) {
            salida += "costo mínimo de " + this.verticeOrigen + " a " + i + ": " + this.costosMinimos[i] + "\n";
        }
        salida += this.ruta(ruta);
        return salida;
    }

    minimo() {
        var mx = 1000000000; //el menor vertice del origen//vertice que tiene el camino minimo desde el origen
        var v = 1;
        for (var i = 0; i < this.cantidadNodos; i++) {
            if (!this.revisado[i] && (this.costosMinimos[i] <= mx)) {
                mx = this.costosMinimos[i];
                v = i;
            }
        }
        return v;
    }

    ruta(j) {
        var s = "";
        var salida = "";
        var valorInicial = j;
        while (this.ultimoVertice[j] != this.verticeOrigen) {
            s = this.ultimoVertice[j] + "-";
            salida = s + salida;
            j = this.ultimoVertice[j];
        }
        salida = this.verticeOrigen + "-" + salida + valorInicial;
        if (this.costosMinimos[valorInicial] >= 999) {
            s = "No se puede calcular la ruta más corta con respecto al vértice " + j;
        } else {
            s = "La ruta mas corta para el vértice " + valorInicial + " es: " + salida;
        }
        return s;
    }
}