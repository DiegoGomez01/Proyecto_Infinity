class Galaxia {
    constructor(nombre) {
        this.nombre = nombre;
        this.Nebulosas = [];
<<<<<<< HEAD
        this.lineas = [];
        this.matrizAdy = [];
=======
        this.lineas=[];
        this.matrizAdy=[];
        this.lineasXmatriz=[];
>>>>>>> 8bcee317ad939ef10506e49b62105d9f22dfb5e6
    }
}

class Nebulosa {
<<<<<<< HEAD
    constructor(id, nombre, ubicacionX, ubicacionY, teletrasportador, peligroso) {
=======
    constructor(id,nombre,teletrasportador,peligroso,sprite) {
>>>>>>> 8bcee317ad939ef10506e49b62105d9f22dfb5e6
        this.id = id;
        this.depCombustibleGastado = false;
        this.teletrasportador = teletrasportador;
        this.nombre = nombre;
<<<<<<< HEAD
        this.peligroso = peligroso;
        this.ubicacionX = ubicacionX;
        this.ubicacionY = ubicacionY;
=======
        this.peligroso=peligroso;
        this.sprite = sprite;

>>>>>>> 8bcee317ad939ef10506e49b62105d9f22dfb5e6
        this.sistemasPlanetarios = [];
        this.lineas = [];
        this.matrizAdy = [];
    }

}

class SistemasPlanetarios {
<<<<<<< HEAD
    constructor(id, nombre, ubicacionX, ubicacionY) {
        this.id = id;
        this.nombre = nombre;
        this.ubicacionX = ubicacionX;
        this.ubicacionY = ubicacionY;
        this.Planetas = [];
        this.lineas = [];
=======
    constructor(id,nombre, sprite) {
        this.id = id;
        this.nombre = nombre;
        this.sprite = sprite;

        this.planetas = [];
        this.lineas=[];
        this.matrizAdy=[];
>>>>>>> 8bcee317ad939ef10506e49b62105d9f22dfb5e6
    }
}

class Planetas {
    constructor(id, nombre, iridio, platino, paladio, elementoCero, tipo, ubicacionX, ubicacionY) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.ubicacionX = ubicacionX;
        this.ubicacionY = ubicacionY;
        this.iridio = iridio;
        this.platino = platino;
        this.paladio = paladio;
        this.elementoCero = elementoCero;
    }

}