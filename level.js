function level(){
	this.exitgame = false;
	this.windcount = 0;
	
	this.windframe = 0;
	windArray = [];
	Textures.load("./sprites/wind/new wind/wind1.png");
	Textures.load("./sprites/wind/new wind/wind2.png");
	Textures.load("./sprites/wind/new wind/wind3.png");
	windArray.push("./sprites/wind/new wind/wind1.png");
	windArray.push("./sprites/wind/new wind/wind2.png");
	windArray.push("./sprites/wind/new wind/wind3.png");
	this.windArray = windArray;

	this.levelmusic = Sounds.load("./Music/Tutorial.mp3");
	this.levelmusic.loop = true;

	this.gamebodies = [];
	this.gamesprites = [];
	this.change = true;
	this.levelnumber=0;

	this.meteorfalling=true;
	this.meteorcount=0;
	this.meteormax=2;
	var enemieslist = [];
	this.enemieslist = enemieslist;
	var tokill = [];
	this.tokill = tokill;
	
	var starlist = [];
	this.starlist = starlist;
	var tokillstar = [];
	this.tokillstar = tokillstar;
	
	var meteorlist = [];
	this.meteorlist = meteorlist;
	var tokillmeteor = [];
	this.tokillmeteor = tokillmeteor;
	
	var breakablelist = [];
	this.breakablelist = breakablelist;
	var tokillbreakable = [];
	this.tokillbreakable = tokillbreakable;
	
	this.enemyframe = 0;
	enemyArray = [];
	Textures.load("./sprites/beetle/ani/beetles - ani -1.png");
	Textures.load("./sprites/beetle/ani/beetles - ani -2.png");
	Textures.load("./sprites/beetle/ani/beetles - ani -3.png");
	Textures.load("./sprites/beetle/ani/beetles - ani -4.png");
	enemyArray.push("./sprites/beetle/ani/beetles - ani -1.png");
	enemyArray.push("./sprites/beetle/ani/beetles - ani -2.png");
	enemyArray.push("./sprites/beetle/ani/beetles - ani -3.png");
	enemyArray.push("./sprites/beetle/ani/beetles - ani -4.png");
	this.enemyArray = enemyArray;
	this.enemycount = 0;
	
	var cover = new Sprite();
	cover.x = -800;
	cover.y = 0;
	cover.width = 800;
	cover.height = 600;
	cover.image = Textures.load("./sprites/blackcover.png");
	this.cover = cover;
	
}

level.prototype.boulderSpawn = function(radius,xposition,yposition){
var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_staticBody;
	bodyDef.userData = 'breakable';
	bodyDef.position.Set(xposition,yposition);
var fixtureDef = new b2FixtureDef;
	fixtureDef.shape = new b2CircleShape(radius);
	fixtureDef.density = 1.0;
	fixtureDef.friction = 0.5;
	fixtureDef.restitution = 0.0;
var body=physics.CreateBody(bodyDef);
	body.CreateFixture(fixtureDef);
	this.breakablelist.push(body);
	body.sprite = new Sprite();
	body.sprite.height = 100;
	body.sprite.width = 100;
	body.sprite.x = body.GetPosition.x/SCALE;
	body.sprite.y = body.GetPosition.y/SCALE;
	body.sprite.xoffset = -50;
	body.sprite.yoffset = -50;
	world.addChild(body.sprite);
	body.sprite.image = Textures.load("./sprites/cracked boulder.png");
	this.gamebodies.push(body);
	this.gamesprites.push(body.sprite);
	
	body.sprite.update = function(d){
		var pos = body.GetPosition();
		body.sprite.x = pos.x*SCALE;
		body.sprite.y = pos.y*SCALE;
	}
}

level.prototype.killbreakable = function(){
	if(this.tokillbreakable.length > 0){
		for(var i = 0; i<this.tokillbreakable.length; i++){
			world.removeChild(this.tokillbreakable[i].sprite);
			physics.DestroyBody(this.tokillbreakable[i]);
		}
	}
	this.tokillbreakable.splice(0,this.tokillbreakable.length); //empty the to kill list
}

level.prototype.getbreakableindex = function(body){
	for(var i = 0; i < this.breakablelist.length; i++) {
		if (this.breakablelist[i] === body) return i;
    }
}

level.prototype.meteorSpawn = function(radius,xposition,yposition){
var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_dynamicBody;
	bodyDef.userData = 'meteor';
	bodyDef.position.Set(xposition,yposition);
var fixtureDef = new b2FixtureDef;
	fixtureDef.shape = new b2CircleShape(radius);
	fixtureDef.density = 1.0;
	fixtureDef.friction = 0.5;
	fixtureDef.restitution = 0.0;
var body=physics.CreateBody(bodyDef);
	body.CreateFixture(fixtureDef);
	body.SetLinearVelocity(new b2Vec2(5,10));
	this.meteorlist.push(body);

	this.meteorcount++;
	body.sprite = new Sprite();
	body.sprite.height = 50;
	body.sprite.width = 50;
	body.sprite.x = body.GetPosition.x/SCALE;
	body.sprite.y = body.GetPosition.y/SCALE;
	body.sprite.xoffset = -25;
	body.sprite.yoffset = -25;
	world.addChild(body.sprite);
	body.sprite.image = Textures.load("./sprites/metior.png");
	
	body.sprite.update = function(d){
		var pos = body.GetPosition();
		body.sprite.x = pos.x*SCALE;
		body.sprite.y = pos.y*SCALE;
	}
}

level.prototype.meteorSpawn2 = function(){
if(this.meteorfalling && this.meteorcount<this.meteormax){
this.meteorSpawn(25/SCALE, Math.floor(Math.random()*canvas.width/SCALE)+newplayer.newoffsetx/SCALE, -200/SCALE);
}
}

