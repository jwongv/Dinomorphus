function star(){
	
	var starlist = [];
	this.starlist = starlist;
	var tokillstar = [];
	this.tokillstar = tokillstar;

}

star.prototype.spawn = function(){

	var starFix = new b2FixtureDef;
	starFix.density = 1.0;
	starFix.friction = 1;
	starFix.restitution = 0;
	
	var starBody = new b2BodyDef;
	starBody.fixedRotation = true;
	starBody.type = b2Body.b2_staticBody;
	starBody.position.x = 200 / SCALE;
	starBody.position.y = 469 / SCALE;
	starBody.userData = 'star';
	starFix.shape = new b2PolygonShape;
	starFix.shape.SetAsBox((50 / SCALE) / 2, (50/SCALE) / 2);
	var body = physics.CreateBody(starBody);
	body.CreateFixture(starFix);
	body.count=0;
	this.starlist.push(body);
}

star.prototype.killstar = function(){
	if(this.tokillstar.length > 0){
		for(var i = 0; i<this.tokillstar.length; i++){
			physics.DestroyBody(this.tokillstar[i]);
		}
	}
	this.tokillstar.splice(0,this.tokillstar.length); //empty the to kill list
}

star.prototype.getindex = function(body){
	for(var i = 0; i < this.starlist.length; i++) {
		if (this.starlist[i] === body) return i;
    }
}