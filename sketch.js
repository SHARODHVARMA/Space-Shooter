var bg, bgImg;
var player, non_player
var playerImg, non_playerImg;
var obstacle, obstacleImg;
var score = 0;
var life = 3;
var bullets = 70;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var bullet, bulletImg;
var gameState = "Start";
var loose, winning, blast;
var restart, restartImg;
var non_player_group,bullet_group;

function preload(){
    heart1Img = loadImage("images/heart1.png");
    heart2Img = loadImage("images/heart2.png");
    heart3Img = loadImage("images/heart3.png");
    playerImg = loadImage("images/player.png");
    non_playerImg = loadImage("images/non-player.png");
    bgImg = loadImage("images/bg.png");
    bulletImg = loadImage("images/fire bullet.png");
    restartImg = loadImage("images/restartImg.png");

}

function setup(){
    createCanvas(windowWidth, windowHeight);
    player = createSprite(windowWidth/2, windowHeight - 100, 10, 10);
    player.addImage(playerImg);
    player.scale = 0.2;
    
    

    heart1 = createSprite(windowWidth - 100, 50, 10, 10);
    heart1.addImage(heart1Img);
    heart1.scale = 0.2;
    heart1.visible = false;

    heart2 = createSprite(windowWidth - 100, 50, 10, 10);
    heart2.addImage(heart2Img);
    heart2.scale = 0.2;
    heart2.visible = false;

    heart3 = createSprite(windowWidth - 100, 50, 10, 10);
    heart3.addImage(heart3Img);
    heart3.scale = 0.2;
    heart3.visible = false;

    restart = createSprite(windowWidth/2, windowHeight - 300);
    restart.addImage(restartImg);
    restart.visible = false;

    non_player_group = new Group();

    bullet_group = new Group();

}

function draw(){
    background(bgImg);
    textSize(15);
    fill("WHITE");
    text("Bullet : "+bullets, windowWidth - 150, 20);
    text("Score : "+score, windowWidth - 250, 20);
    spawn_non_player();
    
    if(keyWentDown("SPACE") && bullets > 0){
        bullets = bullets - 1;
        spawn_bullets();
    }
    if(non_player_group.isTouching(player)){
      life = life - 1;
      non_player_group.destroyEach();
    }
    
    if(life < 1){
      player.visible = false;
      restart.visible = true;
      bullets.visible = false;
      non_player_group.visible = false;
      textSize(100);
      text("Game End",windowWidth/2 - 50, windowHeight/2 - 50);
    }

    if(mousePressedOver(restart)){
        restart.visible = false;
        player.visible = true;
        non_player_group.visible = true;
        bullet_group.visible = true;
        life = 3;
        bullets = 70;
        score = 0;
    }

    if(life === 3){
        heart3.visible= true;
        heart2.visible= false;
        heart1.visible= false;
    }

    if(life === 2){
        heart3.visible= false;
        heart2.visible= true;
        heart1.visible= false;
    }

    if(life === 1){
        heart3.visible= false;
        heart2.visible= false;
        heart1.visible= true;
    }

    if(life === 0){
        heart3.visible= false;
        heart2.visible= false;
        heart1.visible= false;
    }
    
    if(non_player_group.isTouching(bullet_group)){
        score = score + 10;
        non_player_group.destroyEach();
    }

    if(bullets < 1 && life > 2){
        bullets = 70;
    }
    
    
    if(keyDown("up")){
player.y=player.y-10;
}

if(keyDown("DOWN")){
    player.y = player.y+10;
}

if(keyDown("RIGHT")){
    player.x = player.x+10;
}

if(keyDown("LEFT")){
    player.x = player.x-10;
}

    drawSprites();
    
}

function spawn_non_player(){
    if(frameCount%300 == 0){
        var r = Math.round(random(200, 1200));
        non_player = createSprite(r, windowHeight/6, 10, 10);
        non_player.addImage(non_playerImg);
        non_player.scale = 0.2;
        non_player.velocityY = 6;
        non_player_group.add(non_player);
    }
}

function spawn_bullets(){
    bullet = createSprite(10, 10, 50, 20);
    bullet.x = player.x;
    bullet.y = player.y;
    bullet.addImage(bulletImg);
    bullet.velocityY = -6;
    bullet.scale = 0.09;
    player.depth = bullet.depth;
    player.depth = player.depth + 1
    bullet_group.add(bullet);
}