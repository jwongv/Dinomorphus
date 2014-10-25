//Add the player input keys
gInput.addBool(38, "up");
gInput.addBool(40, "down");
gInput.addBool(39, "right");
gInput.addBool(37, "left");
gInput.addBool(49, "raptor");
gInput.addBool(50, "pachy");
gInput.addBool(51, "pterodactyl");
gInput.addBool(52, "tiny");
gInput.addBool(32, "attack");

function player() {

    Textures.load("./sprites/large raptor/dino.png");
    Textures.load("./sprites/ptrodactyl/animation/walking/teri-ani-2.png");
    Textures.load("./sprites/tryceritops/tryceritops.png");
    Textures.load("./sprites/small dino/small dino.png");


    this.canchange = true;
    this.falling = false;
    this.lives = 3;
    this.score = 0;
    this.direction = 'right';
    this.checkx = 300 / SCALE;
    this.checky = 400 / SCALE;
    var playerFix = new b2FixtureDef;
    playerFix.density = 1.0;
    playerFix.friction = 0;
    playerFix.restitution = 0;

    //worldGlobal will be world with each object in it as well as the background
    //Set background
    var backSprite = new Sprite();
    backSprite.width = canvas.width * 40;
    backSprite.height = canvas.height;
    //defined but when called in move it calls it undefined for x
    backSprite.index = 5;
    backSprite.x = 0;
    backSprite.y = 0;
    backSprite.alpha = 1.0;
    backSprite.tilesX = 20;
    world.addChild(backSprite);
    backSprite.image = Textures.load("./sprites/backgrounds/junglebackround--mixed.png");
    this.backSprite = backSprite;
    this.backSpritex = backSprite.x;
    this.backSpritey = backSprite.y;

    //Setup player definitions using Box2D
    var playerBody = new b2BodyDef;
    playerBody.fixedRotation = true;
    playerBody.type = b2Body.b2_dynamicBody;
    playerBody.position.x = playerX;
    playerBody.position.y = playerY;
    playerBody.userData = 'player';
    playerFix.shape = new b2PolygonShape;
    playerFix.shape.SetAsBox((50 / SCALE) / 2, (50 / SCALE) / 2);
    var newbody = physics.CreateBody(playerBody);
    newbody.CreateFixture(playerFix);
    this.newbody = newbody;
    this.playerbodydef = playerBody;
    this.playerfixdef = playerFix;
    newbody.inwind = false;
    newbody.inend = false;

    //Setup player sprites
    var playerSprite = new Sprite();
    playerSprite.width = 85;
    playerSprite.height = 100;
    playerSprite.alpha = 1.0;
    playerSprite.x = playerX;
    playerSprite.y = playerY;
    playerSprite.xoffset = -35;
    playerSprite.yoffset = -70;
    world.addChild(playerSprite);
    playerSprite.image = Textures.load("./sprites/large raptor/dino.png");
    this.sprite = playerSprite;

    var playerthis = this;
    this.animationcount = 0;

    //Player sprite update function
    this.sprite.update = function (d) {
        var vel = playerthis.newbody.GetLinearVelocity();
        var pos = playerthis.newbody.GetPosition();
        this.x = pos.x * SCALE;
        this.y = pos.y * SCALE;
        if (this.y > canvas.height) {
            playerthis.lives--;
            playerthis.falling = true;
        }
        
        //Player movement animations
        if (Math.abs(vel.x) > 0) {
            playerthis.animationcount++;
            if (playerthis.animationcount >= 7) {
                if (playerthis.raptorbool) {
                    playerthis.raptorwalk();
                    playerthis.animationcount = 0;
                }
                if (playerthis.pachybool) {
                    playerthis.pachywalk();
                    playerthis.animationcount = 0;
                }
                if (playerthis.pterodactylbool) {
                    playerthis.pterowalk();
                    playerthis.animationcount = 0;
                }
                if (playerthis.tinybool) {
                    playerthis.tinywalk();
                    playerthis.animationcount = 0;
                }
            }

        }

        //Player sprite direction
        if (playerthis.direction == "left")
            this.scaleX = -1;
        else
            this.scaleX = 1;

        //Pterodactyl sprite changes
        if (playerthis.pterodactylbool) {
            if (vel.y < 0)
                this.image = Textures.load("./sprites/ptrodactyl/animation/fly and glide/teri-ani-down.png");
            else if (vel.y > 0)
                this.image = Textures.load("./sprites/ptrodactyl/animation/fly and glide/teri-glide.png");
            else if (vel.x == 0)
                this.image = Textures.load("./sprites/ptrodactyl/animation/walking/teri-ani-2.png");
        }
        //Pachysaurus sprite changes
        if (playerthis.pachybool) {
            if (playerthis.attacking) {
                this.image = Textures.load("./sprites/tryceritops/charge/try charge multi.png");
            }
            else if (vel.x == 0)
                this.image = Textures.load("./sprites/tryceritops/tryceritops.png");
        }
        //Raptor sprite changes
        if (playerthis.raptorbool) {
            if (vel.x == 0)
                this.image = Textures.load("./sprites/large raptor/dino.png");
        }
        //Tinydino sprite changes
        if (playerthis.tinybool) {
            if (vel.x == 0)
                this.image = Textures.load("./sprites/small dino/small dino.png");
        }


    }

    //Initialize player variables
    this.oldposx = 300;
    this.oldposy = 569;
    this.newposx = 0;
    this.newposy = 0;
    this.newoffsetx = 0;
    this.newoffsety = 0;

    this.raptorbool = true;
    this.pachybool = false;
    this.pterodactylbool = false;
    this.tinybool = false;

    this.maxspeed = 12;
    this.maxjump = 15;

    this.canattack = false;
    this.attackcount = 0;
    this.attacking = false;

    var tinySprite = new Sprite();
    tinySprite.width = 35;
    tinySprite.height = 35;
    tinySprite.alpha = 1.0;

    //Raptor animations
    this.raptorframe = 0;
    raptorArray = [];
    Textures.load("./sprites/large raptor/NEW DINO/1.png");
    Textures.load("./sprites/large raptor/NEW DINO/2.png");
    Textures.load("./sprites/large raptor/NEW DINO/3.png");
    Textures.load("./sprites/large raptor/NEW DINO/4.png");
    Textures.load("./sprites/large raptor/NEW DINO/5.png");
    Textures.load("./sprites/large raptor/NEW DINO/6.png");
    Textures.load("./sprites/large raptor/NEW DINO/7.png");
    Textures.load("./sprites/large raptor/NEW DINO/8.png");
    raptorArray.push("./sprites/large raptor/NEW DINO/1.png");
    raptorArray.push("./sprites/large raptor/NEW DINO/2.png");
    raptorArray.push("./sprites/large raptor/NEW DINO/3.png");
    raptorArray.push("./sprites/large raptor/NEW DINO/4.png");
    raptorArray.push("./sprites/large raptor/NEW DINO/5.png");
    raptorArray.push("./sprites/large raptor/NEW DINO/6.png");
    raptorArray.push("./sprites/large raptor/NEW DINO/7.png");
    raptorArray.push("./sprites/large raptor/NEW DINO/8.png");
    this.raptorArray = raptorArray;

    //Pachysaurus animations
    this.pachyframe = 0;
    pachyArray = [];
    Textures.load("./sprites/tryceritops/walking/try-ani-1.png");
    Textures.load("./sprites/tryceritops/walking/try-ani-2.png");
    Textures.load("./sprites/tryceritops/walking/try-ani-3.png");
    Textures.load("./sprites/tryceritops/walking/try-ani-4.png");
    pachyArray.push("./sprites/tryceritops/walking/try-ani-1.png");
    pachyArray.push("./sprites/tryceritops/walking/try-ani-2.png");
    pachyArray.push("./sprites/tryceritops/walking/try-ani-3.png");
    pachyArray.push("./sprites/tryceritops/walking/try-ani-4.png");
    this.pachyArray = pachyArray;

    //Ptero animations
    this.pteroframe = 0;
    pteroArray = [];
    Textures.load("./sprites/ptrodactyl/animation/walking/teri-ani-1.png");
    Textures.load("./sprites/ptrodactyl/animation/walking/teri-ani-2.png");
    Textures.load("./sprites/ptrodactyl/animation/walking/teri-ani-3.png");
    Textures.load("./sprites/ptrodactyl/animation/walking/teri-ani-4.png");
    Textures.load("./sprites/ptrodactyl/animation/walking/teri-ani-5.png");
    Textures.load("./sprites/ptrodactyl/animation/walking/teri-ani-6.png");
    pteroArray.push("./sprites/ptrodactyl/animation/walking/teri-ani-1.png");
    pteroArray.push("./sprites/ptrodactyl/animation/walking/teri-ani-2.png");
    pteroArray.push("./sprites/ptrodactyl/animation/walking/teri-ani-3.png");
    pteroArray.push("./sprites/ptrodactyl/animation/walking/teri-ani-4.png");
    pteroArray.push("./sprites/ptrodactyl/animation/walking/teri-ani-5.png");
    pteroArray.push("./sprites/ptrodactyl/animation/walking/teri-ani-6.png");
    this.pteroArray = pteroArray;

    //Tinydino animations
    this.tinyframe = 0;
    tinyArray = [];
    Textures.load("./sprites/small dino/ani/small-ani-1.png");
    Textures.load("./sprites/small dino/ani/small-ani-2.png");
    Textures.load("./sprites/small dino/ani/small-ani-3.png");
    Textures.load("./sprites/small dino/ani/small-ani-4.png");
    Textures.load("./sprites/small dino/ani/small-ani-5.png");
    Textures.load("./sprites/small dino/ani/small-ani-6.png");
    Textures.load("./sprites/small dino/ani/small-ani-7.png");
    Textures.load("./sprites/small dino/ani/small-ani-8.png");
    Textures.load("./sprites/small dino/ani/small-ani-9.png");
    Textures.load("./sprites/small dino/ani/small-ani-10.png");
    tinyArray.push("./sprites/small dino/ani/small-ani-1.png");
    tinyArray.push("./sprites/small dino/ani/small-ani-2.png");
    tinyArray.push("./sprites/small dino/ani/small-ani-3.png");
    tinyArray.push("./sprites/small dino/ani/small-ani-4.png");
    tinyArray.push("./sprites/small dino/ani/small-ani-5.png");
    tinyArray.push("./sprites/small dino/ani/small-ani-6.png");
    tinyArray.push("./sprites/small dino/ani/small-ani-7.png");
    tinyArray.push("./sprites/small dino/ani/small-ani-8.png");
    tinyArray.push("./sprites/small dino/ani/small-ani-9.png");
    tinyArray.push("./sprites/small dino/ani/small-ani-10.png");
    this.tinyArray = tinyArray;


}
//Raptor animation function
player.prototype.raptorwalk = function () {
    this.sprite.image = Textures.load(this.raptorArray[this.raptorframe]);
    this.raptorframe++;
    if (this.raptorframe > 7)
        this.raptorframe = 0;
}
//Pachy animation function
player.prototype.pachywalk = function () {
    this.sprite.image = Textures.load(this.pachyArray[this.pachyframe]);
    this.pachyframe++;
    if (this.pachyframe > 3)
        this.pachyframe = 0;
}
//Ptero animation function
player.prototype.pterowalk = function () {
    this.sprite.image = Textures.load(this.pteroArray[this.pteroframe]);
    this.pteroframe++;
    if (this.pteroframe > 5)
        this.pteroframe = 0;
}
//Tinydino animation function
player.prototype.tinywalk = function () {
    this.sprite.image = Textures.load(this.tinyArray[this.tinyframe]);
    this.tinyframe++;
    if (this.tinyframe > 9)
        this.tinyframe = 0;
}
//Player velocity function
player.prototype.add_velocity = function (xdir, ydir) {
    var b = this.newbody;
    var v = b.GetLinearVelocity();
    v.Add(new b2Vec2(xdir, ydir));

    if (v.y < -this.maxjump)
        v.y = -this.maxjump;
    b.SetLinearVelocity(v);
}
//Player movement function
player.prototype.move = function () {
    var vel = this.newbody.GetLinearVelocity();
    if (this.attackcount < 80) {
        this.attackcount++;
    }
    if (this.attacking && Math.abs(vel.x) < 4) {
        this.attacking = false;
        this.sprite.image = Textures.load("./sprites/tryceritops/tryceritops.png");
        this.sprite.width = 125;
        this.sprite.height = 100;
        this.sprite.xoffset = -70;
        this.sprite.yoffset = -75;
        this.newbody.SetUserData('player');
    }
    if (this.falling) {
        this.falling = false;
        console.log("fell");

        this.newbody.SetPosition(new b2Vec2(this.checkx, this.checky));

    }

    this.newposx = this.newbody.GetPosition().x * SCALE;
    this.newoffsetx += (this.newposx - this.oldposx);
    this.oldposx = this.newposx;

    
    if (!this.attacking) {
        //Right movement
        if (gInput.right) {
            this.add_velocity(1, 0);
            this.direction = "right";
            if (vel.x > this.maxspeed)
                vel.x = this.maxspeed;
        }
        //Left movement
        if (gInput.left) {
            this.add_velocity(-1, 0);
            this.direction = "left";
            if (vel.x < -this.maxspeed)
                vel.x = -this.maxspeed;
        }
        //Jumping
        if (gInput.up && vel.y == 0) {
            this.add_velocity(0, -this.maxjump);
        }
    }

    //Left velocity slowdown
    if ((!gInput.left || this.attacking) && vel.x < 0) {
        this.add_velocity(1 / SCALE * 4, 0);
        if (vel.x > 0) vel.x = 0;
    }
    //Right velocity slowdown
    if ((!gInput.right || this.attacking) && vel.x > 0) {
        this.add_velocity(-1 / SCALE * 4, 0);
        if (vel.x < 0) vel.x = 0;
    }


    if (gInput.attack)
        this.attack();

    //Ptero wind interaction
    if (this.newbody.inwind && this.pterodactylbool)
        this.add_velocity(0, -1);

    if (this.newbody.inend) {
        this.newbody.SetPosition(new b2Vec2(300 / SCALE, 400 / SCALE));
        level.destroyLevel();
        this.checkx = 300 / SCALE;
        this.checky = 400 / SCALE;
    }

    //Start game over if no lives
    if (this.lives < 1) {
        this.newbody.SetPosition(new b2Vec2(300 / SCALE, 400 / SCALE));
        level.destroyLevel();
        this.checkx = 300 / SCALE;
        this.checky = 400 / SCALE;
        this.lives = 3;
    }

}
//Attack function
player.prototype.attack = function () {
    var vel = this.newbody.GetLinearVelocity();
    if (this.canattack && this.attackcount == 80 && vel.y == 0) {
        this.newbody.SetUserData('attack');
        vel.x = 0;
        gInput.right = false;
        gInput.left = false;
        this.attacking = true;
        this.sprite.width = 250;
        this.sprite.height = 50;
        this.sprite.xoffset = -210;
        this.sprite.yoffset = -30;
        if (this.direction == 'right') {
            this.newbody.ApplyImpulse(new b2Vec2(35, 0), this.newbody.GetWorldCenter());
        } else
            this.newbody.ApplyImpulse(new b2Vec2(-35, 0), this.newbody.GetWorldCenter());
        this.attackcount = 0;
    }
}

