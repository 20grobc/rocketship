// Name any p5.js functions we use in the global so Glitch can recognize them.    *
// Add to this list as you consult the p5.js documentation for other functions,
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, createSprite loadAnimation, round, CENTER
          color, random, rect, ellipse, stroke, image, loadImage, keyCode, frameCount drawSprites loadSpriteSheet, textFont, setVolume, createButton
          collideCircleCircle, text, textSize, mouseX, mouseY, strokeWeight, line, key, animation, keyIsPressed, loadFont, imageMode, textAlign
          mouseIsPressed, windowWidth, LEFT_ARROW, RIGHT_ARROW, windowHeight, collideRectCircle noStroke, UP_ARROW DOWN_ARROW, CORNER, loadSound*/

//declaring variables
var rocket;
var rocketSpeed = 5; //5 miles per frame
var meteors = [];
var distance = 0;
var lives = 3;
var meteorCount = 0;
var meteorFrequency = 100;
var highscore = 0;
var gameOver = false;
var titleType;
var bodyType;
var galaxy;
var rocketPic;
var meteorPic;
var meteorPic2;
var meteorPic3;
var sunsetPic;
var mainTheme;
var start = false
var stage = 1;
var maxVelocity =4;
var winningDistance = 250;
var increment = 250;
var finalStage = 12;
var won = false;
var hitSound;
var planet;
var hitCount =0;

function preload() {
   titleType = loadFont('https://cdn.glitch.com/aef358d7-7214-4a03-9fb9-9e86984ee583%2FVermin%20Vibes%201989.ttf?v=1595959248801');
   bodyType = loadFont('https://cdn.glitch.com/aef358d7-7214-4a03-9fb9-9e86984ee583%2FGamer.ttf?v=1595959353844');
   galaxy = loadImage('https://cdn.glitch.com/aef358d7-7214-4a03-9fb9-9e86984ee583%2Fpixil-frame-0.png?v=1595971442318');
   rocketPic = loadImage('https://cdn.glitch.com/b69d07ad-5d51-4b64-94ef-7cf8c18fb183%2F780c496f-3cc0-4610-8100-fdd4d494ac8c_rocket2-1.png.png?v=1596041096091');
   meteorPic = loadImage('https://cdn.glitch.com/b69d07ad-5d51-4b64-94ef-7cf8c18fb183%2F780c496f-3cc0-4610-8100-fdd4d494ac8c_Meteor_two-1.png.png?v=1596040889449');
   meteorPic2 = loadImage('https://cdn.glitch.com/b69d07ad-5d51-4b64-94ef-7cf8c18fb183%2F780c496f-3cc0-4610-8100-fdd4d494ac8c_Meteor_three-1.png.png?v=1596040867960');
   meteorPic3 = loadImage('https://cdn.glitch.com/b69d07ad-5d51-4b64-94ef-7cf8c18fb183%2F780c496f-3cc0-4610-8100-fdd4d494ac8c_Meteor-1.png%20(1).png?v=1596040864062');
   sunsetPic = loadImage('https://cdn.glitch.com/b69d07ad-5d51-4b64-94ef-7cf8c18fb183%2F541df746fb87996ad2ab1dfbea249cea.png?v=1596045470182');
   mainTheme = loadSound('https://cdn.glitch.com/b69d07ad-5d51-4b64-94ef-7cf8c18fb183%2F8BitRocketSong1.wav?v=1596044826765');
   planet = loadImage('https://cdn.glitch.com/00f1bc12-a275-4de3-8a3c-83207e0640df%2FpurplePlanet-1.png%20(1).png?v=1596181321744');
   //hitSound = loadSound('https://cdn.glitch.com/00f1bc12-a275-4de3-8a3c-83207e0640df%2Fdownload.wav?v=1596176603613');
  
}

//sets up the canvas and creates the bird and the pipe
function setup() {
  var cnv = createCanvas(360, 600);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  
  
  image(galaxy, 0, 0);
  rocket = new Rocket();
  mainTheme.play();
  mainTheme.setVolume(.1);
    
  }
  


