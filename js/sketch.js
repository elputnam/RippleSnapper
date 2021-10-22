let swarm = [];

var capture = false; // default is to not capture frames, can be changed with button in browser
var capturer = new CCapture({
  format:'gif', 
  workersPath: 'js/',
  framerate: 15
});

const NUM_FRAMES = 640;

function setup() {
  // let c = createCanvas(windowWidth, windowHeight);
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100, 100);
  let num = width*0.02;
  for (let i = 0; i < num; i++){
    swarm.push(new Element());
  }
  frameRate(15);
}

function draw() {
  if (capture && frameCount==1) capturer.start(); // start the animation capture
  background(random(80,120), 50, 100, 30);
  for (let i = 0; i < swarm.length; i++){
    swarm[i].update();
    swarm[i].display();
  }

  //capture details
  if (capture){
    capturer.capture( canvas ); // if capture is 'true', save the frame
    if (frameCount-1 == NUM_FRAMES){ //stop and save after NUM_FRAMES
        capturer.stop(); 
        capturer.save(); 
        noLoop(); 
    }
}
}

function keyPressed() {
  if (key == 's' || key == 'S'){
   saveFrames('RippleSnapper', 'jpg', 1, 15);
  }
}

class Element{
  constructor(){
    this.angle = createVector();
    this.vel = createVector(0, 0);
    this.amp = createVector(random(20, width/2), random(20, height/2));
    this.H1 = random(200,300);
    this.H2 = random(0,50);
    this.rad = random(height*.02, height*.05);
    this.len = random(4, 6);
  }

  update(){
    this.accel = createVector(random(-0.01, 0.01), random(-0.01, 0.01));
    this.vel.add(this.accel);
    this.angle.add(this.vel);
  }

  display(){
    let x = sin(this.angle.x) * this.amp.x;
    let y = sin(this.angle.y) * this.amp.y;

    push();
    translate(width/2, height/2);
    stroke(this.H1, random(100), random(100));
    noFill();
    for (let i = 0; i < this.rad; i++){
      circle(x, y, this.len * i);
      }
    
    pop();
    stroke(this.H2, random(100), random(100));
    // line(mouseX,  mouseY, x*(width/2), y*(height/2));
    line(width/2, height/2, x*(width/2), y*(height/2));
  }
}

function buttonPress()
{
    if (capture == false) {
        capture = true;
        document.getElementById("myButton").value='Saving Frames... Press Again to Cancel'; 
        frameCount = 0;
    } else {
        location.reload(); //refresh the page (starts animation over, stops saving frames)
    }
}