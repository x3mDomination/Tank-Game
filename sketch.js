var database;
var fade = 10;
var leftWall,rightWall,topWall,bottomWall;
var tankIMG,tank1,tank2,tank3,tank4,players;
var rockIMG,rock;
var rocks = [];
var game, player, form;
var playerCount;
var allPlayers;
var angle;
var gameState = 0;

function preload(){
  tankIMG = loadImage("images/Tank.png");
  rockIMG = loadImage("images/Rock.png");
}

function setup(){
  createCanvas(displayWidth-30,displayHeight-150);

  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

}

function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}