level.prototype.meteorSpeed = function(){
    for(var i = 0; i<this.meteorlist.length; i++){
	var b = this.meteorlist[i];
	bpos = b.GetPosition();
	if (bpos.y>(canvas.height/SCALE)){
	this.tokillmeteor.push(b);
	var meteorindex = this.getmeteorindex(b);
	this.meteorlist.splice(meteorindex,1);
	}
	var v = b.GetLinearVelocity();
	if(v.y > 8)
		v.y = 8;
	}
}
level.prototype.killmeteor = function(){
	if(this.tokillmeteor.length > 0){
		for(var i = 0; i<this.tokillmeteor.length; i++){
			world.removeChild(this.tokillmeteor[i].sprite);
			physics.DestroyBody(this.tokillmeteor[i]);
			this.meteorcount--;
		}
	}
	this.tokillmeteor.splice(0,this.tokillmeteor.length); //empty the to kill list
}

level.prototype.getmeteorindex = function(body){
	for(var i = 0; i < this.meteorlist.length; i++) {
		if (this.meteorlist[i] === body) return i;
    }
}

	
level.prototype.worldSpawn = function(width,height,xposition,yposition){
var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_staticBody;
	bodyDef.userData = 'wall';
	bodyDef.position.Set(xposition,yposition);
var fixtureDef = new b2FixtureDef;
	fixtureDef.shape = new b2PolygonShape;
	fixtureDef.shape.SetAsBox(width,height);
	fixtureDef.density = 1.0;
	fixtureDef.friction = 0.5;
	fixtureDef.restitution = 0.1;
var body=physics.CreateBody(bodyDef);
	body.CreateFixture(fixtureDef);
	this.gamebodies.push(body);
}

level.prototype.enemySpawn = function(xposition,yposition,direction,countmax){
var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_dynamicBody;
	bodyDef.fixedRotation = true;
	bodyDef.userData = 'enemy';
	bodyDef.position.Set(xposition,yposition);
var fixtureDef = new b2FixtureDef;
	fixtureDef.shape = new b2PolygonShape;
	fixtureDef.shape.SetAsBox(50/SCALE/2,50/SCALE/2);
	fixtureDef.density = 1.0;
	fixtureDef.friction = 0.5;
	fixtureDef.restitution = 0.0;
var body=physics.CreateBody(bodyDef);
	body.CreateFixture(fixtureDef);
	body.count = 0;
	body.countmax = countmax;
	body.direction = direction;
	this.enemieslist.push(body);
	this.gamebodies.push(body);
	
	body.sprite = new Sprite();
	body.sprite.height = 100;
	body.sprite.width = 100;
	body.sprite.x = body.GetPosition.x*SCALE;
	body.sprite.y = body.GetPosition.y*SCALE;
	body.sprite.xoffset = -50;
	body.sprite.yoffset = -50;
	body.sprite.count = 0;
	body.sprite.framenum = 0;
	body.sprite.image = Textures.load("./sprites/beetle/beetles - Copy2.png");
	world.addChild(body.sprite);
	this.gamesprites.push(body.sprite);
	
	var levelthis = this;
	
	body.sprite.update = function(d){
	
		this.count++;
		if(this.count == 8){
			this.image = Textures.load(levelthis.enemyArray[this.framenum]);
			this.framenum++;
			if(this.framenum >2)
				this.framenum = 0;
			this.count = 0;
		}

	
		var pos = body.GetPosition();
		body.sprite.x = pos.x*SCALE;
		body.sprite.y = pos.y*SCALE;
		if(body.direction == "right")
			this.scaleX = -1;
		else
			this.scaleX = 1;
	}
}

level.prototype.kill = function(){
	if(this.tokill.length > 0){
		for(var i = 0; i<this.tokill.length; i++){
			world.removeChild(this.tokill[i].sprite);
			physics.DestroyBody(this.tokill[i]);
		}
	}
	this.tokill.splice(0,this.tokill.length); //empty the to kill list
}

level.prototype.getindex = function(body){
	for(var i = 0; i < this.enemieslist.length; i++) {
		if (this.enemieslist[i] === body) return i;
    }
}

level.prototype.move = function(){
	for(var i = 0; i<this.enemieslist.length; i++){
		
		var b = this.enemieslist[i];
		var v = b.GetLinearVelocity();
		b.count++;
		if (b.count == b.countmax){
			if(b.direction == "right") b.direction = "left";
			else b.direction = "right";
			b.count = 0;
			}	
		if (b.direction == "right"){
			v.Add(new b2Vec2(2,0));
			if(v.x > 4)v.x = 4;
		}
		if (b.direction == "left"){
			v.Add(new b2Vec2(-2,0));
			if(v.x<-4)v.x = -4;
		}		
	}
}

level.prototype.starSpawn = function(xposition,yposition){
	var starDef = new b2BodyDef;
	starDef.type = b2Body.b2_staticBody;
	starDef.fixedRotation = true;
	starDef.position.Set(xposition, yposition);
	starDef.userData = 'star';
var starfixtureDef = new b2FixtureDef;
	starfixtureDef.shape = new b2PolygonShape;
	starfixtureDef.shape.SetAsBox(50/SCALE/2,50/SCALE/2);
	starfixtureDef.density = 1.0;
	starfixtureDef.friction = 0.5;
	starfixtureDef.restitution = 0.0;
	starfixtureDef.isSensor = true;
var star=physics.CreateBody(starDef);
	star.sprite = new Sprite();
	star.sprite.height = 30;
	star.sprite.width = 30;
	star.sprite.x = star.GetPosition().x * SCALE;
	star.sprite.y = star.GetPosition().y * SCALE;
	star.sprite.xoffset = -15;
	star.sprite.yoffset = -15;
	world.addChild(star.sprite);
	star.sprite.image = Textures.load("./sprites/heart.png");
	star.CreateFixture(starfixtureDef);
	this.starlist.push(star);
	this.gamebodies.push(star);
	this.gamesprites.push(star.sprite);
	
}