//draws the rocket and meteors
function draw() {
  image(galaxy, 0, 0);
  rocket.show();
  rocket.update();

   //checks if there should be more meteors, if so, it makes them spawn more
  
  
  
  

  //adds a meteor to the screen after every meteorFrequency frames
  if (frameCount % meteorFrequency == 0 && !gameOver && start) {
    meteors.push(new Meteor());
  } //adds distance every 25 frames
  if (frameCount % 25 == 0 && !gameOver && start) {
    distance += rocketSpeed;
  }

  //loop to show and move every meteor
  for (var i = meteors.length - 1; i >= 0; i--) {
    meteors[i].show(); //drawing the meteor
    meteors[i].update(); // moving the meteor

    //checking if the meteor hits the rocket, and acts accordingly
    if (meteors[i].hits(rocket)) {
      textFont(bodyType);
      textAlign(CENTER);
      textSize(100);
      text("HIT", width/2, height/2);
       //hitSound.play();
      meteors[i].y = height + 32; //moves the meteor off screen
      if (!gameOver) {
        lives = lives - 1;
        hitCount++;
      }
      if (lives <= 0) {
        gameOver = true;
      }
      //meteorSpeed = 2;
    }

    if (meteors[i].offscreen()) {
      meteors.splice(i, 1);
      meteorCount++;
      //speedier();
      console.log("meteor count" + meteors.length);
    }
  }
  // I requested to join
  //  join mine
   //draws all the stats and the title on the screen
  textFont(bodyType);
  textSize(20);
  textAlign(CORNER);
  text(`Distance : ${distance} miles`, 20, 20);
  text(`Lives : ${lives}`, 20, 40);
  if(!start){ //directions at the beggining of the game
    textAlign(CENTER);
    text("Greetings Space Commander, your mission is to ", width/2, height/2-90);
    text("orbit Planet Noche Morada .", width/2, height/2-75);
    
    text('Press m to mute', width/2, height/2 - 40);
    text('Use left and right arrow keys to move', width/2, height/2 - 20);
    text('Avoid meteors at all cost', width/2, height/2);
    text('Your ship will regain 1 health at the end \n of each stage', width/2, height/2 + 20);
    
    text('Press the SpaceBar to Start', width/2, height - 150);
    text("Goodluck Commander.", width/2, height-170);
    
    textAlign(CORNER);
  }
  //if game is over, display game is over text
  
  if (rocket.checkWin()) {
    if(frameCount % 303 == 0 && !won){
      setTimeout(restart, 1000);
    }
    
    else{
    textAlign(CENTER);
    textSize(30);
    textFont(titleType);
    if (stage != finalStage){
      text(`Stage ${stage} Complete`, width / 2, height / 2 + 20);
      textSize(15);
      text(`Stage ${stage +1} Incoming`, width / 2, height / 2 + 60);
    }
    textAlign(CORNER);
    }
  }
  else if (gameOver) {
    textAlign(CENTER);
    textSize(30);
    textFont(titleType);
    text("Game Over", width / 2, height / 2);
    displayStats();
  } 
  if (won){ //text drawn if player finishes the game
    imageMode(CENTER);
    image(planet, width/2, height/2);
    
    textAlign(CENTER);
    textSize(25);
    textFont(titleType);
    text('Great Job space commander', width/2, height/2);
    textSize(30);
    text('You made it', width/2, height/2 + 20);
    displayStats();
  }
  
  textAlign(CORNER);
  textFont(titleType);
  textSize(30);
  text('Rocket Ship', 180, 25);
  
 
} // end of draw function

function levelup (){
  stage += 1;
  winningDistance += increment;
  speedier();
  if (stage == 4){
    maxVelocity++;
  }
  if (stage == 9){
    increment += 50;
  }
  
}

function displayStats(){
  //display stats
    textAlign(CENTER);
    textSize(18);
    textFont(bodyType);
    var meteorsDodged;
    meteorsDodged = meteorCount - hitCount;
    if (meteorsDodged < 0){
      meteorsDodged = 0;
    }
    text(`Meteors Dodged: ${meteorsDodged}`, width/2, height/2 + 100);
    text(`Total hits taken: ${hitCount}`, width/2, height/2 + 120);
    text(`Stage: ${stage}`, width/2, height/2 + 140);
    
}

