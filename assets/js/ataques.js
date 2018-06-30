var enemigosArray;
$(document).ready(function () {
    $("#btnAttack").on("click", function () {
        alertify.prompt("<h6>Ingrese la cantidad de Naves Enemigas separadas por ','.<br>(Naves Nodrizas, Naves de Avanzada, Naves Exploradoras)</h6>", "",
        function(closeEvent, cantidadNaves ){
            var cantidades = cantidadNaves.split(",");
            var error=false;
            if(cantidades.length!==3){
                closeEvent.cancel = true;
                alertify.error('Ingrese el valor de las 3 naves enemigas');
                error=true;
            }else{
                for(var i=0;i<cantidades.length;i++){
                    if(!$.isNumeric(cantidades[i]) || cantidades[i]<0){
                        closeEvent.cancel = true;
                        var nave="";
                        switch (i){
                            case 0:
                                nave = "Nodrizas";
                                break;
                            case 1:
                                nave = "de Avanzada";
                                break;
                            case 2:
                                nave = "Exploradoras";
                                break;
                        }
                        alertify.error('Ingrese un valor numérico positivo para las Naves '+nave);
                        error=true;
                        break;
                    }
                }
            }
            if(!error){
                enemigosArray = cantidades;
                game.state.start('attack');
            }
        },
        function(){
            alertify.prompt().destroy();
        }).setHeader("Cantidad de Enemigos");
    });
});

function empezarAtaque(){
    var naves=['naveNodriza','naveAvanzada','naveExploradora'];
    for(var j=0;j<3;j++){
        for (var i = 0; i < enemigosArray[j]; i++){
            var s = game.add.sprite(game.rnd.between(800, 1100), game.world.randomY, naves[j]);//game.rnd.between(0, 2)
            game.physics.arcade.enable(s);
            s.body.velocity.x = game.rnd.between(-25, -50);
            s.autoCull = true;
            s.checkWorldBounds = true;
            s.events.onOutOfBounds.add(resetSprite, this);
        }
    }
}

function resetSprite(sprite) {
    sprite.x = game.world.bounds.right;
}

function createAttack(){
    fondo = game.add.sprite(0, 0, 'fondoGalaxia');
    fondo.height = alto;
    fondo.width = ancho;
    agregarNaveDefensa();
    empezarAtaque();
}

var cursors;
var bullet;
var bullets;
var bulletTime = 0;

function agregarNaveDefensa(){
    //  This will run in Canvas mode, so let's gain a little speed and display
    game.renderer.clearBeforeRender = false;
    game.renderer.roundPixels = true;

    //  We need arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Our ships bullets
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    //  All 40 of them
    bullets.createMultiple(40, 'bala1');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);

    //  Our player ship
    sprite = game.add.sprite(100, 300, 'navePlayer');
    sprite.anchor.set(0.5);
    sprite.width = 100;
    sprite.height = 100;

    //  and its physics settings
    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    sprite.body.drag.set(100);
    sprite.body.maxVelocity.set(200);

    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
}

function updateAttack() {
    if (cursors.left.isDown){
        sprite.body.angularVelocity = -300;
    }else if (cursors.right.isDown){
        sprite.body.angularVelocity = 300;
    }else{
        sprite.body.angularVelocity = 0;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        fireBullet();
    }
    //screenWrap(sprite);
    bullets.forEachExists(screenWrap, this);
}

function fireBullet () {
    if (game.time.now > bulletTime){
        bullet = bullets.getFirstExists(false);
        if (bullet){
            bullet.reset(sprite.body.x + 16, sprite.body.y + 16);
            bullet.lifespan = 2000;
            bullet.rotation = sprite.rotation;
            game.physics.arcade.velocityFromRotation(sprite.rotation, 400, bullet.body.velocity);
            bulletTime = game.time.now + 50;
        }
    }

}

function screenWrap (sprite) {

    if (sprite.x < 0)
    {
        sprite.x = game.width;
    }
    else if (sprite.x > game.width)
    {
        sprite.x = 0;
    }

    if (sprite.y < 0)
    {
        sprite.y = game.height;
    }
    else if (sprite.y > game.height)
    {
        sprite.y = 0;
    }

}