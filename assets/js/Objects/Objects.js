
class Galaxia {
    constructor(nombre) {
        this.nombre = nombre;
        this.Nebulosas = [];
        this.lineas=[];
        this.matrizAdy=[];
    }
}

class Nebulosa {
    constructor(id,nombre, ubicacionX, ubicacionY,teletrasportador,peligroso) {
        this.id = id;
        this.depCombustibleGastado=false;
        this.teletrasportador=teletrasportador;
        this.nombre = nombre;
        this.peligroso=peligroso;
        this.ubicacionX = ubicacionX;
        this.ubicacionY = ubicacionY;
        this.sistemasPlanetarios = [];
        this.lineas=[];
        this.matrizAdy=[];
    }

}

class SistemasPlanetarios {
    constructor(id,nombre, ubicacionX, ubicacionY) {
        this.id = id;
        this.nombre = nombre;
        this.ubicacionX = ubicacionX;
        this.ubicacionY = ubicacionY;
        this.Planetas = [];
        this.lineas=[];
    }
}

class Planetas {
    constructor(id,nombre, iridio,platino,paladio, elementoCero,tipo,ubicacionX,ubicacionY) {
        this.id = id;
        this.nombre = nombre;
        this.tipo=tipo;
        this.ubicacionX = ubicacionX;
        this.ubicacionY = ubicacionY;
        this.iridio = iridio;
        this.platino = platino;
        this.paladio = paladio;
        this.elementoCero = elementoCero;
    }

}