function collision(){
	
}

collision.prototype.collisionhandler = function(){
	b2ContactListener.prototype.BeginContact = function (contact){
		//now come action time
		var a = contact.GetFixtureA().GetBody();
		var b = contact.GetFixtureB().GetBody();
		var adata = a.GetUserData();
		var bdata = b.GetUserData();
		
		if((adata == 'player' || adata == 'ptero' || adata == 'tiny') && (bdata == 'enemy'))
		{
//			console.log("rawr");
			newplayer.lives--;
			newplayer.falling=true;
		}
		
		else if((bdata == 'player' || bdata == 'ptero' || bdata == 'tiny') && (adata == 'enemy'))
		{
//			console.log("rawr");
			newplayer.lives--;
			newplayer.falling=true;
		}
		if((adata == 'player' || adata == 'ptero' || adata == 'tiny' || adata == 'attack') && bdata == 'star')
		{
//			console.log("rawr");
			newplayer.lives++;
			userinterface.addLife();
			level.tokillstar.push(b);
			var starindex = level.stargetindex(b);
			level.starlist.splice(starindex,1);
		}
		
		else if((bdata == 'player' || bdata == 'ptero' || bdata == 'tiny' || bdata == 'attack') && adata == 'star')
		{
//			console.log("rawr");
			newplayer.lives++;
			userinterface.addLife();
			level.tokillstar.push(a);
			var starindex = level.stargetindex(a);
			level.starlist.splice(starindex,1);
		}

		else if((adata == 'player' || adata == 'ptero' || adata == 'tiny' || adata == 'enemy' || adata == 'wall' || adata == 'attack') && bdata == 'meteor')
		{
			level.tokillmeteor.push(b);
			var meteorindex = level.getmeteorindex(b);
			level.meteorlist.splice(meteorindex,1);
			if(adata == 'player' || adata == 'ptero' || adata == 'tiny'){
				newplayer.lives--;
				newplayer.falling=true;
			}

		}
		
		else if((bdata == 'player' || bdata == 'ptero' || bdata == 'tiny' || bdata == 'enemy' || adata == 'wall' || bdata == 'attack') && adata == 'meteor')
		{ 
			level.tokillmeteor.push(a);
			var meteorindex = level.getmeteorindex(a);
			level.meteorlist.splice(meteorindex,1);
			if(bdata == 'player' || bdata == 'ptero' || bdata == 'tiny'){
				newplayer.lives--;
				newplayer.falling=true;
			}
		}
		else if(adata == 'wind' && (bdata == 'player' || bdata == 'ptero' || bdata == 'tiny')){
			b.inwind = true;
		}
		else if(bdata == 'wind' && (adata == 'player' || adata == 'ptero' || adata == 'tiny')){
			a.inwind = true;
		}
		else if(adata == 'end' && (bdata == 'player' || bdata == 'attack' || bdata == 'ptero' || bdata == 'tiny')){
			b.inend = true;
		}
		else if(bdata == 'end' && (adata == 'player' || adata == 'attack' || adata == 'ptero' || adata == 'tiny')){
			a.inend = true;
		}
		else if(adata == 'check' && (bdata == 'player' || bdata == 'attack' || bdata == 'ptero' || bdata == 'tiny')){
			newplayer.checkx=a.GetPosition().x;
			newplayer.checky=a.GetPosition().y-3;
		}
		else if(bdata == 'check' && (adata == 'player' || adata == 'attack' || adata == 'ptero' || adata == 'tiny')){
			newplayer.checkx=b.GetPosition().x;
			newplayer.checky=b.GetPosition().y-3;
		}
		else if(adata == 'tiny' && bdata == 'tinycheck'){
			newplayer.canchange = false;
		}
		else if(bdata == 'tiny' && adata == 'tinycheck'){
			newplayer.canchange = false;
		}
	}
	
	b2ContactListener.prototype.EndContact = function(contact){
		var a = contact.GetFixtureA().GetBody();
		var b = contact.GetFixtureB().GetBody();
		var adata = a.GetUserData();
		var bdata = b.GetUserData();
		
		if((adata == 'wind' ||  adata == 'end' || adata == 'check')&& (bdata == 'player' || bdata == 'attack' || bdata == 'ptero' || bdata == 'tiny')){
			b.inwind = false;
			b.inend=false;
		}
		else if((bdata == 'wind' ||  bdata == 'end' || bdata == 'check')&& (adata == 'player' || adata == 'attack' || adata == 'ptero' || adata == 'tiny')){
			a.inwind = false;
			a.inend=false;
		}
		else if(adata == 'tiny' && bdata == 'tinycheck'){
			newplayer.canchange = true;
		}
		else if(bdata == 'tiny' && adata == 'tinycheck'){
			newplayer.canchange = true;
		}
	}
	
	b2ContactListener.prototype.PreSolve = function(contact, oldManifold){
		var a = contact.GetFixtureA().GetBody();
		var b = contact.GetFixtureB().GetBody();
		var adata = a.GetUserData();
		var bdata = b.GetUserData();
	
		if(adata == 'attack' && bdata == 'enemy')
		{
			level.tokill.push(b);
			var enemyindex = level.getindex(b);
			level.enemieslist.splice(enemyindex,1);
		}
		else if(bdata == 'attack' && adata == 'enemy')
		{
			level.tokill.push(a);
			var enemyindex = level.getindex(a);
			level.enemieslist.splice(enemyindex,1);
		}
		else if(adata == 'attack' && bdata == 'breakable')
		{
			level.tokillbreakable.push(b);
			var breakableindex = level.getbreakableindex(b);
			level.breakablelist.splice(breakableindex,1);
		}
		else if(bdata == 'attack' && adata == 'breakable')
		{
			level.tokillbreakable.push(a);
			var breakableindex = level.getbreakableindex(a);
			level.breakablelist.splice(breakableindex,1);
		}
	}
}

