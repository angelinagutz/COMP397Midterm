/// <reference path = "_reference.ts" />

// Global Variables
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;

var spriteSheetLoader : createjs.SpriteSheetLoader;
var enemyAtlas : createjs.SpriteSheet;

var currentScene : objects.Scene;
var scene: number = 0;

// Preload Assets required
var assetData:objects.Asset[] = [
    {id: "PlayBtn", src: "../../Assets/images/sack.png"},
    {id: "MenuBG", src: "../../Assets/images/bank1.png"},
    {id: "GameBG", src: "../../Assets/images/bank.png"},
    {id: "enemy", src: "../../Assets/images/enemy.png"}
];

function preload() {
    // Create a queue for assets being loaded
    assets = new createjs.LoadQueue(false);
    // assets.installPlugin(createjs.Sound);
    // Register callback function to be run when assets complete loading.
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}

function init() {
    // Reference to canvas element
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(config.Game.FPS);
    createjs.Ticker.on("tick", this.gameLoop, this);

    let atlasData = {
        "images": [
            assets.getResult("enemy")
        ],

        "frames": [
         [1, 1, 200, 214, 0, 0, 0],
         [203, 1, 128, 125, 0, 0, -3],
         [203, 128, 102, 117, 0, -13, -9],
         [307, 128, 91, 98, 0, -18, -18],
         [400, 1, 128, 124, 0, 0, -4],
         [400, 127, 128, 124, 0, 0, -4]
        ],
        
        "animations": {
            "poof": {
                "frames": [4, 1, 5, 2, 3], "speed": 0.1, next: false
            },

            "robber": {frames: [0]}
        },
        "texturepacker": [
        "SmartUpdateHash: $TexturePacker:SmartUpdate:6b44ef51929ea21e17ff1b07ec9c1090:a443013636a6d3e24441fc0f2a91ca43:a99356c10d69482e9bee53d25c3d05e1$",
        "Created with TexturePacker (https://www.codeandweb.com/texturepacker) for EaselJS"
]

    }

    enemyAtlas = new createjs.SpriteSheet(atlasData);

    scene = config.Scene.MENU;
    changeScene();
}

function gameLoop(event: createjs.Event): void {
    // Update whatever scene is currently active.
    currentScene.update();
    stage.update();
}

function changeScene() : void {
    
    // Simple state machine pattern to define scene swapping.
    switch(scene)
    {
        case config.Scene.MENU :
            stage.removeAllChildren();
            currentScene = new scenes.Menu();;
            console.log("Starting MENU scene");
            break;
        case config.Scene.GAME :
            stage.removeAllChildren();
            currentScene = new scenes.Play();
            console.log("Starting SHOOTER scene");
            break;
    }
    
}