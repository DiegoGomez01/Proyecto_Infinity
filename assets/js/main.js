$(document).ready(function () {
    
    var ancho = $(window).width();
    var alto = $(window).height();

    var config = {
        type: Phaser.AUTO,
        width: ancho,
        height: alto,
        parent: "gameContainer",
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var game = new Phaser.Game(config);

    function preload() {}

    function create() {}

    function update() {}
});