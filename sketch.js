var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var bananaimg,stoneimg;
var stonegroup,bananagroup;
var gameoverimage;
var score=0;
function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaimg=loadImage("banana.png");
  stoneimg=loadImage("stone.png");
  gameoverimage=loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  gameOver = createSprite(400,200);
  gameOver.addImage(gameoverimage);
  gameOver.visible=false;
  bananagroup = new Group();
  stonegroup = new Group();
}

function draw() { 
  background(0);
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

  if(gameState===PLAY){

  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnbananas();
    spawnstones();
    if(player.isTouching(bananagroup)){
      score+=2;
      bananagroup.destroyEach();
    }
    if(player.isTouching(stonegroup)){
      gameState=END;
    }
  }else{
    gameOver.visible = true;
    bananagroup.destroyEach();
    stonegroup.destroyEach();
    player.destroy();
    
    
  }

  drawSprites();
  text("Score: "+ score, 700,50);

}
function spawnbananas() {
  //write code here to spawn the bananas
  if (frameCount % 60 === 0) {
    var banana = createSprite(800,120,40,10);
    banana.y = Math.round(random(80,320));
    banana.addImage(bananaimg);
    banana.scale = 0.07;
    banana.velocityX = -(4+3*score/50);
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
   
    
    //add each banana to the group
    bananagroup.add(banana);
  }
  
}

function spawnstones() {
  if(frameCount %400 === 0) {
    var stone = createSprite(800,365,10,40);
    //stone.debug = true;
    stone.velocityX = -(3 + 3*score/100);
    stone.addImage(stoneimg);
    
    
    //assign scale and lifetime to the stone           
    stone.scale = 0.3;
    stone.lifetime = 400;
    //add each stone to the group
    stonegroup.add(stone);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
    
  bananagroup.destroyEach();
  stonegroup.destroyEach();
  
  
  
  score = 0;
  
}