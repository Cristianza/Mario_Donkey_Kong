var juego = new Phaser.Game(650, 700, Phaser.CANVAS, 'bloque_juego');
var barriles;
var plataformas;
var monedas;
var plataforma;
var personaje;
var mario;
var facing;
var moneda;
var coinsText;
var quantCoins = 0;
var princesa;
var inicio;
function myFunction(barril) {
	if (barril.body.touching.left){
		barril.body.velocity.x = 150;
	}
	else{
		if(barril.body.touching.right){
			barril.body.velocity.x = -150;
		}
		else{
			if(barril.body.touching.down && barril.body.velocity.x == 0){
				barril.body.velocity.x = 150;
			}
		}
	}
}
function collectCoin(mario, moneda) {
	moneda.kill();
	coinsText.text = 'Coins: ' + (++quantCoins);
	var snd = juego.add.audio('moneda');
	snd.play();	
}

function finishGame() {
	reset();
	juego.state.start('lose');
	
	location.href='Perder.html';
}
function winsTheGame() {
	if (quantCoins >= 10) {
		reset();
		juego.state.start('win');
		location.href='Ganar.html';
	}	
}
function reset() {
	quantCoins = 0;
	monedas.kill();	
	barriles.kill();	
	//clearInterval(barrelsInterval); // stops launching barrels
	//clearInterval(focus);
	//clearInterval(donkeyInterval);
}
function myFunction2(){
	var c = Math.random();
	if (c <= 0.3){
		var s = 0;
	    for(var i = 0; i < 4; i++){
		    barril = barriles.create(s, 0, 'b');
            barril.animations.add('rodar', [0,1,2,3,4,5,7], 8, true);
	        barril.animations.play('rodar');
            barril.body.collideWorldBounds = false;
            barril.body.gravity.y = 200;
            s = s + 100;
	    }
	}
	else{
		if(c > 0.3 && c < 0.6){
			var s = 100;
	        for(var i = 0; i < 4; i++){
		        barril = barriles.create(s, 0, 'b');
                barril.animations.add('rodar', [0,1,2,3,4,5,7], 8, true);
	            barril.animations.play('rodar');
                barril.body.collideWorldBounds = false;
                barril.body.gravity.y = 200;
                s = s + 100;
	        }
		}
		else{
			var s = 180;
	        for(var i = 0; i < 4; i++){
		        barril = barriles.create(s, 0, 'b');
                barril.animations.add('rodar', [0,1,2,3,4,5,7], 8, true);
	            barril.animations.play('rodar');
                barril.body.collideWorldBounds = false;
                barril.body.gravity.y = 200;
                s = s + 100;
	        }
		}
	}
}
var cursores;
var estadoprincipal = {
	preload: function(){
		juego.stage.backgroundColor = "#000";
		juego.load.image('plataforma', 'imgs/Captura2.PNG');
		juego.load.spritesheet('moneda', 'imgs/Monedas.png', 103, 96, 6);
		juego.load.spritesheet('personaje', 'imgs/Mario.png', 139.75, 161, 8);
		juego.load.spritesheet('b', 'imgs/Barriles.png', 34, 39, 8);
		juego.load.image('fondo', 'imgs/Fondo.jpg');
		juego.load.spritesheet('Princesa', 'imgs/Princesa.png', 63.2, 99, 5);
		juego.load.audio('salto', 'Sonidos/Salto.mp3');
		juego.load.audio('moneda', 'Sonidos/Moneda.mp3');
		juego.load.audio('pierde', 'Sonidos/Pierde.mp3');
		juego.load.audio('inicial', 'Sonidos/Main.mp3');
	},

	create: function(){
		//inicio = juego.add.audio("inicial");
		//inicio.play();
		juego.physics.startSystem(Phaser.Physics.ARCADE);
		juego.add.tileSprite(0,0,650,700,'fondo');

		cursores = juego.input.keyboard.createCursorKeys();
		mario = juego.add.sprite(0,660.5,'personaje');
		mario.scale.setTo(0.2);
		juego.physics.arcade.enable(mario);
		mario.body.collideWorldBounds = true;
		mario.body.gravity.y = 300;
		mario.animations.add('ci', [0,1,2,3], 8, true);
		mario.animations.add('cd', [4,5,6,7], 8, true);
		mario.animations.add('si', [0,1,2,3], 8, false);
		mario.animations.add('sd', [4,5,6,7], 8, false);
		mario.frame = 4;

		princesa = juego.add.sprite(530 + 45 ,140 - 55, 'Princesa');
		princesa.scale.setTo(0.5);
		juego.physics.arcade.enable(princesa);
	    princesa.enableBody = true;
	    princesa.body.immovable = true;
		princesa.body.collideWorldBounds = true;
		princesa.animations.add('ai', [0,1,2,3,4], 5, true);
		princesa.animations.play('ai');






		monedas = juego.add.group(); 
		monedas.enableBody = true;

		barriles = juego.add.group();
		barriles.enableBody = true;

		plataformas = juego.add.group();
		plataformas.enableBody = true;
		

		var y = 620;
		var x;


		juego.physics.enable( [ barriles, plataformas], Phaser.Physics.ARCADE);


		for(var i = 0; i < 6; i++){
			if (y == 220 | y == 460){
				x = 70;
			}
			else{
				if(y == 620 | y == 380){
					x = 0;
				}
			}
			if (y != 540 && y != 300){
				for(var j = 0; j < 3; j++){
					if (y != 460 | x != 260){
						plataforma = plataformas.create(x, y, 'plataforma');
						plataforma.body.immovable = true;
					}
					if ((x != 260 | y != 460) && (x != 265 | y != 620) && (y != 380) && (y != 220 | x != 260)){
						moneda = monedas.create(x +45, y - 35, 'moneda');
		                moneda.scale.setTo(0.3);
		                moneda.animations.add('right', [0,1,2,3,4,5], 6, true);
		                moneda.animations.play('right');

					}
					if(y == 220 | y == 460){
						x = x + 190;
					}
					else{
						if(y == 620 | y == 380){
							x = x + 265;
						}
					}
			    }
			}
			y = y - 80;
		}
		y = 540;
		for(var i = 0; i < 2; i++){
			x = 165;
			for(var j = 0; j < 2; j++){
			    plataforma = plataformas.create(x, y, 'plataforma');
			    plataforma.body.immovable = true;
			    moneda = monedas.create(x +45, y - 35, 'moneda');
		        moneda.scale.setTo(0.3);
		        moneda.animations.add('right', [0,1,2,3,4,5], 6, true);
		        moneda.animations.play('right');
			    x = x + 205;
		    }
		    y = 300;
		}
		plataforma = plataformas.create(530, 140, 'plataforma');
		plataforma.body.immovable = true;
		setInterval(myFunction2, 3000);
		plataforma = plataformas.create(0,699, 'plataforma');
		plataforma.width = 700;
		plataforma.height = 1;
		plataforma.body.immovable = true;

		var s = 100;
	    for(var i = 0; i < 4; i++){
            barril = barriles.create(s, 0, 'b');
            barril.animations.add('rodar', [0,1,2,3,4,5,7], 8, true);
	        barril.animations.play('rodar');
            barril.body.collideWorldBounds = false;
            barril.body.gravity.y = 200;
            s = s + 100;
        }
        coinsText = juego.add.text(16, 16, 'Monedas: 0', {
			fontSize: '26px',
			fill: '#000',
			stroke: '#fff',
			strokeThickness: 3
		});
    },
	update: function(){
		juego.physics.arcade.collide(barriles, plataformas, myFunction);
		juego.physics.arcade.collide(barriles, barriles, myFunction);
		juego.physics.arcade.overlap(mario, monedas, collectCoin, null, this);
		juego.physics.arcade.collide(mario, barriles, finishGame);
		juego.physics.arcade.collide(mario, princesa, winsTheGame);

		var hitsPlatform = juego.physics.arcade.collide(mario, plataformas);
		mario.body.velocity.x = 0;

		if (cursores.left.isDown) {
			mario.body.velocity.x = -180;
			if (facing != 'left') {
				if (mario.body.touching.down && (hitsPlatform )) {
					mario.animations.play('ci');
				} else {
					mario.animations.play("si");
				}
				facing = 'left';
			}
		} else if (cursores.right.isDown) {
			mario.body.velocity.x = 180;
			if (facing != 'right') {
				if (mario.body.touching.down && (hitsPlatform)) {
					mario.animations.play('cd');
				} else {
					mario.animations.play("sd");
				}
				facing = 'right';
			}
		} else {
			mario.animations.stop();
			if (facing != 'idle') {
				if (facing == 'left') {
					mario.frame = 1;
				} else {
					mario.frame = 4;
				}
				facing = 'idle';
			}
		}

		if (cursores.up.isDown && mario.body.touching.down && (hitsPlatform)) {
			var snd = juego.add.audio("salto");
			//snd.volume = 0.2;
			snd.play();
			if (cursores.left.isDown) {
				mario.animations.play("si");
			}
			if (cursores.right.isDown) {
				mario.animations.play("sd");
			}
			mario.body.velocity.y = -230;
		}
	}
};
juego.state.add('Principal', estadoprincipal);
juego.state.start('Principal');