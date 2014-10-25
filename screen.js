function Screen(alwaysUpdate, alwaysDraw) {
    //Call the Sprite constructor to copy any object properties
    Sprite.call(this);
    
    //These determine if the screen should be update/drawn when it is not the top screen
    this.alwaysUpdate = alwaysUpdate;
    this.alwaysDraw = alwaysDraw;
    
    //Has the screen been initialized
    this.initialized = false;
    
    //Create a stage for the screen that we can add sprites to
    this.stage = new Sprite();
    this.addChild(this.stage);
    
    //Create a gui object which extends sprite and supports buttons
    this.gui = new GUI(gInput);
    this.addChild(this.gui);
}
//Inherit all Sprite properties
Screen.prototype = new Sprite();

//Called once to set up anything that needs to be called after the game is initialized
//some values aren't available before initGame such as any canvas property
Screen.prototype.init = function(){
}

//Create a screen manager class
function ScreenManager() {
    //Call the Sprite constructor to copy any object properties
    Sprite.call(this);

    this.screens = new List();
}
//Inherit all Sprite properties
ScreenManager.prototype = new Sprite();

//Push a screen on to the stack
ScreenManager.prototype.push = function(screen){
    this.screens.remove(screen);
    this.screens.push(screen);
}

//Pop a screen off of the stack
ScreenManager.prototype.pop = function(){
    this.screens.tail.item.gui.visible = false;
    return this.screens.pop();
}

//Remove a screen from the stack
ScreenManager.prototype.remove = function(screen){
    screen.gui.visible = false;
    this.screens.remove(screen);
}

//Override th defult update function
ScreenManager.prototype.update = function (d) {
    var screens = this.screens;
    
    //Loop through the screens and update if they are supposed to always update or if they ar the top screen
    for (var node = screens.head; node != null; node = node.link) {
        var screen = node.item;
        
        //The gui wasn't exactly made for this situation so we need to hide it if it's not in the current screen
        if(node != screens.tail){
            screen.gui.visible = false;
        }else{
            screen.gui.visible = true;
        }
        
        if (screen.alwaysUpdate || node == screens.tail) {
            if(!screen.initialized){
                screen.init();
                screen.initialized = true;
            }
            screen.update(d);
        }
    }
}

//Override the defualt draw function the same as the update function except we're drawing
ScreenManager.prototype.draw = function (ctx) {
    var screens = this.screens;
    
    for (var node = screens.head; node != null; node = node.link) {
        var screen = node.item;
        if (screen.alwaysDraw || node == screens.tail) {
            screen.draw(ctx);
        }
    }
}

var speed = 2;

//Create a new screen manager
var screenMan = new ScreenManager();
//Add it as a child of the world.
//Here we're taking advantage of the sprite hierarchy structure
world.addChild(screenMan);



//Create a main menu screen
var mainMenu = new Screen(false, false);
//Optionally set a background for the screen
mainMenu.image = Textures.load("./sprites/menu3.png");
screenMan.push(mainMenu);


//Override the empty init function to set some properties
mainMenu.init = function(){
    //Since we set a background we want the screen to fill  the canvas
    this.width = 500;
    this.height = canvas.height;
    this.xoffset = 500/2;
    this.gui.x = canvas.width/2;
    this.gui.y = canvas.height/2;
    
    
    var newGame = new TextButton("New Game");
    newGame.center = true;
    newGame.label.dropShadow = true;
    newGame.label.fontSize = 30;
	newGame.alpha = 0;
    newGame.setLabelColors("#aaaaaa", "#ffffff", "#ff0000");
    this.gui.addChild(newGame);
	
    
    newGame.func = function(){
        screenMan.push(gameScreen);

    }
    /*
    var resumeGame = new TextButton("Resume Game");
    resumeGame.y = 50;
    resumeGame.center = true;
    resumeGame.label.dropShadow = true;
    resumeGame.label.fontSize = 30;
    resumeGame.setLabelColors("#aaaaaa", "#ffffff", "#ff0000");
    this.gui.addChild(resumeGame);
	*/
}

var gameScreen = new Screen(false, true);
//screenMan.push(gameScreen);
//gameScreen.image = Textures.load("http://www.jar42.com/brine/laststop/images/grass.png");
gameScreen.init = function(){


initialize = new initialize();
initialize.startThis(); 


}

var pauseMenu = new Screen(false, true);
//screenMan.push(pauseMenu);

var worldthis = world;

pauseMenu.init = function(){
    this.width = canvas.width;
    this.height = canvas.height;
    this.gui.x = canvas.width/2;
    this.gui.y = canvas.height/2;
	var currentthis = this;
	
    
    var resumeGame = new TextButton("Resume");
	resumeGame.center = true;
    resumeGame.label.fontSize = 30;
	resumeGame.alpha = 0;
    resumeGame.setLabelColors("#aaaaaa","#ffffff", "#fff000");
    this.gui.addChild(resumeGame);
    resumeGame.func = function(){
        screenMan.remove(pauseMenu);
		initialize.timestep = 1/60;
		world.removeChild(userinterface.resumeSprite);
		world.removeChild(userinterface.pauseSprite);
		userinterface.paused = false;
    }
	
    
    
    
}

/*var endMenu = new Screen(false, true);
endMenu.image = Textures.load("./sprites/menu.png");
screenMan.push(endMenu);
endMenu.init = function(){
    this.width = 500;
    this.height = canvas.height;
    this.xoffset = 500/2;
    this.gui.x = canvas.width/2;
    this.gui.y = canvas.height/2;
}*/
    
    
gInput.addFunc(27, function(){
    if(screenMan.screens.find(gameScreen) && !userinterface.paused){
	userinterface.paused = true;
    screenMan.push(pauseMenu);
	initialize.timestep = 0;
	world.addChild(userinterface.resumeSprite);
	world.addChild(userinterface.pauseSprite);
    }
    
});