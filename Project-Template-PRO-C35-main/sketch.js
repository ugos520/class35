var Balloon,balloonImage1,balloonImage2;
var db;
var bposition;
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadImage("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon2.png",
   "hotairballoon3.png");
  }

function setup() {
  db=firebase.database();
  createCanvas(1500,700);

  Balloon=createSprite(250,450,150,150);
  Balloon.addImage(balloonImage1);
  Balloon.scale=0.5;

  textSize(20); 

  var position=db.ref('Balloon/position');
    position.on("value",readposition,showerror);
}

function draw() {
  background(bg);
  if(keyDown(LEFT_ARROW)){
    Balloon.addAnimation("hotAirBalloon",balloonImage2);
    writeposition(-10,0);  }
  else if(keyDown(RIGHT_ARROW)){
    Balloon.addAnimation("hotAirBalloon",balloonImage2);
    writeposition(10,0);  }
  else if(keyDown(UP_ARROW)){
    Balloon.addAnimation("hotAirBalloon",balloonImage2);
    Balloon.scale=Balloon.scale -0.01;
    writeposition(0,-10);  }
  else if(keyDown(DOWN_ARROW)){
    Balloon.addAnimation("hotAirBalloon",balloonImage2);
    writeposition(0,+10);  }

  drawSprites();

  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function readposition(data){
  bposition=data.val();
  Balloon.x=bposition.x;
  Balloon.y=bposition.y;
}

function writeposition(x,y)
{
  db.ref('Balloon/position').set({
'x':bposition.x+x,
'y':bposition.y+y
  });
}

function showerror(){
console.log("Error in Writing to Database")
}
