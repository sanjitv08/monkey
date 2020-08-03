 //Global Variables
var bananaImage, obstacleImage, obstacleGroup, foodGroup;
var backImage, groundImage,invisibleGround,bkGround;
var score=0;
var GAMESTATE=1;
var PLAY=1;
var END=0;
var FLAG=2;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
  groundImage=loadImage("ground.png");
  gameOverImage=loadImage("gameover.jpg");
}


function setup() {
  createCanvas(600,400);
  
  bkGround = createSprite(600, 150);
  bkGround.addImage("bkGround",backImage);
  bkGround.velocityX=-5;
  bkGround.x=bkGround.width/2;
  
  foodGroup= new Group();
  obstacleGroup=new Group();
  
  invisibleGround=createSprite(300,490,590,10);
  invisibleGround.addImage("invisibleGround",groundImage);   
  invisibleGround.visible="False";
  
  player = createSprite(200,100,50,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
}  

function spawnFood() {
  if (World.frameCount % 80 == 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(100,300);    
    banana.addImage(bananaImage);
    banana.scale = 0.15 ;
    banana.velocityX =-8        ;
    
    banana.lifetime = 100;
    foodGroup.add(banana);
  }
}

function spawnObstacle() {
  if(World.frameCount % 80 == 0) {
    var obstacle = createSprite(600,350 ,20,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
           
    obstacle.scale = 0.2;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}

function draw(){
 background(255);
 GAMESTATE=1;
  if ((GAMESTATE==PLAY) && (FLAG>0)){
      spawnFood();
      spawnObstacle();
    
      if(invisibleGround.x<0) {
        invisibleGround.x=invisibleGround.width/2;
      }
     if(bkGround.x<100){
        bkGround.x=bkGround.width/2;
      }
      if(keyDown("space") ) {
      player.velocityY = -10;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(invisibleGround); 
      if(foodGroup.isTouching(player)){
        foodGroup.destroyEach();
        score = score + 2;
        switch(score){
          case 10: player.scale=0.14;
                  break;
          case 20: player.scale=0.18;
                  break;
          case 30: player.scale=0.22;
                  break;
          case  40: player.scale=0.26;
                  break;
          default: break;
       }
      }
    else    {
       
      if(obstacleGroup.isTouching(player)){ 
          player.scale=0.1;
          FLAG=FLAG-1;
          obstacleGroup.destroyEach();
          if (FLAG==0){ 
           foodGroup.destroyEach();
           obstacleGroup.destroyEach();                    
           foodGroup.velocityX=0;
           obstacleGroup.velocityX=0;
           bkGround.velocityX=0;
           player.visible=false;
           //player.addImage(gameOverImage);
            bkGround.addImage("bkGround",gameOverImage);
           GAMESTATE=END;
          }
      }  
    }
  }      
    

 drawSprites(); 
 stroke("blue");
  textSize(20);
  fill("red");
  text("SCORE: "+score, 130, 50);
  textSize(20);
  fill("blue");
  text("CHANCES: "+FLAG, 280, 50);
  
}