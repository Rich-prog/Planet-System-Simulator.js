var planets;
var myCamera;
var myStroke;

function setup() {
  createCanvas(1000, 1000);
  noStroke();
  planets = new Sun(0);
  myCamera = new Camera();
  planets.spawnChild();
}

function draw(){
  background(0);
  drawText(10,20);
  
  if (keyIsDown(RIGHT_ARROW)){
      myCamera.move(-1,0);
    }
    if (keyIsDown(LEFT_ARROW)){
      myCamera.move(1,0);
    }
    if (keyIsDown(UP_ARROW)){
      myCamera.move(0,1);
    }
    if (keyIsDown(DOWN_ARROW)){
      myCamera.move(0,-1);
    }
    
    if (keyIsDown(107)){
      myCamera.addZoom(0.01);
    }
    
    if (keyIsDown(109)){
      myCamera.addZoom(-0.01);
    }
  
  translate(width/2,height/2);
  scale(myCamera.zoom);
  translate(myCamera.x, myCamera.y);
  
  myStroke = 2/myCamera.zoom;
  strokeWeight(myStroke);
  planets.draw();
}

class Planet{
  constructor(parent){
    this.scale = parent.scale * 0.14;
    this.depth = parent.depth + 1;
    this.angle = random(PI*2);
    this.rad = parent.rad * random(0.1, 0.5);
    this.dist = random(500,4000) * this.scale;
    this.mass = PI * this.rad * this.rad;
    this.vel = sqrt(parent.mass/this.dist) * 0.0025;
    this.spawnChance = 3;
    
    this.colour = color(random(200,255),random(100,255),random(100,255));
    this.planets = [];
  }
  
  draw(){
    push();
    noFill();
    stroke(100);
    ellipse(0,0,this.dist*2);
    rotate(this.angle);
    translate(this.dist,0);
    
    this.show();
    this.spin();
    
    for(var planet of this.planets){
      planet.draw();
    }
    pop();
  }
  
  show(){
    stroke(255);
    fill(this.colour, 100);
    ellipse(0,0,this.rad * 2);
  }
  
  spin(){
    this.angle += this.vel;
  }
  
  
  spawnChild(){
      let r = int(random(this.spawnChance));
      for(var i = 0; i < r;i++){
        this.planets[i] = new Planet(this);
      }
      
      if(this.depth < 4){ 
        for(var planet of this.planets){
          planet.spawnChild(this.rad);
        }
      }
  }
}

class Sun extends Planet{
  constructor(){
    super(dist);
    this.rad = 20;
    this.mass = PI * this.rad * this.rad;
    this.planets = [];
    this.angle = 0;
    this.dist = 0;
    this.spawnChance = 12;
    this.depth = 0;
    this.scale = 1;
  }
}

class Camera{
  constructor(){
    this.x = 0;
    this.y = 0;
    this.zoom = 1; 
    this.speed = 10;
  }
  
  addZoom(x){
    this.zoom = constrain(this.zoom + x,1,100);
  }
  
  move(dx,dy){
    this.x += dx * this.speed * (1/this.zoom);
    this.y += dy * this.speed * (1/this.zoom);
  }
}

function drawText(xPos,yPos){
  var y = yPos;
  var x = xPos;
  noFill();
  stroke(255);
  strokeWeight(1);
  textSize(16);
  text('Arrow Keys :  Move \n                + :  Zoom in \n                 - :  Zoom out', x,y);
}