// show how much time is left till takeoff
function countdown(){
   start = true
     //console.log("In countdown function");
    return;
  }
  //setTimeout(function(){ text(`${3}`, width/2, height/2); }, 1000);
  console.log("In countdown");

function launch (){
  start = true
}

//increases the amount of meteors that are spawned
function speedier() {
  //if (distance % 200 == 0 && distance != 0 && frameCount % 20 == 0) {
    if (meteorFrequency > 18) {
      meteorFrequency = round(meteorFrequency*.82);
    }
    //console.log("adding speed");
    //console.log("Meteor Frequency: " + meteorFrequency)
  //}
}

//moves the rocket left or right when key is pressed
function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    rocket.left();
    //console.log("LEFT");
  }
  if (keyCode == RIGHT_ARROW) {
    rocket.right();
    //console.log("RIGHT");
  }
  if (keyCode == DOWN_ARROW) {
    setVolume(0);
    //console.log("RIGHT");
  }
}

function keyTyped(){
  if (key == ' ') {

  countdown();
  }
  //mutes and unmutes the music
  if (key == 'm') {
    if (mainTheme.isPlaying()){
      mainTheme.pause();
    }
    else{
      mainTheme.play();
    }
  }
}
  


function keyReleased() {
  if (keyCode == LEFT_ARROW) {
    rocket.velocity = 0;
  }
  if (keyCode == RIGHT_ARROW) {
    rocket.velocity = 0;
  }
}

//Rocket class
function Rocket() {
  //sets x and y position
  this.y = height - 55;
  this.x = width / 2;
  this.width = 32;

  //sets movement variables
  this.velocity = 0;

  //draws the rocket
  this.show = function() {
    fill(255);
    //rect(this.x, this.y, this.width, this.width);
    image(rocketPic, this.x, this.y, 32, 32);
    
  };

  //moves to the left
  this.left = function() {
    this.velocity = -1;
  };

  //moves to the right
  this.right = function() {
    this.velocity = 1;
  };

  //moves the rocket accordingly
  this.update = function() {
    this.x += this.velocity;
    this.velocoty *= 0.9;
    if (keyIsPressed == true && this.velocity < maxVelocity && this.velocity > -4) {
      this.velocity *= 1.05;
    }

    //stops once it reaches the left
    if (this.x + this.width >= width) {
      this.x = width - this.width;
      this.velocity = 0;
    }

    //stops the rocket from going over the right
    if (this.x < 0) {
      this.x = 0;
      this.velocity *= 0.8;
    }
  };

  //checks if the player won and returns true if so
  this.checkWin = function() {
    if (distance >= winningDistance && lives > 0) {
      gameOver = true;
      return true;
    } else {
      return false;
    }
  };
}

//Meteor class
function Meteor() {
  this.x = random(width);
  this.y = 0;
  this.diameter = random(20, 60);
  if (this.diameter <= 35) {
    this.speed = 5;
    this.style = meteorPic;
  } else if (this.diameter <= 48) {
    this.speed = 3;
    this.style = meteorPic2;
  } else {
    this.speed = 2;
    this.style = meteorPic3;
  }

  //draws the meteor at the x,y position
  this.show = function() {
    fill(255);
    //ellipse(this.x, this.y, this.diameter, this.diameter);
    imageMode(CENTER);
    image(this.style, this.x, this.y, this.diameter, this.diameter);
  };

  //moves the meteor accordingly
  this.update = function() {
    if (!gameOver) {
      this.y += this.speed;
    }
  };

  //returns true if the rocket hits the meteor
  this.hits = function(rocket) {
    let hit = collideRectCircle(
      rocket.x,
      rocket.y,
      rocket.width,
      rocket.height,
      this.x,
      this.y,
      this.diameter
    );
    if (hit) {
      return true;
      console.log("HIT");
    } else {
      return false;
    }
  };

  //returns true if the meteor goes off the bottom of the screen
  this.offscreen = function() {
    if (this.y - this.diameter/2 > height) {
      return true;
    } else {
      return false;
    }
  };
}

function restart(){
  meteors.splice(0, meteors.length)
  gameOver = false;
  if (lives != 3){
    lives += 1;
  }
  if (stage < finalStage){
    levelup();
  }
  else{
    gameOver = true;
    won = true;
    console.log('you won the game!');
    return;
  }
}
