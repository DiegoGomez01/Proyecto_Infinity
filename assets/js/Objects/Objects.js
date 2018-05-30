
class Galaxia {
    constructor(nombre) {
        this.nombre = nombre;
        this.Nebulosas = [];
    }
}

class Nebulosa {
    constructor(id,nombre,teletrasportador,peligroso,sprite) {
        this.id = id;
        this.depCombustibleGastado=false;
        this.teletrasportador=teletrasportador;
        this.nombre = nombre;
        this.peligroso=peligroso;
        this.sprite = sprite;

        this.sistemasPlanetarios = [];
        this.lineas=[];
        this.matrizAdy=[];
        this.lineasXmatriz=[];
    }

}

class SistemasPlanetarios {
    constructor(id,nombre, sprite) {
        this.id = id;
        this.nombre = nombre;
        this.sprite = sprite;

        this.planetas = [];
        this.lineas=[];
        this.matrizAdy=[];
        this.lineasXmatriz=[];
    }
}

class Planetas {
    constructor(id,nombre, iridio,platino,paladio, elementoCero,tipo,sprite) {
        this.id = id;
        this.nombre = nombre;
        this.tipo=tipo;
        this.iridio = iridio;
        this.platino = platino;
        this.paladio = paladio;
        this.elementoCero = elementoCero;
        this.sprite=sprite;
    }

}