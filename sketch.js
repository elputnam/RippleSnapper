let swarm = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  let num = width*0.02;
  for (let i = 0; i < num; i++){
    swarm.push(new Element());
  }
  frameRate(15);
}

function draw() {
  background(random(80,120), 50, 100, 30);
  for (let i = 0; i < swarm.length; i++){
    swarm[i].update();
    swarm[i].display();
  }
}

class Element{
  constructor(){
    this.angle = createVector();
    this.vel = createVector(0, 0);
    this.amp = createVector(random(20, width/2), random(20, height/2));
    this.H1 = random(200,300);
    this.H2 = random(0,50);
  }

  update(){
    this.accel = createVector(random(-0.05, 0.05), random(-0.05, 0.05));
    this.vel.add(this.accel);
    this.angle.add(this.vel);
    this.rad = random(height*.02, height*.05);
    this.len = random(4, 6);
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
    line(mouseX,  mouseY, x*(width/2), y*(height/2));
  }
}