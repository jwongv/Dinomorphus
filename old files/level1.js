function level1(){
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
	
	var win = new Sprite();
	win.x = 470*SCALE;
	win.y = 4*SCALE;
	win.height = 100;
	win.width = 200;
	world.addChild(win);
	win.image = Textures.load("./sprites/win.png");
	
}

level1.prototype.boulderSpawn = function(radius,xposition,yposition){
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
	
	body.sprite.update = function(d){
		var pos = body.GetPosition();
		body.sprite.x = pos.x*SCALE;
		body.sprite.y = pos.y*SCALE;
	}
}

level1.prototype.killbreakable = function(){
	if(this.tokillbreakable.length > 0){
		for(var i = 0; i<this.tokillbreakable.length; i++){
			world.removeChild(this.tokillbreakable[i].sprite);
			physics.DestroyBody(this.tokillbreakable[i]);
		}
	}
	this.tokillbreakable.splice(0,this.tokillbreakable.length); //empty the to kill list
}

level1.prototype.getbreakableindex = function(body){
	for(var i = 0; i < this.breakablelist.length; i++) {
		if (this.breakablelist[i] === body) return i;
    }
}

level1.prototype.meteorSpawn = function(radius,xposition,yposition){
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
level1.prototype.meteorSpawn2 = function(){
if(this.meteorfalling && this.meteorcount<this.meteormax){
this.meteorSpawn(25/SCALE, Math.floor(Math.random()*canvas.width/SCALE)+newplayer.newoffsetx/SCALE, -100/SCALE);
}
}

level1.prototype.meteorSpeed = function(){
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
level1.prototype.killmeteor = function(){
	if(this.tokillmeteor.length > 0){
		for(var i = 0; i<this.tokillmeteor.length; i++){
			world.removeChild(this.tokillmeteor[i].sprite);
			physics.DestroyBody(this.tokillmeteor[i]);
			this.meteorcount--;
		}
	}
	this.tokillmeteor.splice(0,this.tokillmeteor.length); //empty the to kill list
}

level1.prototype.getmeteorindex = function(body){
	for(var i = 0; i < this.meteorlist.length; i++) {
		if (this.meteorlist[i] === body) return i;
    }
}

	
level1.prototype.worldSpawn = function(width,height,xposition,yposition){
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
}

level1.prototype.enemySpawn = function(xposition,yposition,direction,countmax){
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
	
	body.sprite = new Sprite();
	body.sprite.height = 50;
	body.sprite.width = 50;
	body.sprite.x = body.GetPosition.x*SCALE;
	body.sprite.y = body.GetPosition.y*SCALE;
	body.sprite.xoffset = -25;
	body.sprite.yoffset = -25;
	world.addChild(body.sprite);
	body.sprite.image = Textures.load("./sprites/beetle/beetles - Copy2.png");
	
	body.sprite.update = function(d){
		var pos = body.GetPosition();
		body.sprite.x = pos.x*SCALE;
		body.sprite.y = pos.y*SCALE;
		if(body.direction == "right")
			this.scaleX = -1;
		else
			this.scaleX = 1;
	}
}

level1.prototype.kill = function(){
	if(this.tokill.length > 0){
		for(var i = 0; i<this.tokill.length; i++){
			world.removeChild(this.tokill[i].sprite);
			physics.DestroyBody(this.tokill[i]);
		}
	}
	this.tokill.splice(0,this.tokill.length); //empty the to kill list
}

level1.prototype.getindex = function(body){
	for(var i = 0; i < this.enemieslist.length; i++) {
		if (this.enemieslist[i] === body) return i;
    }
}

level1.prototype.move = function(){
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

level1.prototype.starSpawn = function(xposition,yposition){
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
	star.sprite.height = 50;
	star.sprite.width = 50;
	star.sprite.x = star.GetPosition().x * SCALE;
	star.sprite.y = star.GetPosition().y * SCALE;
	star.sprite.xoffset = -25;
	star.sprite.yoffset = -25;
	world.addChild(star.sprite);
	star.sprite.image = Textures.load("./sprites/star2.png");
	star.CreateFixture(starfixtureDef);
	this.starlist.push(star);
	
}

level1.prototype.killstar = function(){
	if(this.tokillstar.length > 0){
		for(var i = 0; i<this.tokillstar.length; i++){
			world.removeChild(this.tokillstar[i].sprite);
			physics.DestroyBody(this.tokillstar[i]);
		}
	}
	this.tokillstar.splice(0,this.tokillstar.length); //empty the to kill list
}

level1.prototype.stargetindex = function(body){
	for(var i = 0; i < this.starlist.length; i++) {
		if (this.starlist[i] === body) return i;
    }
}

level1.prototype.windSpawn = function(width,height,xposition,yposition){
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
	
	wind.sprite = new Sprite();
	wind.sprite.width = width * SCALE * 2;
	wind.sprite.height = height * SCALE * 2;
	wind.sprite.x = xposition * SCALE;
	wind.sprite.y = yposition * SCALE;
	wind.sprite.tilesY = 3;
	wind.sprite.tilesX = 3;
	wind.sprite.xoffset = -width*SCALE;
	wind.sprite.yoffset = -height*SCALE;
	world.addChild(wind.sprite);
	wind.sprite.image = Textures.load("./sprites/wind/wind2.png");
	
}

level1.prototype.endSpawn = function(width,height,xposition,yposition){
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
}
level1.prototype.checkSpawn = function(width,height,xposition,yposition){
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
}

level1.prototype.createLevelOne = function(){
this.worldSpawn(1000 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / 40, canvas.height / SCALE); //Floor chunk one. Ends at sixth block chunk.
//this.worldSpawn(100000 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 / 40, canvas.height / SCALE - (1250 / SCALE / 2)); //Cieling chunk. 
this.worldSpawn(10 / SCALE / 2, 2000 / SCALE / 2, canvas.width / 150 / SCALE, canvas.height / 200); //Left bounding wall.
this.worldSpawn(540 / SCALE / 2, 10 / SCALE / 2, canvas.width / 2 /SCALE - (450 / SCALE  / 2), (canvas.height / 50)); // Platform one.
this.worldSpawn(200 / SCALE / 2, 75 / SCALE / 2, canvas.width / 2 / SCALE - (800 / SCALE / 2), (canvas.height / 56)); // Platform block one.
this.starSpawn (3, 8);
this.worldSpawn(2*(100 / SCALE / 2), 150 / SCALE / 2, canvas.width / 2 / SCALE + (300 / SCALE / 2), canvas.height / SCALE); //First block chunk.

var ground = new Sprite();
ground.x = canvas.width/2 + 300/2;
ground.y = canvas.height
ground.xoffset = -200/2;
ground.yoffset = -300/4;
ground.width = 200;
ground.height = 300/2;
ground.tilesX = 6;
ground.tilesY = 4;
ground.image = Textures.load("./sprites/platforms/the dirt.png");
world.addChild(ground);

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
this.worldSpawn((700 / SCALE / 2), 10 / SCALE / 2, 260, -1); //Tunnel Ceilingrom meteors .
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
//this.worldSpawn(3*(500 / SCALE / 2), 140 / SCALE / 2, canvas.width / 2 / SCALE + (26450 / SCALE / 2), canvas.height / 300);//Last floor chunk.
this.worldSpawn(3*(500 / SCALE / 2), 10 / SCALE / 2, 410, 0);//Last Ceiling chunk.
this.windSpawn(500 / SCALE / 2, 100 / SCALE / 2, canvas.width / 2 / SCALE + (24460 / SCALE / 2), 10); //Wind chunk five.
this.worldSpawn((850 / SCALE / 2), 200 / SCALE / 2, 450, 18);//Last Ceiling chunk.

this.worldSpawn((1000 / SCALE / 2), 100 / SCALE / 2, 490, 15);//Last Ceiling chunk.
this.worldSpawn((750 / SCALE / 2), 600 / SCALE / 2, 490, -1);//Last Ceiling chunk.
this.endSpawn(150 / SCALE / 2, 700 / SCALE / 2, 505, 5); //end chunk one.


this.boulderSpawn(50/SCALE, 236, 18.1);

this.checkSpawn(4*(100 / SCALE / 2), 450 / SCALE, canvas.height / SCALE + (1100 / SCALE / 2), canvas.height / SCALE);
this.checkSpawn( 4*(100 / SCALE / 2), 450 / SCALE, 234, 18.1 );




//this.worldSpawn(3*(500 / SCALE / 2), 10 / SCALE / 2, canvas.width / 2 / SCALE + (26250 / SCALE / 2), canvas.height / 110);//Last Ceiling chunk.

//this.endSpawn(100 / SCALE / 2, 900 / SCALE / 2, canvas.width / 2 / SCALE + (10695 / SCALE / 2), canvas.height / SCALE); //end chunk one.
//this.windSpawn(100,400,200,500);

this.enemySpawn(200/SCALE, 469/SCALE,"left", 300);
this.enemySpawn(320,10,"left", 100);
this.enemySpawn(370, 10,"right", 100);
this.enemySpawn(450, 18,"right", 100);
this.enemySpawn(450, 18,"left", 100);


//this.starSpawn (200/SCALE,469/SCALE);


}