level.prototype.killstar = function(){
	if(this.tokillstar.length > 0){
		for(var i = 0; i<this.tokillstar.length; i++){
			world.removeChild(this.tokillstar[i].sprite);
			physics.DestroyBody(this.tokillstar[i]);
		}
	}
	this.tokillstar.splice(0,this.tokillstar.length); //empty the to kill list
}

level.prototype.stargetindex = function(body){
	for(var i = 0; i < this.starlist.length; i++) {
		if (this.starlist[i] === body) return i;
    }
}

level.prototype.windSpawn = function(width,height,xposition,yposition){
	var windDef = new b2BodyDef;
	windDef.type = b2Body.b2_staticBody;
	windDef.position.Set(xposition, yposition);
	windDef.userData = 'wind';
var windfixtureDef = new b2FixtureDef;
	windfixtureDef.shape = new b2PolygonShape;
	windfixtureDef.shape.SetAsBox(width, height);
	windfixtureDef.density = 1.0;
	windfixtureDef.friction = 0.5;
	windfixtureDef.restitution = 0.0;
	windfixtureDef.isSensor = true;
var wind=physics.CreateBody(windDef);
	wind.CreateFixture(windfixtureDef);
	this.gamebodies.push(wind);
	
	wind.sprite = new Sprite();
	wind.sprite.width = width * SCALE * 2;
	wind.sprite.height = height * SCALE * 2;
	wind.sprite.x = xposition * SCALE;
	wind.sprite.y = yposition * SCALE;
	wind.sprite.index = 4;
	wind.sprite.alpha = 0.5;
	//wind.sprite.tilesY = 3;
	wind.sprite.tilesX = Math.floor(wind.sprite.width/100);
	wind.sprite.xoffset = -width*SCALE;
	wind.sprite.yoffset = -height*SCALE;
	wind.sprite.count = 0;
	wind.sprite.framenum = 0;
	world.addChild(wind.sprite);
	wind.sprite.image = Textures.load("./sprites/wind/new wind/wind1.png");
	this.gamesprites.push(wind.sprite);
	
	var levelthis = this;
	
	wind.sprite.update = function(d){
		this.count++;
		if(this.count == 8){
			this.image = Textures.load(levelthis.windArray[this.framenum]);
			this.framenum++;
			if(this.framenum >2)
				this.framenum = 0;
			this.count = 0;
		}
	}
	
}

level.prototype.windani = function(sprite){
	sprite.image = Textures.load(this.windArray[this.windframe]);
	this.windframe++;
	if(this.windframe >2)
		this.windframe = 0;
}

level.prototype.tinySpawn = function(width,height,xposition,yposition){
	var tinycheckDef = new b2BodyDef;
	tinycheckDef.type = b2Body.b2_staticBody;
	tinycheckDef.position.Set(xposition, yposition);
	tinycheckDef.userData = 'tinycheck';
var tinycheckfixtureDef = new b2FixtureDef;
	tinycheckfixtureDef.shape = new b2PolygonShape;
	tinycheckfixtureDef.shape.SetAsBox(width, height);
	tinycheckfixtureDef.density = 1.0;
	tinycheckfixtureDef.friction = 0.5;
	tinycheckfixtureDef.restitution = 0.0;
	tinycheckfixtureDef.isSensor = true;
var tinycheck=physics.CreateBody(tinycheckDef);
	tinycheck.CreateFixture(tinycheckfixtureDef);
	this.gamebodies.push(tinycheck);

}


level.prototype.endSpawn = function(width,height,xposition,yposition){
	var endDef = new b2BodyDef;
	endDef.type = b2Body.b2_staticBody;
	endDef.position.Set(xposition, yposition);
	endDef.userData = 'end';
var endfixtureDef = new b2FixtureDef;
	endfixtureDef.shape = new b2PolygonShape;
	endfixtureDef.shape.SetAsBox(width, height);
	endfixtureDef.density = 1.0;
	endfixtureDef.friction = 0.5;
	endfixtureDef.restitution = 0.0;
	endfixtureDef.isSensor = true;
var end=physics.CreateBody(endDef);
	end.CreateFixture(endfixtureDef);
	this.gamebodies.push(end);
}
level.prototype.checkSpawn = function(width,height,xposition,yposition){
	var checkDef = new b2BodyDef;
	checkDef.type = b2Body.b2_staticBody;
	checkDef.position.Set(xposition, yposition);
	checkDef.userData = 'check';
var checkfixtureDef = new b2FixtureDef;
	checkfixtureDef.shape = new b2PolygonShape;
	checkfixtureDef.shape.SetAsBox(width, height);
	checkfixtureDef.density = 1.0;
	checkfixtureDef.friction = 0.5;
	checkfixtureDef.restitution = 0.0;
	checkfixtureDef.isSensor = true;
var check=physics.CreateBody(checkDef);
	check.CreateFixture(checkfixtureDef);
	this.gamebodies.push(check);
}

