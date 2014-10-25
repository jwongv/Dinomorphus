function initialize() {


    var a = 1;
    this.timestep = 1 / 60;
}

initialize.prototype.startThis = function () {
    physics = new b2World(new b2Vec2(0, 20), false);

    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(ctx);
    debugDraw.SetDrawScale(SCALE);
    debugDraw.SetFillAlpha(1.0);
    debugDraw.SetLineThickness(5.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    physics.SetDebugDraw(debugDraw);

    //add the level and player
    level = new level();
    level.createLevel0();


    newplayer = new player();
    userinterface = new userinterface();

    collisionmanager = new collision();
    collisionmanager.collisionhandler();

    var physicsthis = this;

    //World update loop function. Gameplay loop occurs here.
    world.update = function (d) {

        Textures.load("./sprites/backgrounds/tout-background-withplatforms.png");
        Textures.load("./sprites/backgrounds/level1-final.png");
        Textures.load("./sprites/backgrounds/long snow (unfinished).png");
        Textures.load("./sprites/backgrounds/level2-platforms.png");


        newplayer.move();
        level.move();
        level.kill();
        level.killstar();
        level.meteorSpawn2();
        level.meteorSpeed();
        level.killbreakable();
        level.killmeteor();
        userinterface.updateall();

        //sprite changing functions. will combine later into a different function
        newplayer.raptor();
        newplayer.pachy();
        newplayer.pterodactyl();
        newplayer.tiny();

        physics.Step(physicsthis.timestep, 10, 10);
        physics.ClearForces();

        this.__proto__.update.call(this, d);

    }


    world.draw = function (ctx) {


        ctx.save();
        //Draw the B2D debug
        ctx.clearRect(-newplayer.newoffsetx, 0, canvas.width, canvas.height);
        ctx.translate(-newplayer.newoffsetx, 0);
        physics.DrawDebugData();

        //Set the alpha to half so we can see the debug drawing
        this.alpha = 1;
        //Call the default draw
        this.__proto__.draw.call(this, ctx);
        ctx.fillStyle = "black";
        ctx.fillText("Lives: " + newplayer.lives, (newplayer.sprite.x - 270), 22);
        ctx.restore();

    }
}

initialize.prototype.removeSprites = function () {
    world.removeChild(this.resumeSprite);
}