var enemigoExplorador=8;

var cursors;
var weapon;
var weaponEnemigo;
var vidaEnemigo=0;
var dañoEnemigo=0;
var SpriteEnemyNodriza;
var SpriteEnemyAvanz;
var SpriteEnemiesExp;
var enemigoAtacando;
var gifExplosion=[];
var disparosEnemigosExploradores=[];

$(document).ready(function () {
    $("#btnConfigEnemigos").on("click", function () {
        alertify.prompt("<h6>Ingrese la cantidad de enemigos tipo exploradores.<br>En el comento hay <b>"+enemigoExplorador+"</b> enemigos.</h6>", "",
        function(closeEvent, cantidadEnemigoExplorador){
            if(!$.isNumeric(cantidadEnemigoExplorador) || cantidadEnemigoExplorador<0 || cantidadEnemigoExplorador>8){
                closeEvent.cancel = true;
                alertify.error('Ingrese un valor numérico positivo menor o igual a 8');
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

    $("#NodrizaAlAtaque").on("click", function () {
        verificarSiHayAtaques();
        enemigoAtacando="nodriza";
        vidaEnemigo=500;
        dañoEnemigo=150;
        if(probabilidadExito()){
            SpriteEnemyNodriza.hash.forEach(function(sprite) {
                var tween = game.add.tween(sprite);
                tween.to({x:game.rnd.between(900, 1100)}, 3000, Phaser.Easing.Bounce.Out);
                tween.start();
                tween.onComplete.add(disparoDeEnemigo, this);
            });
        }
    });

    $("#AvanzadaAlAtaque").on("click", function () {
        verificarSiHayAtaques();
        enemigoAtacando="avanzada";
        vidaEnemigo=400;
        dañoEnemigo=100;
        if(probabilidadExito()){
            SpriteEnemyAvanz.hash.forEach(function(sprite) {
                var tween = game.add.tween(sprite);
                tween.to({x:game.rnd.between(900, 1100)}, 3000, Phaser.Easing.Bounce.Out);
                tween.start();
                tween.onComplete.add(disparoDeEnemigo, this);
            });  
        }      
    });

    $("#ExplAlAtaque").on("click", function () {
        verificarSiHayAtaques();
        enemigoAtacando="exploradores";
        vidaEnemigo=100;
        dañoEnemigo=50;
        if(probabilidadExito()){
            SpriteEnemiesExp.hash.forEach(function(sprite) {
                var tween = game.add.tween(sprite);
                tween.to({x:game.rnd.between(900, 1100)}, 3000, Phaser.Easing.Bounce.Out);
                tween.start();
                tween.onComplete.add(disparoDeEnemigo, this);
            });
        } 
    });
});

function verificarSiHayAtaques(){
    if(enemigoAtacando!==undefined){
        switch (enemigoAtacando){
            case "nodriza":
                SpriteEnemyNodriza.kill();
                break;
            case "avanzada":
                SpriteEnemyAvanz.kill();
                break;
            case "exploradores":
                SpriteEnemiesExp.kill();
                break;
        }
        enemigoAtacando=undefined;
    }
}

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
    var nodr = SpriteEnemyNodriza.create(game.rnd.between(ancho+50, ancho+100), game.rnd.between(0, alto-50), 'naveNodriza');
    nodr.anchor.setTo(0.5,0.5);   
    var avanz = SpriteEnemyAvanz.create(game.rnd.between(ancho+50, ancho+100), game.rnd.between(0, alto-50), 'naveAvanzada');
    avanz.anchor.setTo(0.5,0.5);
    
    for(var j=0;j<enemigoExplorador;j++){
        var exp = SpriteEnemiesExp.create(game.rnd.between(ancho+50, ancho+100), game.rnd.between(0, alto-50), 'naveExploradora');
        exp.anchor.setTo(0.5,0.5);
    }
}

function probabilidadExito(){
    var disparosNave = vidaEnemigo/nave.dañoArmaBase;
    var disparosEnemigos = (nave.vida+nave.escudo)/dañoEnemigo;
    if (disparosEnemigos<=disparosNave){
        alertify.error("SE VA O LO MATAN");
        return false;
    }
    return true;
}

function agregarNaveDefensa(){
    game.renderer.clearBeforeRender = false;
    game.renderer.roundPixels = true;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    weapon = game.add.weapon(1, 'bala1');
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 400;

    weaponEnemigo = game.add.weapon(15, 'bala1');
    weaponEnemigo.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS; 
    weaponEnemigo.bulletSpeed = 400;
    weaponEnemigo.fireRate = 60;

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
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        var sonidoDisparo = game.add.audio('disparo');
        sonidoDisparo.addMarker('inicioDisparo', 0, 13);
        sonidoDisparo.play("inicioDisparo");
        weapon.fire();
    }
    if(enemigoAtacando){
        switch (enemigoAtacando){
            case "nodriza":
                SpriteEnemyNodriza.hash[0].rotation = game.physics.arcade.angleBetween(sprite,SpriteEnemyNodriza.hash[0]);
                sprite.rotation = game.physics.arcade.angleBetween(sprite,SpriteEnemyNodriza.hash[0]);
                break;
            case "avanzada":
                SpriteEnemyAvanz.hash[0].rotation = game.physics.arcade.angleBetween(sprite,SpriteEnemyAvanz.hash[0]);
                sprite.rotation = game.physics.arcade.angleBetween(sprite,SpriteEnemyAvanz.hash[0]);
                break;
            case "exploradores":
                SpriteEnemiesExp.hash.forEach(function(enemigo){
                    enemigo.rotation = game.physics.arcade.angleBetween(sprite,enemigo);  
                });
                sprite.rotation = game.physics.arcade.angleBetween(sprite,SpriteEnemiesExp.hash[0]);
                break;
        }
    }
    game.physics.arcade.overlap(weapon.bullets, SpriteEnemyAvanz, collAvz, null, this);
    game.physics.arcade.overlap(weapon.bullets, SpriteEnemyNodriza, collNod, null, this);
    game.physics.arcade.overlap(weapon.bullets, SpriteEnemiesExp, collExp, null, this);
    disparosEnemigosExploradores.forEach(function(wEnemigo){
        game.physics.arcade.overlap(wEnemigo.bullets, sprite, collNave, null, this);
    });
    
}

function disparoDeEnemigo(spriteEmenigo){

    switch (enemigoAtacando){
        case "nodriza":
            weaponEnemigo.trackSprite(SpriteEnemyNodriza.hash[0], 0, 0, true);
        break;
        case "avanzada":
            weaponEnemigo.trackSprite(SpriteEnemyAvanz.hash[0],0,0,true);
        break;
        case "exploradores":
            weaponEnemigo = game.add.weapon(1, 'bala1');
            weaponEnemigo.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS; 
            weaponEnemigo.bulletSpeed = 400;                
            weaponEnemigo.trackSprite(spriteEmenigo, 0, 0, true);
            
        break;
    }
    weaponEnemigo.fireAtXY(100,300);
    disparosEnemigosExploradores.push(weaponEnemigo);
}

function enemigoFueEliminado(){
    vidaEnemigo -= nave.dañoArmaBase;
    if(vidaEnemigo<=0){
        alertify.success("Enemigo Eliminado");
        return true;
    }
    return false;
}

function collAvz(bullet, enemies) {
    efectoExplosion(SpriteEnemyAvanz.hash[0]);
    colision(bullet);
    if(enemigoFueEliminado()){
        SpriteEnemyAvanz.kill;
    }
}

function collNod(bullet, enemies) {
    efectoExplosion(SpriteEnemyNodriza.hash[0]);
    colision(bullet);
    if(enemigoFueEliminado()){
        SpriteEnemyNodriza.kill;
    }
}

function collExp(bullet, enemies) {
    SpriteEnemiesExp.hash.forEach(function(enemigo){
        efectoExplosion(enemigo);
    });
    colision(bullet);
    if(enemigoFueEliminado()){
        SpriteEnemiesExp.kill;
    }
}

function collNave(enemies, bullet) {
    efectoExplosion(sprite);
    colision(bullet);

}

function efectoExplosion(sprite){
    explosion = game.add.sprite(sprite.position.x+20, sprite.position.y, 'gifExplosion');
    explosion.width = 100;
    explosion.height = 100;
    explosion.anchor.setTo(0.5, 0.5);
    explosion.animations.add('giro');
    explosion.animations.play('giro', 10, true);
    gifExplosion.push(explosion);
    game.time.events.add(Phaser.Timer.SECOND * 2, destroyExplosion, this);
}

function destroyExplosion(){
    gifExplosion.forEach(function(explosion){
        explosion.kill();
    });
    gifExplosion=[];
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