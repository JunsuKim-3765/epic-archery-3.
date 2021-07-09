const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase;
var computer, computerBase;
var playerArrow,computerArrow;
//Declare an array for arrows playerArrows = [ ]
var playerArrows = [];
var computerArrows = [];
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new PlayerBase(300, random(450, height - 300), 180, 150);
  player = new Player(285, playerBase.body.position.y - 153, 50, 180);
  playerArcher = new PlayerArcher(
    340,
    playerBase.body.position.y - 180,
    120,
    120
  );

  computerBase = new ComputerBase(
    width - 300,
    random(450, height - 300),
    180,
    150
  );
  computer = new Computer(
    width - 280,
    computerBase.body.position.y - 153,
    50,
    180
  );
  computerArcher = new ComputerArcher(
    width - 340,
    computerBase.body.position.y - 180,
    120,
    120
  );
  
 computerArrow=new ComputerArrow(width-300,computerBase.body.position.y - 180,100,10);
 playerArrow=new PlayerArrow(350,playerBase.body.position.y - 180,100,10)


}

function draw() {
  background(180);

  Engine.update(engine);

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);

 
  playerBase.display();
  player.display();
  
  computerBase.display();
  computer.display();
  
  playerArcher.display();
  computerArcher.display()
  
  playerArrow.display();
  //computerArrow.display();
 // Use for loop to display arrow using showArrow() function
 showArrows();
 keyPressed();
 keyReleased();
}

function keyPressed() {

  if(keyCode === 32){
    // create an arrow object and add into an array ; set its angle same as angle of playerArcher
      var playerArrow = new PlayerArrow(playerArcher.body.position.x, playerArcher.body.position.y);
      playerArrows = [];
      var angle=playerArcher.body.angle+PI/2  
      Matter.Body.setAngle(playerArrow.body, angle);
      playerArrows.push(playerArrow);
    }
  }
function keyReleased () {
  if(keyCode === 32){
    //call shoot() function for each arrow in an array playerArrows
    if(playerArrows.length){
      var angle=playerArcher.body.angle+PI/2  
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
    }
  }
//Display arrow and Tranjectory
function showArrows(index, playerArrows) {
  if (playerArrow.body.position.x >= width || playerArrow.body.position.y >= height - 50) {
    Matter.World.remove(world, playerArrow.body);
    playerArrows.splice(index, 1);
  }
}
