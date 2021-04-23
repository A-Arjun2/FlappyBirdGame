var backgroundImg;
var birdImg;
var uppipeImg;
var downpipeImg;
var gmImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score=0;
var resetBimg


function preload(){
    backgroundImg = loadImage("bg.png");
    birdImg = loadAnimation("bird1.png","bird2.png","bird3.png");
    groundImg = loadImage("ground.png");
    uppipeImg = loadImage("pipe.PNG");
    downpipeImg = loadImage("pipe1.PNG");
    gmImg = loadImage("GameOver.PNG");
    resetBimg = loadImage("reset.png");

}

function setup(){
    createCanvas(490,570);
    
    ground=createSprite(380,560,600,20);
    ground.addImage("grImg",groundImg)
    ground.scale=0.2;
    ground.velocityX=-4;

    bird=createSprite(200,250)
    bird.addAnimation("brImage",birdImg)
    bird.scale=1.4;

    gameover=createSprite(200,250)
    gameover.addImage("gmImage",gmImg)
    gameover.scale=1.5;
    gameover.visible = false;

    restart = createSprite(200,140);
    restart.addImage("reset",resetBimg);
    restart.scale = 0.4

    upPipesGroup= new Group();
    downPipesGroup= new Group();

    score = 0;
    
}

function draw(){
    background(backgroundImg); 
    fill("white");
    textSize(25);
    text("Score: "+ score, 20,20);
    

      if(gameState == PLAY){
        restart.visible = false;
        score = score + Math.round(getFrameRate()/27);
        ground.velocityX = -(6 + 1*score/100);
        
    fill("black");
    textSize(18);
    text("**Press Space Key To Jump**",180,20);
        if(ground.x<0){
          ground.x=200 
        }
        flyBird();

        spwanUpPipes();
      spwanDownPipes();
      if(upPipesGroup.isTouching(bird)){
        gameState = END;
    }
     bird.collide(ground);
    if(downPipesGroup.isTouching(bird)){
      gameState = END;
  }
      
      }

        else if(gameState === END){
        gameover.visible=true
        restart.visible = true;
        ground.velocityX = 0;
        bird.velocityY = 0;
        upPipesGroup.destroyEach();
        downPipesGroup.destroyEach();
        upPipesGroup.setVelocityXEach(0);
        downPipesGroup.setVelocityXEach(0);

        if(mousePressedOver(restart)) {
          reset();
        }
      }

      drawSprites();
      
}   

function flyBird(){
    if(keyDown("space")) {
     bird.velocityY = -9.3;
      }
      bird.velocityY = bird.velocityY + 0.92
    
}
function reset(){
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  
  upPipesGroup.destroyEach();
  downPipesGroup.destroyEach();
  score = 0;
  
}


function spwanUpPipes() {
    if (frameCount % 27 === 0) {
      var upPipes = createSprite(650,random(420,500));
      upPipes.addImage(uppipeImg);
      upPipes.scale = 1.3;
      upPipes.velocityX = -5;
      
       ground.depth=upPipes.depth
       ground.depth+=1
      
      upPipesGroup.add(upPipes);
    }
    
  }
  
function spwanDownPipes() {
    if (frameCount % 27 === 0) {
      var downPipes = createSprite(650,random(10,50))
      downPipes.addImage(downpipeImg);

      downPipes.scale = 1.3;

      downPipes.velocityX = -5;
      downPipesGroup.add(downPipes);
    }
    
  }

  