var enemigoExplorador=15;
$(document).ready(function () {
    $("#btnConfigEnemigos").on("click", function () {
        alertify.prompt("<h6>Ingrese la cantidad de enemigos tipo exploradores.<br>En el comento hay <b>"+enemigoExplorador+"</b> enemigos.</h6>", "",
        function(closeEvent, cantidadEnemigoExplorador){
            if(!$.isNumeric(cantidadEnemigoExplorador) || cantidadEnemigoExplorador<0){
                closeEvent.cancel = true;
                alertify.error('Ingrese un valor numérico positivo');
            }else{
                enemigoExplorador = cantidadEnemigoExplorador;
                alertify.success('Los enemigos se actualizaron de forma correcta.');
            }
        },
        function(){
            alertify.prompt().destroy();
        }).setHeader("Cantidad de enemigos exploradores");
    });
    $("#btnAttack").on("click", function () {
        game.state.start('attack');
    });
});

var cursors;
var weapon;
var SpriteEnemyNodriza;
var SpriteEnemyAvanz;
var SpriteEnemiesExp;

function createAttack(){
    var numeroPlaneta = returnIdBackground(planetaActual);
    fondo = game.add.sprite(0, 0, 'fondoPlaneta' + numeroPlaneta);
    alistarEnemigos();
    fondo.height = alto;
    fondo.width = ancho;
    agregarNaveDefensa();
    empezarAtaque();
}

function empezarAtaque(){ 
    var nodr = SpriteEnemyNodriza.create(game.rnd.between(1000, 1100), game.rnd.between(0, alto), 'naveNodriza');
    nodr.anchor.setTo(0.5,0.5);   
    var avanz = SpriteEnemyAvanz.create(game.rnd.between(1000, 1100), game.rnd.between(0, alto), 'naveAvanzada');
    avanz.anchor.setTo(0.5,0.5);
    
    for(var j=0;j<enemigoExplorador;j++){
        var exp = SpriteEnemiesExp.create(game.rnd.between(1000, 1100), game.rnd.between(0, alto), 'naveExploradora');
        exp.anchor.setTo(0.5,0.5);
        var tween = game.add.tween(exp);
        tween.to({x:800}, 3000, Phaser.Easing.Bounce.Out);
        tween.start();
    }
}

function agregarNaveDefensa(){
    game.renderer.clearBeforeRender = false;
    game.renderer.roundPixels = true;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    weapon = game.add.weapon(1, 'bala1');
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 400;

    spriteSonda = game.add.sprite(110, 300, 'sonda');
    spriteSonda.anchor.set(0.5);
    spriteSonda.width = 90;
    spriteSonda.height = 15;

    sprite = game.add.sprite(100, 300, 'navePlayer');
    sprite.anchor.set(0.5);
    sprite.width = 100;
    sprite.height = 100;
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    this.weapon.trackSprite(sprite, 0, 0, true);
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
        var sonidoDisparo = game.add.audio('disparo');
        sonidoDisparo.addMarker('inicioDisparo', 0, 13);
        sonidoDisparo.play("inicioDisparo");
        weapon.fire();
    }
    game.physics.arcade.overlap(weapon.bullets, SpriteEnemyAvanz, collAvz, null, this);
    game.physics.arcade.overlap(weapon.bullets, SpriteEnemyNodriza, collNod, null, this);
    game.physics.arcade.overlap(weapon.bullets, SpriteEnemiesExp, collExp, null, this);
}

function collAvz(bullet, enemies) {
    console.log("avanzada");
    colision(bullet);
}
function collNod(bullet, enemies) {
    console.log("nodriza");
    colision(bullet);
}
function collExp(bullet, enemies) {
    console.log("exp");
    colision(bullet);
}

function colision(bullet){
    bullet.kill();
    var sonidoExp = game.add.audio('explosion');
    sonidoExp.addMarker('inicioExplosion', 0, 13);
    sonidoExp.play("inicioExplosion");
}

function alistarEnemigos(){
    SpriteEnemyNodriza = game.add.group();
    SpriteEnemyAvanz = game.add.group();
    SpriteEnemiesExp = game.add.group();
    SpriteEnemyNodriza.enableBody = true;
    SpriteEnemyAvanz.enableBody = true;
    SpriteEnemiesExp.enableBody = true;
    SpriteEnemyNodriza.physicsBodyType = Phaser.Physics.ARCADE;
    SpriteEnemyAvanz.physicsBodyType = Phaser.Physics.ARCADE;
    SpriteEnemiesExp.physicsBodyType = Phaser.Physics.ARCADE;
}