level.prototype.destroyLevel = function(){
		for(var i = 0; i < this.gamebodies.length; i++){
			physics.DestroyBody(this.gamebodies[i]);
			}
		for(var i = 0; i < this.gamesprites.length; i++){
			world.removeChild(this.gamesprites[i]);
		}
	if(newplayer.lives<1 && this.levelnumber==0){
	this.createLevel0();
	this.levelnumber=0;
	}
	 else if(newplayer.lives<1 && this.levelnumber==1){
	this.createLevelOne();
	this.levelnumber=1;
	}
	else if(newplayer.lives<1 && this.levelnumber==2){
	this.createLevelTwo();
	this.levelnumber=2;
	}
	else if(this.levelnumber ==0){
	level.createLevelOne();
	this.levelnumber++;
	}else if(this.levelnumber == 1){
	level.createLevelTwo();
	this.levelnumber++;
	}
	else if(this.levelnumber==2){
	alert("You Win");
	this.levelnumber=0;
	level.createLevel0();
	}
}


level.prototype.createLevel0=function(){

this.levelmusic.pause();
this.levelmusic = Sounds.load("./Music/Tutorial.mp3");
this.levelmusic.loop = true;
this.levelmusic.play();

world.addChild(this.cover);
this.gamesprites.push(this.cover);

var levelzerosprite = new Sprite()
levelzerosprite.x = 0;
levelzerosprite.y = 0;
levelzerosprite.index = -5;
levelzerosprite.width = 6878;
levelzerosprite.height = 600;
levelzerosprite.image = Textures.load("./sprites/backgrounds/tout-background-withplatforms.png");
world.addChild(levelzerosprite);
this.gamesprites.push(levelzerosprite);


this.worldSpawn(2200 / SCALE, 10 / SCALE / 2, canvas.width /SCALE+30, 0);
this.worldSpawn(1000 / SCALE, 10 / SCALE / 2, canvas.width / 2 / 40, canvas.height / SCALE);
this.worldSpawn(10 / SCALE / 2, 2000 / SCALE / 2, canvas.width / 150 / SCALE, canvas.height / 200);
this.checkSpawn(100 / SCALE, canvas.height / 2/SCALE, canvas.width/SCALE+10, canvas.height / SCALE);
this.checkSpawn(100 / SCALE, canvas.height / 2/SCALE, canvas.width/SCALE+26, canvas.height / SCALE);
this.checkSpawn(100 / SCALE, canvas.height / 2/SCALE, canvas.width/SCALE+60, canvas.height / SCALE);
this.worldSpawn(300 / SCALE, 10 / SCALE / 2, canvas.width/SCALE+26, canvas.height / SCALE);
this.worldSpawn(300 / SCALE, 10 / SCALE / 2, canvas.width/SCALE+58, canvas.height / SCALE);
this.worldSpawn(300 / SCALE, 10 / SCALE / 2, canvas.width/SCALE+98, canvas.height / SCALE);
this.windSpawn(500 / SCALE / 2, 600 / SCALE / 2, canvas.width/SCALE+80, canvas.height / SCALE);
this.boulderSpawn(50/SCALE, canvas.width/SCALE+100, 18.1);
this.worldSpawn(300 / SCALE, canvas.height / 4/SCALE+1, canvas.width/SCALE+110, canvas.height/2 / SCALE);
this.worldSpawn(200 / SCALE, canvas.height / 4/SCALE+3.5, canvas.width/SCALE+120, canvas.height/2 / SCALE);
this.worldSpawn(300 / SCALE, canvas.height / 6/SCALE+1, canvas.width/SCALE+110, canvas.height/2 / SCALE-7.2);
this.worldSpawn(200 / SCALE, canvas.height / 6/SCALE+3.5, canvas.width/SCALE+120, canvas.height/2 / SCALE-4.2);
this.worldSpawn(300 / SCALE, 10 / SCALE / 2, canvas.width/SCALE+115, canvas.height / SCALE);
this.worldSpawn(300 / SCALE + 20, 10 / SCALE / 2, canvas.width/SCALE+135 +10, canvas.height / SCALE);
this.enemySpawn(canvas.width/SCALE+110,18,"left", 150);
//this.worldSpawn(300 / SCALE, 10 / SCALE / 2, canvas.width/SCALE+155, canvas.height / SCALE);
this.starSpawn (canvas.width/SCALE+135, canvas.height / SCALE-1.5);
this.checkSpawn (50/SCALE,50/SCALE,canvas.width/SCALE+127, canvas.height / SCALE-1.5);
this.endSpawn(100 / SCALE, canvas.height / 2/SCALE, canvas.width/SCALE+155, canvas.height / SCALE);
this.tinySpawn(16/2,50/SCALE/2,153,19);

}

