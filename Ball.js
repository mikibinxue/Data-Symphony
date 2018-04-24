class Ball{
  constructor(){
  this.mass = 1;
  this.pos = createVector(width_edge/2, height_edge/2);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.next = false;
  }


  applyForce(force){
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(20);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display(nbr) {
    noStroke();
    //fill in different color according to activity
     //STILL: 0, null:1,IN_VEHICLE:2,ON_FOOT:3, TILTING:4,ON_BICYCLE:5,UNKNOWN:6
    if(nbr ==0){
      //STILL: 0,blue rectangle
      fill(93,21,246);
      rect(this.pos.x, this.pos.y, this.mass * 50, this.mass * 50);

    }else if (nbr ==1) {
      //null:1,pink circle
      fill(255,178,247);
      ellipse(this.pos.x, this.pos.y, this.mass * 80, this.mass * 80);

    }else if (nbr ==2) {
      //IN_VEHICLE:2,mint triangle
      fill(178,255,246);
      triangle(this.pos.x-15,this.pos.y-15,this.pos.x+15,this.pos.y+15,this.pos.x,this.pos.y);

    }else if (nbr ==3) {
      //ON_FOOT:3, blue foot print
      fill(21,196,243);
      //big circle
      ellipse(this.pos.x, this.pos.y, this.mass * 40, this.mass * 40);

    }else if (nbr ==4) {
      //TILTING:4, light blue triangle
      fill(178,255,246);
      // triangle(30, 75, 58, 20, 86, 75);
      triangle(this.pos.x-15,this.pos.y-15,this.pos.x,this.pos.y+15,this.pos.x+15,this.pos.y-15);
      //console.log("here");
    }else if (nbr ==5) {
      //ON_BICYCLE:5 yellow cicles
      stroke(255);
      strokeWeight(10);
      noFill();
      ellipse(this.pos.x-15, this.pos.y, this.mass * 50, this.mass * 50);
    }else if (nbr ==6) {
      //UNKNOWN:6 black hollow
      noFill();
      stroke(0);
      ellipse(this.pos.x, this.pos.y, this.mass * 50, this.mass * 50);

    }

  }


  checkEdges() {
    if((this.pos.x > width_edge)||(this.pos.x < 0)||(this.pos.y > height_edge)||(this.pos.y <0)){
        this.next = true;
    }else{
      this.next = false;
    }

    if (this.pos.x >= width_edge) {
      this.pos.x = width_edge;
      this.vel.x *= -1;
    } else if (this.pos.x <= 0) {
      this.vel.x *= -1;
      this.pos.x = 0;
    }

    if (this.pos.y >= height_edge) {
      this.vel.y *= -1;
      this.pos.y = height_edge;
    }else if (this.pos.y <= 0) {
      this.vel.y *= -1;
      this.pos.y = 0;
    }

 }
}
