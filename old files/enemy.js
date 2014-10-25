function enemy(){
	
	var enemieslist = [];
	this.enemieslist = enemieslist;
	var tokill = [];
	this.tokill = tokill;

}

enemy.prototype.spawn = function(){

	var enemyFix = new b2FixtureDef;
	enemyFix.density = 1.0;
	enemyFix.friction = 1;
	enemyFix.restitution = 0;
	
	var enemyBody = new b2BodyDef;
	enemyBody.fixedRotation = true;
	enemyBody.type = b2Body.b2_dynamicBody;
	enemyBody.position.x = 200 / SCALE;
	enemyBody.position.y = 469 / SCALE;
	enemyBody.userData = 'enemy';
	enemyFix.shape = new b2PolygonShape;
	enemyFix.shape.SetAsBox((50 / SCALE) / 2, (50/SCALE) / 2);
	var body = physics.CreateBody(enemyBody);
	body.CreateFixture(enemyFix);
	body.count=0;
	body.direction="left";
	this.enemieslist.push(body);
	
}

enemy.prototype.move = function(){
	for(var i = 0; i<this.enemieslist.length; i++){
		
		var b = this.enemieslist[i];
		var v = b.GetLinearVelocity();
		b.count++;
		if (b.count == 300){
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

enemy.prototype.kill = function(){
	if(this.tokill.length > 0){
		for(var i = 0; i<this.tokill.length; i++){
			physics.DestroyBody(this.tokill[i]);
		}
	}
	this.tokill.splice(0,this.tokill.length); //empty the to kill list
}

enemy.prototype.getindex = function(body){
	for(var i = 0; i < this.enemieslist.length; i++) {
		if (this.enemieslist[i] === body) return i;
    }
}