level.prototype.createLevelOne = function(){
this.levelmusic.pause();
this.levelmusic = Sounds.load("./Music/Level One.mp3");
this.levelmusic.loop = true;
this.levelmusic.play();

world.addChild(this.cover);
this.gamesprites.push(this.cover);

var levelonesprite = new Sprite();
levelonesprite.x = 0;
levelonesprite.y = 0;
levelonesprite.width = canvas.width*20;
levelonesprite.height = 600;
levelonesprite.index = -5;
levelonesprite.image = Textures.load("./sprites/backgrounds/level1-final.png");
world.addChild(levelonesprite);
this.gamesprites.push(levelonesprite);

this.worldSpawn(1000 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / 40, canvas.height / SCALE); //Floor chunk one. Ends at sixth block chunk.
this.worldSpawn(10 / SCALE / 2, 2000 / SCALE / 2, canvas.width / 150 / SCALE, canvas.height / 200); //Left bounding wall.
this.worldSpawn(540 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 /SCALE - (450 / SCALE  / 2), (canvas.height / 50)); // Platform one.
this.worldSpawn(200 / SCALE / 2, 75 / SCALE / 2, canvas.width / 2 / SCALE - (800 / SCALE / 2), (canvas.height / 56)); // Platform block one.
this.starSpawn (3, 8);
this.worldSpawn(2*(100 / SCALE / 2), 150 / SCALE / 2, canvas.width / 2 / SCALE + (300 / SCALE / 2), canvas.height / SCALE); //First block chunk.
this.worldSpawn(2*(100 / SCALE / 2), 300 / SCALE / 2, canvas.width / 1.6 / SCALE + (450 / SCALE / 2), canvas.height / SCALE); //Second block chunk.
this.worldSpawn(4*(100 / SCALE / 2), 450 / SCALE / 2, canvas.height / SCALE + (1100 / SCALE / 2), canvas.height / SCALE); //Third block chunk.
this.worldSpawn(2*(100 / SCALE / 2), 300 / SCALE / 2, canvas.width / 1.6 / SCALE + (1650 / SCALE / 2), canvas.height / SCALE); //Fifth block chunk.
this.worldSpawn(2*(100 / SCALE / 2), 150 / SCALE / 2, canvas.width / 2 / SCALE + (2250 / SCALE / 2), canvas.height / SCALE); //Sixth block chunk.
this.worldSpawn(500 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / 40 + (3000 / SCALE / 2), canvas.height / SCALE); //Floor chunk two. Starts at sixth block chunk.
this.worldSpawn(200 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / SCALE + (3640 / SCALE / 2), (canvas.height / 35)); // Platform one.
this.worldSpawn(200 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / SCALE + (4460 / SCALE / 2), (canvas.height / 35)); // Platform two.
this.worldSpawn(200 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / SCALE + (5280 / SCALE / 2), (canvas.height / 35)); // Platform three.
this.worldSpawn(500 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / 40 + (6295 / SCALE / 2), canvas.height / SCALE); //Floor chunk three. Starts after platform three.
this.worldSpawn(2000 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / 40 + (8295 / SCALE / 2), canvas.height / SCALE - (1200 / SCALE / 2)); //Cieling.
this.worldSpawn((100 / SCALE / 2), 150 / SCALE / 2, canvas.width / 2 / SCALE + (6295 / SCALE / 2), canvas.height / SCALE); //Seventh block chunk.
this.worldSpawn((100 / SCALE / 2), 2*(150 / SCALE / 2), canvas.width / 2 / SCALE + (6495 / SCALE / 2), canvas.height / SCALE); //Eighth block chunk.
this.worldSpawn((100 / SCALE / 2), 3*(150 / SCALE / 2), canvas.width / 2 / SCALE + (6695 / SCALE / 2), canvas.height / SCALE); //Ninth block chunk.
this.worldSpawn((100 / SCALE / 2), 4*(150 / SCALE / 2), canvas.width / 2 / SCALE + (6895 / SCALE / 2), canvas.height / SCALE); //Tenth block chunk.
this.worldSpawn((100 / SCALE / 2), 5*(150 / SCALE / 2), canvas.width / 2 / SCALE + (7095 / SCALE / 2), canvas.height / SCALE); //Eleventh block chunk.
this.worldSpawn((100 / SCALE / 2), 6*(150 / SCALE / 2), canvas.width / 2 / SCALE + (7295 / SCALE / 2), canvas.height / SCALE); //Twelfth block chunk.
this.worldSpawn(3*(100 / SCALE / 2), 7*(150 / SCALE / 2), canvas.width / 2 / SCALE + (7695 / SCALE / 2), canvas.height / SCALE); //Fourteenth block chunk.
this.windSpawn(100 / SCALE / 2, 900 / SCALE / 2, canvas.width / 2 / SCALE + (8400 / SCALE / 2), canvas.height / SCALE); //Wind chunk one.
this.windSpawn(100 / SCALE / 2, 700 / SCALE / 2, canvas.width / 2 / SCALE + (9000 / SCALE / 2), canvas.height / SCALE); //Wind chunk two.
this.windSpawn(100 / SCALE / 2, 500 / SCALE / 2, canvas.width / 2 / SCALE + (9600 / SCALE / 2), canvas.height / SCALE); //Wind chunk one
this.worldSpawn((500 / SCALE / 2), 10 / SCALE / 2, canvas.width / 2 / SCALE + (10695 / SCALE / 2), canvas.height / SCALE); //Floor chunk four. After Ptero jump.
this.worldSpawn(3*(700 / SCALE / 2), 10 / SCALE / 2, canvas.width / 2 / SCALE + (14300 / SCALE / 2), canvas.height / SCALE); //Floor chunk five. Raptor Jump.
this.worldSpawn(500 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / 40 + (14595 / SCALE / 2), canvas.height / SCALE); //Tiny Dino tunnel ceolings.
this.worldSpawn((800 / SCALE / 2), 500 / SCALE / 2, canvas.width / 2 / SCALE + (14050 / SCALE / 2), canvas.height / 57); //Tiny Dino tunnel chunk.
this.worldSpawn((630 / SCALE / 2), 30 / SCALE / 2, 248, .3); //Tunnel Ceiling.
this.worldSpawn((700 / SCALE / 2), 10 / SCALE / 2, 260, 0); //Tunnel Ceilingrom meteors .
this.worldSpawn((210 / SCALE / 2), 70 / SCALE / 2, 241, 2); //Platform four.
this.starSpawn (245, 1.5);
this.starSpawn (330, 4);
this.worldSpawn((250 / SCALE / 2), 350 / SCALE / 2, canvas.width / 2 / SCALE + (15000 / SCALE / 2), canvas.height / 46); //Platform four.
this.worldSpawn((150 / SCALE / 2), 10 / SCALE / 2, canvas.width / 2 / SCALE + (16700 / SCALE / 2), canvas.height / 35); //Platform four.
this.worldSpawn((150 / SCALE / 2), 10 / SCALE / 2, canvas.width / 2 / SCALE + (15700 / SCALE / 2), canvas.height / 50); //Platform four.
this.worldSpawn((150 / SCALE / 2), 10 / SCALE / 2, canvas.width / 2 / SCALE + (16200 / SCALE / 2), canvas.height / 40); //Platform four.
this.worldSpawn((150 / SCALE / 2), 10 / SCALE / 2, canvas.width / 2 / SCALE + (16700 / SCALE / 2), canvas.height / 35); //Platform four.
this.worldSpawn((150 / SCALE / 2), 10 / SCALE / 2, canvas.width / 2 / SCALE + (17200 / SCALE / 2), canvas.height / 40); //Platform five.
this.worldSpawn((150 / SCALE / 2), 10 / SCALE / 2, canvas.width / 2 / SCALE + (17700 / SCALE / 2), canvas.height / 50); //Platform six.
this.worldSpawn((150 / SCALE / 2), 10 / SCALE / 2, canvas.width / 2 / SCALE + (18200 / SCALE / 2), canvas.height / 65); //Platform four.
this.worldSpawn(3*(500 / SCALE / 2), 10 / SCALE / 2, canvas.width / 2 / SCALE + (18500 / SCALE / 2), canvas.height / SCALE); //Floor chunk 5. Second to last floor chunk.
this.worldSpawn((150 / SCALE / 2), 10 / SCALE / 2, canvas.width / 2 / SCALE + (16700 / SCALE / 2), canvas.height / 35); //Platform four.
this.worldSpawn(2*(100 / SCALE / 2), 150 / SCALE / 2, canvas.width / 2 / SCALE + (19600 / SCALE / 2), canvas.height / SCALE); //Fifteenth block chunk.
this.worldSpawn(3*(100 / SCALE / 2), 2*(150 / SCALE / 2), canvas.width / 2 / SCALE + (20450 / SCALE / 2), canvas.height / SCALE);//Sixteenth block chunk.
this.worldSpawn(2*(100 / SCALE / 2), 150 / SCALE / 2, canvas.width / 2 / SCALE + (21300 / SCALE / 2), canvas.height / SCALE);//Seventeenth block chunk.
this.worldSpawn(3*(500 / SCALE / 2), 10 / SCALE / 2, canvas.width / 2 / SCALE + (21150 / SCALE / 2), canvas.height / SCALE);//Sixth floor chunk. Jk this is second to last.
this.worldSpawn((100 / SCALE / 2), 150 / SCALE / 2, canvas.width / 2 / SCALE + (22450 / SCALE / 2), canvas.height / SCALE); //Eighteenth block chunk.
this.windSpawn(100 / SCALE / 2, 500 / SCALE / 2, canvas.width / 2 / SCALE + (22750 / SCALE / 2), canvas.height / SCALE); //Wind chunk four.
this.worldSpawn((100 / SCALE / 2), 650 / SCALE / 2, canvas.width / 2 / SCALE + (23050 / SCALE / 2), canvas.height / SCALE); //Nineteenth block chunk.
this.windSpawn(100 / SCALE / 2, 800 / SCALE / 2, canvas.width / 2 / SCALE + (23350 / SCALE / 2), canvas.height / SCALE); //Wind chunk five.
this.worldSpawn((100 / SCALE / 2), 970 / SCALE / 2, canvas.width / 2 / SCALE + (23650 / SCALE / 2), canvas.height / SCALE); //Twentieth block chunk.
this.worldSpawn(3*(500 / SCALE / 2), 10 / SCALE / 2, 410, 0);//Last Ceiling chunk.
this.windSpawn(100 / SCALE / 2, 400 / SCALE / 2, canvas.width / 2 / SCALE + (23950 / SCALE / 2), 13); //Wind chunk five.
this.windSpawn(100 / SCALE / 2, 400 / SCALE / 2, canvas.width / 2 / SCALE + (24450 / SCALE / 2), 13); //Wind chunk five.
this.windSpawn(100 / SCALE / 2, 400 / SCALE / 2, canvas.width / 2 / SCALE + (24950 / SCALE / 2), 13); //Wind chunk five.
this.worldSpawn((850 / SCALE / 2), 200 / SCALE / 2, 450, 18);//Last Ceiling chunk.
this.worldSpawn((1000 / SCALE / 2), 100 / SCALE / 2, 490, 15);//Last Ceiling chunk.
this.worldSpawn((750 / SCALE / 2), 600 / SCALE / 2, 490, 0);//Last Ceiling chunk.
this.endSpawn(150 / SCALE / 2, 700 / SCALE / 2, 505, 5); //end chunk one.
this.boulderSpawn(50/SCALE, 236, 18.1);
this.checkSpawn(2*(100 / SCALE / 2), 350 / SCALE, canvas.height / SCALE + (1100 / SCALE / 2), canvas.height / SCALE-5);
this.checkSpawn( 3*(100 / SCALE / 2), 350 / SCALE, 279, 18.1 );
this.checkSpawn( 3*(100 / SCALE / 2), 350 / SCALE, 195, 18.1 );
this.checkSpawn(3*(100 / SCALE / 2), 350 / SCALE / 2, canvas.width / 2 / SCALE + (22450 / SCALE / 2)-5, canvas.height / SCALE);
this.enemySpawn(200/SCALE, 469/SCALE,"left", 300);
this.enemySpawn(320,10,"left", 100);
this.enemySpawn(370, 10,"right", 100);
this.enemySpawn(450, 18,"right", 100);
this.enemySpawn(450, 18,"left", 100);

this.tinySpawn(36/2,50/SCALE/2,254, 19);
this.tinySpawn(17/2, 50/SCALE/2,250.5,1.7);

}


