var monkey , monkey_running,monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground;
var background1,backgroundImage;
var score;
var rand;
var PLAY= 1;
var END = 0;
var time = 60;
var gameState = PLAY;
var life;

function preload(){
   monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_2.png","sprite_8.png")
  monkey_collided = loadAnimation("sprite_7.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(600,600);
  
  monkey = createSprite(80,500,50,50);
  monkey.addAnimation("monkey",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale = 0.2;
  
  ground = createSprite(250,575,1200,20);
  ground.velocityX = -3;
  ground.x = ground.width /2;
  
  background1 = createSprite(700,300,1500,1500);
  background1.addImage("background",backgroundImage);
  background1.x = background1.width /2;
  background1.scale = 1.5;
  survivalTime = 0;
  
  score = 0;
  
  life = 2;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}
 
function draw() {
  background(0);

  monkey.collide(ground);
  monkey.depth = background1.depth+1;
    
  if(gameState === PLAY){
    background1.velocityX = -3;
    
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  
    if(keyDown("space") && monkey.y >= 500&&monkey.scale ==0.2){
      monkey.velocityY = -12;
    }
  
  if(keyDown("space") && monkey.y >= 470&&monkey.scale ==0.3){
      monkey.velocityY = -12;
    }
  
  if(keyDown("space") && monkey.y >= 438&&monkey.scale ==0.4){
      monkey.velocityY = -12;
    }
  
  if(keyDown("space") && monkey.y >= 408&&monkey.scale ==0.5){
      monkey.velocityY = -12;
    }
  
   if(keyDown("space") && monkey.y >= 377&&monkey.scale ==0.6){
      monkey.velocityY = -12;
    }
  
  if (background1.x<0){
    background1.x = background1.width /2;
     
   }    
  
  if (FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score+2;
    }
  
  if (obstacleGroup.isTouching(monkey)){
      monkey.scale = 0.2;
      life = life-1;
      obstacleGroup.destroyEach();
  }
 
  monkey.setCollider("circle",0,0,250);
  
  switch(score){
    case 10:monkey.scale = 0.3;
            break;
            
    case 20:monkey.scale = 0.4;
            break;
            
    case 30:monkey.scale = 0.5;
            break;
            
    case 40:monkey.scale = 0.6;
            break;        
  }
    monkey.velocityY = monkey.velocityY + 0.4;
    
    spawnFood();
  
   spawnObstacles();
  
  

  }

   
  
    monkey.collide(ground);
  
   drawSprites();

   if (life === 0){
    gameState = END;

  }

  if (time === 0){
    gameState = END;
  }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,500,50);

  if(gameState===END){
    background1.velocityX = 0;
    ground.velocityX = 0;
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    monkey.changeAnimation ("collided",monkey_collided);
    time = 0;

  stroke("red");
  textSize(40);
  textAlign(CENTER);
  fill("red");
  text("GAME OVER!!!",300,300);
    
  }

  if(frameCount%30 === 0){
     time = time-1
  }
  console.log(time);
  if(time>0){
  stroke(255);
  textSize(20);
  fill(255);
  text("Time Remaining: "+time+" seconds",100,50);
 }
}

function spawnFood(){
  if (frameCount%180 == 0){
    banana = createSprite(600,200,40,40);
    banana.addImage("banana",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = - 3;
    banana.lifetime = 400/3;
    
    rand = Math.round(random(250,380));
    banana.y = rand;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount%300 == 0){
    obstacles = createSprite(600,530,50,50);
    obstacles.addImage ("obtacles",obstacleImage);
    obstacles.lifetime = 400;
    obstacles.scale = 0.2;
    obstacles.velocityX = -3;
    obstacleGroup.add(obstacles);
  }
}