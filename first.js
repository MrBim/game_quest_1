// attempting some outline "class" definitions:

// first a "world" object (only 1 of it, so no need for a constructor)
var world = {
    worldMap: [], // an empty array which can later have mapTiles added to it!
    // various "global" properties, such as:
    width: 1000,
    height: 700,
    lowerHeight: 200, // height of lower canvas
    wallThickness: 30,
    controls: { // a "dictionary" mapping keycodes to actions - this is just an example
    // of how to lay it out, there may be more convenient ways when we start the "real"
    // code:
        37: "left", // arrow keys
        38: "up",
        39: "right",
        40: "down",
        65: "interact", // a
        83: "speak", // s
        68: "attack" // d
    },
    startGame: function() {
        // code to start game in here
    },
    restartGame: function() {
        // code to restart game from beginning
    },
    quitGame: function() {
        // code to stop game running (is this even necessary?)
    }
    // plus any other "global" things we discover we want!
    
    // might be worth making ALL other objects/classes properties of the
    // "world" object, so that there is only ONE global variable!
    // But this can be a task for later (if at all)
}

// general "class" for all game "objects" (Thor, NPCs, enemies, obstacles, items...)
function gameThing() {
    
}


// object for Thor:
// done with constructor, rather than object literal, so that private attributes
// can be defined!
function PlayerCharacter(thorHealth, thorImage) {
    var that = this; // necessary to refer to "this" in inner functions
    var health = thorHealth; // private attribute!
    var inventory = [sword];  // clearly sword needs to be defined!
    // public attributes:
    this.width = 40;  // everything should have public width/height/xPos/yPos
    // properties, so that they can be accessed by hit detection etc.
    this.height = 40;
    this.tile = someTile;  // obviously needs to be changed to real tile value later!
    this.xPos = (world.width-this.width)/2; // example for central starting location
    this.yPos = (world.height-this.height)/2;
    this.speed = 3; // for example
    

    this.setHealth = function(amount) {  // "privileged" method
    // to use Crockford's terminology. Is public but can access
    // the private attributes
        health = amount;
    };
    this.loseHealth = function(amount) {
        health -= amount;
    };
    this.canFireLightning = function() {
        return health===thorHealth;
    };
    this.isAlive = function() {
        return health>0;
    };

    this.addToInventory = function(item) {
        inventory.push(item);
    };
    this.lookThroughInventory = function() {
        inventory.forEach(function() {
            // some code goes here...
        });
    };
    this.draw = function() {
        // code to use thorImage, along with the xPos etc. to draw
        // Thor on the screen
    };
}
// fully public methods - to be written later (based on old code of course):
PlayerCharacter.prototype.fireLightning = function() {
    //...
};
PlayerCharacter.prototype.attackWithSword = function() {
    //...
};
PlayerCharacter.prototype.haveConvo = function(npc) {
    NPC.conversation(); // refer to NPC's own conversation method
};
PlayerCharacter.prototype.move = function(direction, amount) {
    // very crude code which can probably be improved once we have a better global
    // picture of how all this code interacts:
    if (direction=="North") {
        this.yPos -= amount;
    }
    else if (direction=="East") {
        this.xPos += amount;
    }
    else if (direction=="South") {
        this.yPos += amount;
    }
    else if (direction=="West") {
        this.xPos -= amount;
    }
};
var thor = new PlayerCharacter(100, image);  // health can easily be altered where necessary, "image" is
// obviously whatever we call the relevant image object



function NPC(convo, items, startXPos, startYPos, width, height, image) {
    // keep convo and items as private properties, which can be accessed
    // by the "conversation" method
    this.xPos = startXPos;
    this.yPos = startYPos;
    this.width = width;
    this.height = height;
    this.image = image;
    this.conversation = function(convo, items) {
        // code to have conversation goes here
    };
    this.draw = function() {
        // code to draw using image
    };
}
// looks really short. Do we need anything else for NPCs?
// (NB: the conversation function will probably end up pretty complicated!
// current thoughts are that it will have extra (boolean) parameters which can be used to load up
// different bits of conversation depending on if Thor has a certain item etc. I'm thinking it will
// just return an array/object of conversation lines, without actually displaying them on tthe screen.
// Doing the latter will be the the task of a separate piece of code, going by the principle of
// separating logic from display code)


function Enemy(startXPos, startYPos, width, height, image, movementFunc, speed, health, damage) {
    this.xPos = startXPos;
    this.yPos = startYPos;
    this.width = width;
    this.height = height;
    this.image = image;
    this.movementFunc = movementFunc;
    this.damageThor = function() {
        Thor.loseHealth(damage);
    }
}
enemy.prototype.isHitting = function(object) {
    // simple code to detect if a hit is detected. Note that it would be better to have enemy etc. as
    // subclasses of some "actor/mover" class, so that they can all share the same "isHitting" method.
    // will look at doing that on the next draft!
};
// note that the "global" code can now do things like:
// if (spider.isHitting(Thor)) {
//    spider.damageThor();
// }

// I don't think items should need anything other than these basic attributes
// (the player character already has the "addToInventory" method)
// Even more reason to have these all inherit from a base class!
function Item(startXPos, startYPos, width, height, image, movementFunc) {
    this.xPos = startXPos;
    this.yPos = startYPos;
    this.width = width;
    this.height = height;
    this.image = image;
}


function Obstacle(startXPos, startYPos, width, height, image, movementFunc, item) {
    this.xPos = startXPos;
    this.yPos = startYPos;
    this.width = width;
    this.height = height;
    this.image = image;
    this.checkForItem = function() {
        return item !== undefined;  // item is a private property, indicating a potential hidden item
        // in the obstacle
    };
}
obstacle.prototype.action = function() {
    // function to "do stuff" when you interact with/shoot lightning at an obstacle
};


function MapTile(doors, items, npcs, obstacles, enemies) {
    // keep these parameters as private variables? Then can define public ("privileged") methods
    // to do things like draw them on the screen
    this.makeWallObstacles = function(doors) {
        // function to convert the doors array into additional "wall" obstacles -
        // as done in the original code
    };
}

// as well as Paul's list, also need class for doors. Should include a "conditionToGoThrough" boolean property
// (or rather a function that returns a Boolean?)
function Door(wall, offset, size, destination) {
    // note the "wall" parameter will hold a string saying which wall (or none!) it is part of
    this.wall = wall;
    this.offset = offset;
    this.size = size;
    this.destination = destination;  // this property will give the door you come out at when going through
}