level.prototype.createLevelTwo = function(){
this.levelmusic.pause();
this.levelmusic = Sounds.load("./Music/Level One.mp3");
this.levelmusic.loop = true;
this.levelmusic.play();


newplayer.backSprite.image = Textures.load("./sprites/backgrounds/long snow (unfinished).png");

world.addChild(this.cover);
this.gamesprites.push(this.cover);

var leveltwosprite = new Sprite();
leveltwosprite.x = 0;
leveltwosprite.y = 0;
leveltwosprite.width = 18000;
leveltwosprite.height = 600;
leveltwosprite.index = -5;
leveltwosprite.image = Textures.load("./sprites/backgrounds/level2-platforms.png");
world.addChild(leveltwosprite);
this.gamesprites.push(leveltwosprite);

this.worldSpawn(750 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / 40, canvas.height / SCALE); //First floor.
	this.worldSpawn(2050 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / 40 + 25, canvas.height / SCALE - (1200 / SCALE / 2)); //Cieling.
	this.worldSpawn(782 / SCALE / 2, 100 / SCALE / 2, canvas.width / 3 / SCALE + 2, canvas.height / SCALE - (1160 / SCALE / 2)); //Lower Cieling.
	this.worldSpawn(10 / SCALE / 2, 1500 / SCALE / 2, canvas.width / 150 / SCALE, canvas.height / 200); //Left wall.
	this.worldSpawn(500 / SCALE / 2, 1000 / SCALE / 2, canvas.width / 3 / SCALE + 6.8, canvas.height / SCALE); //First chunk.
	this.worldSpawn(100 / SCALE / 2, 10 / SCALE / 2, canvas.width / 4.2 / SCALE, canvas.height / SCALE - (200 / SCALE / 2)); //First platform.
	this.worldSpawn(100 / SCALE / 2, 10 / SCALE / 2, canvas.width / 18 / SCALE, canvas.height / SCALE - (400 / SCALE / 2)); //Second platform.
	this.worldSpawn(100 / SCALE / 2, 10 / SCALE / 2, canvas.width / 4.2 / SCALE, canvas.height / SCALE - (600 / SCALE / 2)); //Third platform.
	this.worldSpawn(100 / SCALE / 2, 10 / SCALE / 2, canvas.width / 18 / SCALE, canvas.height / SCALE - (800 / SCALE / 2)); //Fourth platform.
	this.worldSpawn(100 / SCALE / 2, 10 / SCALE / 2, canvas.width / 4.2 / SCALE, canvas.height / SCALE - (990 / SCALE / 2)); //Fifth platform.
	this.worldSpawn(200 / SCALE / 2, 10 / SCALE / 2, canvas.width / 4.2 / SCALE + 24, canvas.height / SCALE - (500 / SCALE / 2)); //Sixth platform.
	this.windSpawn(100 / SCALE / 2, 200 / SCALE / 2, canvas.width / 2 / SCALE + 15.5, 8); //Wind chunk three.
    this.boulderSpawn(50/SCALE, canvas.width / 2 / SCALE + 30, 4);
	this.boulderSpawn(50/SCALE, canvas.width / 2 / SCALE + 30, 2);
	this.starSpawn (canvas.width / 2 / SCALE + 35, 4);
	this.starSpawn (canvas.width / 2 / SCALE + 57, 6);
	this.worldSpawn(600 / SCALE / 2, 10 / SCALE / 2, canvas.width / 4.2 / SCALE + 41, canvas.height / SCALE - (850 / SCALE / 2)); //Seventh platform.
	this.boulderSpawn(50/SCALE, canvas.width / 4.2 / SCALE + 90, 2);
	this.checkSpawn(50/SCALE, 50/SCALE,canvas.width / 4.2 / SCALE + 90, 5);
    this.enemySpawn(canvas.width / 4.2 / SCALE + 92, 1 ,"left", 100);
	this.boulderSpawn(50/SCALE, canvas.width / 4.2 / SCALE + 103, 2);
	this.enemySpawn(canvas.width / 4.2 / SCALE + 105, 1 ,"right", 100);
	this.worldSpawn(200 / SCALE / 2, 10 / SCALE / 2, canvas.width / 4.2 / SCALE + 34, canvas.height / SCALE - (350 / SCALE / 2));	//Eigth platform.
	this.worldSpawn(200 / SCALE / 2, 10 / SCALE / 2, canvas.width / 4.2 / SCALE + 44, canvas.height / SCALE - (200 / SCALE / 2)); //Ninth platform.
	this.worldSpawn(600 / SCALE / 2, 10 / SCALE / 2, canvas.width / 4.2 / SCALE + 62, canvas.height / SCALE - (50 / SCALE / 2)); //Tenth platform.
	this.worldSpawn(400 / SCALE / 2, 300 / SCALE / 2, canvas.width / 4.2 / SCALE + 62, canvas.height / SCALE - (425 / SCALE / 2)); //Second chunk.
	this.windSpawn(100 / SCALE / 2, 75 / SCALE / 2, canvas.width / 2 / SCALE + 68, 18); //Wind chunk one.
	this.windSpawn(100 / SCALE / 2, 75 / SCALE / 2, canvas.width / 2 / SCALE + 74, 18); //Wind chunk two.
	this.windSpawn(100 / SCALE / 2, 75 / SCALE / 2, canvas.width / 2 / SCALE + 80, 18); //Wind chunk three.
	this.worldSpawn(200 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / SCALE + 86, 16); //Tenth platform.
	this.worldSpawn(200 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / SCALE + 78, 12); //Tenth platform
	this.worldSpawn(200 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / SCALE + 70, 8); //Tenth platform.
	this.worldSpawn(900 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / SCALE + 89.7, 4); //Tenth platform.
	this.enemySpawn(canvas.width / 4.2 / SCALE + 155, 1 ,"right", 100);
	this.worldSpawn(1400 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / SCALE + 89.7, 0); //Tenth platform.
	this.worldSpawn(200 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / SCALE + 112, 4); //Tenth platform.
	this.worldSpawn(200 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / SCALE + 120, 8); //Tenth platform.
	this.worldSpawn(200 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / SCALE + 128, 12); //Tenth platform.
	this.worldSpawn(200 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / SCALE + 136, 8); //Tenth platform.
	this.worldSpawn(200 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / SCALE + 136, 16); //Tenth platform.
	this.checkSpawn(200 / SCALE / 2, 200 / SCALE / 2, canvas.width / 2 / SCALE + 136, 14);
	this.worldSpawn(200 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / SCALE + 144, 20); //Tenth platform.
	this.windSpawn(100 / SCALE / 2, 500 / SCALE / 2, canvas.width / 2 / SCALE + 150, 18); //Wind chunk three.
	this.windSpawn(100 / SCALE / 2, 500 / SCALE / 2, canvas.width / 2 / SCALE + 157, 18); //Wind chunk three.
	this.windSpawn(100 / SCALE / 2, 500 / SCALE / 2, canvas.width / 2 / SCALE + 164, 18); //Wind chunk three.
	this.starSpawn (canvas.width / 2 / SCALE + 164, 8);
	this.windSpawn(100 / SCALE / 2, 500 / SCALE / 2, canvas.width / 2 / SCALE + 171, 18); //Wind chunk three.
	this.windSpawn(100 / SCALE / 2, 500 / SCALE / 2, canvas.width / 2 / SCALE + 178, 18); //Wind chunk three.
	this.worldSpawn(200 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / SCALE + 198, 15); //Tenth platform.
	this.worldSpawn(2500 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / SCALE + 245, 20); //Tenth platform.
	this.worldSpawn(700 / SCALE / 2, 500 / SCALE / 2, canvas.width / 2 / SCALE + 235, 8); //Tenth platform.
	this.worldSpawn(200 / SCALE / 2, 100 / SCALE / 2, canvas.width / 2 / SCALE + 260, 19); //Tenth platform.
	this.worldSpawn(200 / SCALE / 2, 200 / SCALE / 2, canvas.width / 2 / SCALE + 266, 19); //Tenth platform.
	this.worldSpawn(200 / SCALE / 2, 300 / SCALE / 2, canvas.width / 2 / SCALE + 272, 19); //Tenth platform.
	this.worldSpawn(200 / SCALE / 2, 400 / SCALE / 2, canvas.width / 2 / SCALE + 278, 19); //Tenth platform.
	this.boulderSpawn(50/SCALE, canvas.width / 4.2 / SCALE + 320, 18);
	this.boulderSpawn(50/SCALE, canvas.width / 4.2 / SCALE + 323, 18);
	this.boulderSpawn(50/SCALE, canvas.width / 4.2 / SCALE + 326, 18);
	this.boulderSpawn(50/SCALE, canvas.width / 4.2 / SCALE + 329, 18);
	this.boulderSpawn(50/SCALE, canvas.width / 4.2 / SCALE + 320, 15);
	this.boulderSpawn(50/SCALE, canvas.width / 4.2 / SCALE + 323, 15);
	this.boulderSpawn(50/SCALE, canvas.width / 4.2 / SCALE + 326, 15);
	this.boulderSpawn(50/SCALE, canvas.width / 4.2 / SCALE + 329, 15);
	this.boulderSpawn(50/SCALE, canvas.width / 4.2 / SCALE + 320, 12);
	this.boulderSpawn(50/SCALE, canvas.width / 4.2 / SCALE + 323, 12);
	this.boulderSpawn(50/SCALE, canvas.width / 4.2 / SCALE + 326, 12);
	this.boulderSpawn(50/SCALE, canvas.width / 4.2 / SCALE + 329, 12);
	this.boulderSpawn(50/SCALE, canvas.width / 4.2 / SCALE + 320, 9);
	this.boulderSpawn(50/SCALE, canvas.width / 4.2 / SCALE + 323, 9);
	this.boulderSpawn(50/SCALE, canvas.width / 4.2 / SCALE + 326, 9);
	this.boulderSpawn(50/SCALE, canvas.width / 4.2 / SCALE + 329, 9);
	this.boulderSpawn(50/SCALE, canvas.width / 4.2 / SCALE + 332, 18);
	this.boulderSpawn(50/SCALE, canvas.width / 4.2 / SCALE + 332, 15);
	this.boulderSpawn(50/SCALE, canvas.width / 4.2 / SCALE + 332, 12);
	this.boulderSpawn(50/SCALE, canvas.width / 4.2 / SCALE + 332, 9);
	this.worldSpawn(2500 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / SCALE + 290, 20); //Tenth platform.
	this.worldSpawn(700 / SCALE / 2, 500 / SCALE / 2, canvas.width / 2 / SCALE + 294, 8); //Tenth platform.
	this.worldSpawn(1000 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / SCALE + 310, 0); //Tenth platform.
	this.worldSpawn(600 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / SCALE + 150, 0); //Tenth platform.
	this.worldSpawn(600 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / SCALE + 150, 4); //Tenth platform.
	this.endSpawn(150 / SCALE / 2, 800 / SCALE / 2, canvas.width / 4.2 / SCALE + 336, 18); //end chunk one.
	this.tinySpawn(21/2, 50/SCALE/2,16,2.9);
	this.tinySpawn(15/2, 50/SCALE/2,69.5,18.5);
	this.tinySpawn(50/SCALE/2, 14/2, 298,12);

}