//Raptor characteristics
player.prototype.raptor = function () {

    if (gInput.raptor && !this.attacking && this.canchange) {
        if (!this.raptorbool)
            this.sprite.image = Textures.load("./sprites/large raptor/dino.png");
        this.undopachy();
        this.undopterodactyl();
        this.undotiny();
        this.raptorbool = true;
        this.maxspeed = 12;
        this.maxjump = 15;
        this.sprite.width = 85;
        this.sprite.height = 100;
        this.sprite.xoffset = -35;
        this.sprite.yoffset = -70;
    }
}
//Pachy characteristics
player.prototype.pachy = function () {

    if (gInput.pachy && !this.attacking && this.canchange) {
        if (!this.pachybool)
            this.sprite.image = Textures.load("./sprites/tryceritops/tryceritops.png");
        this.undoraptor();
        this.undopterodactyl();
        this.undotiny();
        this.pachybool = true;
        this.canattack = true;
        this.sprite.width = 125;
        this.sprite.height = 100;
        this.sprite.xoffset = -70;
        this.sprite.yoffset = -75;
        //		this.newbody.SetUserData('attack');

    }
}
//Ptero characteristics
player.prototype.pterodactyl = function () {

    if (gInput.pterodactyl && !this.attacking && this.canchange) {
        if (!this.pterodactylbool)
            this.sprite.image = Textures.load("./sprites/ptrodactyl/animation/walking/teri-ani-2.png");
        this.undoraptor();
        this.undopachy();
        this.undotiny();
        this.pterodactylbool = true;
        this.newbody.SetUserData('ptero');
        this.sprite.width = 100;
        this.sprite.height = 100;
        this.sprite.xoffset = -50;
        this.sprite.yoffset = -70;
    }
}
//Tinydino characteristics
player.prototype.tiny = function () {
    if (gInput.tiny && !this.istiny && !this.attacking) {
        this.sprite.width = 50;
        this.sprite.height = 70;
        this.sprite.xoffset = -30;
        this.sprite.yoffset = -50;
        this.sprite.image = Textures.load("./sprites/small dino/small dino.png");
        this.undoraptor();
        this.undopachy();
        this.undopterodactyl();
        this.tinybool = true;

        var vel4 = this.newbody.GetLinearVelocity();
        var oldX = this.newbody.GetPosition().x;
        var oldY = this.newbody.GetPosition().y;
        physics.DestroyBody(this.newbody);
        //create tiny dino

        var tinyFix = new b2FixtureDef;
        tinyFix.density = 1.0;
        tinyFix.friction = 0;
        tinyFix.restitution = 0;

        var tinyBody = new b2BodyDef;
        tinyBody.fixedRotation = true;
        tinyBody.type = b2Body.b2_dynamicBody;

        var tinyBody = new b2BodyDef;
        tinyBody.fixedRotation = true;
        tinyBody.type = b2Body.b2_dynamicBody;
        tinyBody.position.x = oldX;
        tinyBody.position.y = oldY;
        tinyBody.userData = 'tiny';
        tinyFix.shape = new b2PolygonShape;
        tinyFix.shape.SetAsBox((25 / SCALE) / 2, (25 / SCALE) / 2);

        var newbody = physics.CreateBody(tinyBody);
        this.tinyFixture = newbody.CreateFixture(tinyFix);
        this.newbody = newbody;
        this.newbody.SetLinearVelocity(vel4);
        this.istiny = true;
    }
}
//Dinosaur characterstic reverse functions
player.prototype.undoraptor = function () {
    this.raptorbool = false;
    this.maxspeed = 6;
    this.maxjump = 12;
}

player.prototype.undopachy = function () {
    this.pachybool = false;
    this.canattack = false;
}

player.prototype.undopterodactyl = function () {
    this.pterodactylbool = false;
    this.newbody.SetUserData('player');
}

player.prototype.undotiny = function () {
    this.tinybool = false;
    if (this.istiny) {
        var oldX = this.newbody.GetPosition().x;
        var oldY = this.newbody.GetPosition().y;
        var b2 = this.newbody;
        var vel2 = b2.GetLinearVelocity();

        physics.DestroyBody(this.newbody);

        this.playerbodydef.position.x = oldX;
        this.playerbodydef.position.y = oldY;
        this.newbody = physics.CreateBody(this.playerbodydef);
        this.newbody.SetLinearVelocity(vel2);
        this.playerFixture = this.newbody.CreateFixture(this.playerfixdef);
    }

    this.istiny = false;
}