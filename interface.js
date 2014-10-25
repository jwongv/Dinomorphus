function userinterface(){

		this.lifeoffset = 30;
		this.lives = [];
		var lives = 1;
		this.paused = false;
	
		var life1 = new Sprite();
		life1.width = 25;
		life1.height = 25;
		life1.alpha = 1.0;
		life1.index = -20;
		life1.x=newplayer.sprite.x-270;
		life1.y=32;
		world.addChild(life1);
		life1.image = Textures.load("./sprites/heart.png");
		this.life1 = life1;

		var life2 = new Sprite();
		life2.width = 25;
		life2.height = 25;
		life2.alpha = 1.0;
		life2.index = -20;
		life2.x=newplayer.sprite.x-240;
		life2.y=32;
		world.addChild(life2);
		life2.image = Textures.load("./sprites/heart.png");
		this.life2 = life2;

		var life3 = new Sprite();
		life3.width = 25;
		life3.height = 25;
		life3.alpha = 1.0;
		life3.index = -20;
		life3.x=newplayer.sprite.x-210;
		life3.y=32;
		world.addChild(life3);
		life3.image = Textures.load("./sprites/heart.png");
		this.life3 = life3;
		
		var dinos = new Sprite();
		dinos.width = 300;
		dinos.height = 75;
		dinos.index = -20;
		dinos.alpha = 0.5;
		dinos.x = newplayer.sprite.x+400;
		dinos.y = 0;
		world.addChild(dinos);
		dinos.image = Textures.load("./sprites/ui/UI-2-transp.png");
		this.dinos = dinos;

		var resumeSprite = new Sprite();
		resumeSprite.x = canvas.width/2;
		resumeSprite.y = canvas.height/2;
		resumeSprite.width = 150;
		resumeSprite.height = 30;
		resumeSprite.index = -1000;
		resumeSprite.yoffset = -resumeSprite.height/2;
		resumeSprite.xoffset = -resumeSprite.width/2 + newplayer.newoffsetx;
		resumeSprite.image = Textures.load("./sprites/buttons/resumegame.png");
		this.resumeSprite = resumeSprite;
		
		resumeSprite.update = function(d){
			this.xoffset = -this.width/2 + newplayer.newoffsetx;
		}
		
		var pauseSprite = new Sprite();
		pauseSprite.x = canvas.width/2;
		pauseSprite.y = canvas.height/2;
		pauseSprite.width = 1000;
		pauseSprite.height = 600;
		pauseSprite.index = -1000;
		pauseSprite.alpha = 1;
		pauseSprite.yoffset = -pauseSprite.height/2;
		pauseSprite.xoffset = -pauseSprite.width/2 + newplayer.newoffsetx;
		pauseSprite.image = Textures.load("./sprites/bigpause.png");
		this.pauseSprite = pauseSprite;
		
		pauseSprite.update = function(d){
			this.xoffset = -this.width/2 + newplayer.newoffsetx;
		}
		

		
}

userinterface.prototype.addLife = function(){
	var newlife = new Sprite();
	newlife.count = newplayer.lives;
	newlife.width = 25;
	newlife.height = 25;
	newlife.alpha = 1.0;
	newlife.index = -20;
	newlife.x=newplayer.sprite.x-210;
	newlife.y=32;
	world.addChild(newlife);
	newlife.image = Textures.load("./sprites/heart.png");

	newlife.update = function(d){
		this.x = newplayer.sprite.x-270+(30 * (this.count -1));
		this.y = 32;
		if(newplayer.lives>=this.count) this.image = Textures.load("./sprites/heart.png");
		else this.image = null;
	}
}

userinterface.prototype.updateall = function(){
	
	this.dinos.update = function(d){
		this.x = newplayer.sprite.x+400;
		this.y = 0;
	}
	
	this.life1.update = function(d){
		this.x = newplayer.sprite.x-270;
		this.y = 32;
		if (newplayer.lives>0)this.image = Textures.load("./sprites/heart.png");
		else this.image = null;
	}
	this.life2.update = function(d){
		this.x = newplayer.sprite.x-240;
		this.y = 32;
		if (newplayer.lives>1)this.image = Textures.load("./sprites/heart.png");
		else this.image = null;
	}
	this.life3.update = function(d){
		this.x = newplayer.sprite.x-210;
		this.y = 32;
		if (newplayer.lives>2)this.image = Textures.load("./sprites/heart.png");
		else this.image = null;
	}
}
