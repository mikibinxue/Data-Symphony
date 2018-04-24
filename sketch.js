//the edge of the bouncing createCanvas
var width_edge = 700;
var height_edge = 700;

//to change the background color according to day in the week
var r=100;
var g=100;
var b=100;

var emojis = [];
var speciallist1 = [];
var speciallist2 = [];
var speciallist3 = [];
var speciallist4 = [];
var speciallist5 = [];

var data;
var ball;
var  directions = [];
var activities = [];
var places = [];
var days = [];
var times = [];
var counter = 0;
var data_length = 500;
//for sounds
var attackLevel = 1.0;
var releaseLevel = 0;

var attackTime = 0.001
var decayTime = 0.2;
var susPercent = 0.7;
var releaseTime = 0.6;

var effect1_play = false;
var effect2_play = false;
var effect3_play = false;
var effect4_play = false;
var effect5_play = false;

//
var sounds = [];
var osc, env, fft;


var scaleArrays = [];
var scaleArray = [50,53,55,56,57,48,50];
//blues music scale
var scaleArray1 = [50,53,55,56,57,48,50];
//chinese music scale
var scaleArray2 = [72,76,78,79,83,72,76];
//arabic scale
var scaleArray3 = [48,50,52,53,54,56,58];
//major music scaleArray
var scaleArray4 = [60,62,64,65,69,71,60];


var note = 0;


//for effect
var counter1= 0;
var counter2= 0;
var counter3= 0;
var counter4= 0;
var counter5= 0;


//load font
var fontBold;
var fontRegular;
var fontLight;


function preload(){
  data = loadJSON("parsed2.json");
  // loadJSON("parsed2.json", gotData, "json");

//load fontBold
fontBold = loadFont("data/RobotoMono-Medium.ttf");
fontRegular = loadFont("data/RobotoMono-Light.ttf");
fontLight = loadFont("data/RobotoMono-ThinItalic.ttf");

       //load sounds
         var mysounds = ['3-drum.wav', 'prism-2.mp3', 'veil.mp3','squiggle.mp3','7-kua.wav']

         mysounds.forEach(function(sound){
           sounds.push(loadSound(`data/${sound}`))
         })


}


function setup() {
   createCanvas(1200,800);

   //setup music scale
   scaleArrays.push(scaleArray1);
   scaleArrays.push(scaleArray2);
   scaleArrays.push(scaleArray3);
   scaleArrays.push(scaleArray4);

   for(let i=0; i<data_length; i++){
     //to createvectors for the directions
     let temp_direction = createVector(data[i+1].lat-data[i].lat,data[i+1].lng-data[i].lng);
     temp_direction.normalize();
     //make the direction longer according to duration
     let duration = data[i].duration;

     temp_direction.mult(1/duration*200);
     //push it to the list
     directions.push(temp_direction);

     //to create activity
     //STILL: 0, null:1,IN_VEHICLE:2,ON_FOOT:3, TILTING:4,ON_BICYCLE:5,UNKNOWN:6
     let temp_activity;
     if(data[i].activity == "STILL"){
       temp_activity = 0;
     }else if(data[i].activity == "null"){
       temp_activity = 1;
     }else if(data[i].activity == "IN_VEHICLE"){
       temp_activity = 2;
     }else if(data[i].activity == "ON_FOOT"){
       temp_activity = 3;
     }else if(data[i].activity == "TILTING"){
       temp_activity = 4;
     }else if(data[i].activity == "ON_BICYCLE"){
       temp_activity = 5;
     }else if(data[i].activity == "UNKNOWN"){
       temp_activity = 6;
     }else{
       temp_activity = 7;
     }

     activities.push(temp_activity);

     //to store place,day, time
     let temp_place = data[i].placename;
     places.push(temp_place);

     //to store day
     let temp_day =data[i].day;
       days.push(temp_day);

       //to store time
     let temp_time =data[i].time;
    times.push(temp_time);


   }

   ball = new Ball();

//for sound
    osc = new p5.SinOsc();
 // Instantiate the envelope
 env = new p5.Env();

 // set attackTime, decayTime, sustainRatio, releaseTime
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
 // set attackLevel, releaseLevel
   env.setRange(attackLevel, releaseLevel);

osc.amp(env);
 osc.start();


 fft = new p5.FFT();


//mark the special places
 speciallist1 = ["The Food Emporium - supermarket","Hongkong Supermarket"];
 speciallist2 = ["starbucks","Happy Bones, Cafe","Jack's Wife Freda, Brunch","Sweet Greens - Salad","Feida Bakery","Five Senses, Korean Restaurant"];
 speciallist3=["Tandon","ITP","Andrew Heiskell Braille and Talking Book Library","Maker Space"];
 speciallist4 = ["dorm"];
 speciallist5 = ["Bear Mountain, rest","The Bear Mountain Train Station","Jingfong - Dimsum"];

}

function draw() {
  background(r,g,b,70);

  //change bacground color according to date
    //change the music scale according to date
if(days[counter%data_length] == "01"){
  scaleArray = scaleArrays[0];
  r =249;
  g=255;
  b=204;
  }
  else if(days[counter%data_length] == "02"){
      scaleArray = scaleArrays[1];
    r =128;
    g=0;
    b=128;
  }else if(days[counter%data_length] == "03"){
      scaleArray = scaleArrays[2];
    r =28;
    g=17;
    b=28;
  }else if(days[counter%data_length] == "04"){
      scaleArray = scaleArrays[3];
    r =246;
    g=240;
    b=255;
  }else if(days[counter%data_length] == "05"){
      scaleArray = scaleArrays[0];
    r =227;
    g=255;
    b=0;
  }else if(days[counter%data_length] == "06"){
      scaleArray = scaleArrays[1];
    r =100;
    g=100;
    b=100;
  }else if(days[counter%data_length] == "07"){
      scaleArray = scaleArrays[2];
    r =100;
    g=100;
    b=100;
  }else if(days[counter%data_length] == "08"){
      scaleArray = scaleArrays[3];
    r =100;
    g=100;
    b=100;
  }else if(days[counter%data_length] == "09"){
      scaleArray = scaleArrays[0];
    r =100;
    g=100;
    b=100;
  }else if(days[counter%data_length] == "10"){
      scaleArray = scaleArrays[1];
    r =100;
    g=100;
    b=100;
  }else{
      scaleArray = scaleArrays[2];
    r =100;
    g=100;
    b=100;
  }


  //visualization
  //a bit movement to kick off the movement
  let gravity = createVector(0,0.01);


//update data when ball hits the wall
  if(!ball.next){
    ball.applyForce(gravity);
  }else{
    counter ++;
    playsound();

    if(speciallist1.includes(places[counter%data_length])){
      effect1_play=true;
      if(!sounds[0].isPlaying()){
        sounds[0].play();
          console.log("song1");
      }

    }else if (speciallist2.includes(places[counter%data_length])) {
      effect2_play=true;
      if(!sounds[1].isPlaying()){
        sounds[1].play();
          console.log("song2");
      }

    }else if (speciallist3.includes(places[counter%data_length])) {
      effect3_play=true;
      if(!sounds[2].isPlaying()){
        sounds[2].play();
        console.log("song3");
      }

    }else if (speciallist4.includes(places[counter%data_length])) {
      effect4_play=true;
      if(!sounds[3].isPlaying()){
        sounds[3].play();
        console.log("song4");
      }

    }else if(speciallist5.includes(places[counter%data_length])){
      effect5_play=true;
      if(!sounds[4].isPlaying()){
        sounds[4].play();
        console.log("song5");
      }
    }


      ball.applyForce(directions[counter%data_length]);

  }

  ball.update();
  ball.display(activities[counter%data_length]);
  ball.checkEdges();


 //to play special effect
 if(effect1_play){
   effect1(counter1);
   counter1++;
   if(counter1>100){
     effect1_play = false;
     counter1=0;
   }
 }else if(effect2_play){
   effect2(counter2);
   counter2++;
   if(counter2>100){
     effect2_play = false;
     counter2=0;
   }
 }else if(effect3_play){
   effect3(counter3);
   counter3++;
   if(counter3>100){
     effect3_play = false;
     counter3=0;
   }
 }
 else if(effect4_play){
   effect4(counter4);
   counter4++;
   if(counter4>100){
     effect4_play = false;
     counter4=0;
   }
 }
 else if(effect5_play){
   effect5(counter5);
   counter5++;
   if(counter5>100){
     effect5_play = false;
     counter5=0;
   }
 }



 //display text on the background
 fill(255);
 noStroke();
 rect(width_edge,0,width-width_edge,height);

 //write text on top
 //title
 fill(0);
 textFont(fontBold);
 textSize(36);
 text("Data Symphony",width_edge+100,100);

 //how to read
 fill(100);
 textSize(22);
 text("How To Read",width_edge+100,150);

 //STILL: 0,blue rectangle
 push();
 rectMode(CENTER);
 fill(93,21,246);
 rect(width_edge+100,200, 30, 30);
 fill(0);
 textFont(fontRegular);
 textSize(18);
 text("not moving",width_edge+130,200);
 pop();

 //null:1,pink circle
 push();
 rectMode(CENTER);
 fill(255,178,247);
 ellipse(width_edge+300,200, 30, 30);
 fill(0);
 textFont(fontRegular);
 textSize(18);
 text("on the move",width_edge+330,200);
 pop();


 //IN_VEHICLE:2,mint triangle
 push();
 rectMode(CENTER);
fill(178,255,246);
 triangle(width_edge+80,260, width_edge+100,230,width_edge+120,260);
 fill(0);
 textFont(fontRegular);
 textSize(18);
 text("in vehicle",width_edge+130,250);
 pop();

 //ON_FOOT:3, blue foot print
 push();
 rectMode(CENTER);
 fill(21,196,243);
 ellipse(width_edge+300,250, 30, 30);
 fill(0);
 textFont(fontRegular);
 textSize(18);
 text("walking",width_edge+330,250);
 pop();

 //TILTING:4, light blue triangle
 push();
 rectMode(CENTER);
 fill(255,75,193);
 rect(width_edge+100,300,30,5);
 fill(0);
 textFont(fontRegular);
 textSize(18);
 text("making turns",width_edge+130,300);
 pop();

 //ON_BICYCLE:5 yellow cicles
 push();
 push()
 rectMode(CENTER);
 noFill();
 stroke(255,247,75);
 ellipse(width_edge+300,300, 30, 30);
 pop();
 fill(0);
 textFont(fontRegular);
 textSize(18);
 text("on bicyle",width_edge+330,300);
 pop();

 //explain the movement
 push();
 fill(0);
 textFont(fontLight);
 textSize(16);
 text("*direction of the ball is",width_edge+130,340);
 text("mapped from the actual direction",width_edge+130,360);
 text("from one place to the next",width_edge+130,380);
 pop();

 //data display
 fill(100);
 textSize(22);
 text("My Data",width_edge+100,450);

 fill(0);
 textFont(fontRegular);
 textSize(16);
 text(places[counter%data_length],width_edge+100,500);
 text("April "+days[counter%data_length],width_edge+100,530);
 text(times[counter%data_length],width_edge+100,560);

 //display special output
 if(effect1_play){
   highlight1();
 }else if(effect2_play){
   highlight2();
 }else if (effect3_play) {
   highlight3();
 }else if (effect4_play) {
   highlight4();
 }else if (effect5_play) {
   highlight5();
 }

}

function playsound(){
      //play sound
      var midiValue = scaleArray[note];
      var freqValue = midiToFreq(midiValue);
      osc.freq(freqValue);
      env.play();
      note = activities[counter%data_length];
}


function effect1(counter1){

  push();
  rectMode(CENTER);
  noStroke();
  translate(width_edge/2,height_edge/2);
  rotate(PI/5);
  fill(255,208,24);
  rect(-width_edge/4+counter1*3,height_edge/2-counter1*20,20,300);

  fill(255,208,24);
  rect(30-width_edge/4+counter1*3,height_edge/2+30-counter1*20,20,300);

  fill(255,208,24);
  rect(60-width_edge/4+counter1*3,height_edge/2-counter1*20,20,300);
  pop();
}

function effect2(counter2){
  noStroke();
  fill(204,255,14);
  ellipse(width_edge/2,-height_edge/2+abs(sin(counter2/50))*height_edge/2,width_edge,height_edge);

}

function effect3(counter3){
  push();
  translate(width_edge/2,height_edge/2);
  noStroke();
  fill(204,255,14);
  rectMode(CENTER);
  scale(abs(sin(counter3/70)));
  rotate(counter3/10);
  rect(0,0,width_edge/2,height_edge/2);
  pop();

}

function effect4(counter4){
  noStroke();
  fill(157,188,255);
  ellipse(abs(sin(counter4/500))*500,height_edge/2,40,40);
  ellipse(abs(sin(counter4/300))*500+50,height_edge/2+50,30,30);
  ellipse(abs(sin(counter4/300))*500,height_edge/2+100,40,40);

}

function effect5(counter5){
  push();
translate(width_edge/2,height_edge/2);
rectMode(CENTER);
strokeWeight(5);
stroke(254,255,117);
noFill();
rotate(counter5/35);
scale(abs(sin(counter5/80))*5);
triangle(-50,50,0,-50,50,50);
strokeWeight(2);
stroke(255,235,117);
rotate(counter5/30);
triangle(-50,50,0,-50,50,50);
pop();
}

function highlight1(){

    //display data on the side
    //background
    push();
    fill(255,208,24);
    rect(width_edge,480,width-width_edge,height-400);
    pop();
  //text
    push();
    stroke(0);
    fill(255);
    textSize(33);
    textFont(fontBold);
    text("SHOPPING!",width_edge+100,570);
    fill(255);
    textSize(16);
    text("at:",width_edge+100,600);
    text(places[counter%data_length],width_edge+100,620);
    pop();
}

function highlight2(){
  //background
  push();
  fill(204,255,14);
  rect(width_edge,480,width-width_edge,height-400);
  pop();
  //text
    push();
    stroke(0);
    fill(255);
    textSize(33);
    textFont(fontBold);
    text("YUM YUM",width_edge+100,570);
    fill(255);
    textSize(16);
    text("at:",width_edge+100,600);
    text(places[counter%data_length],width_edge+100,620);
    pop();
}

function highlight3(){

    //background
    push();
    fill(204,255,14);
    rect(width_edge,480,width-width_edge,height-400);
    pop();
    //text
      push();
      stroke(0);
      fill(255);
      textSize(33);
      textFont(fontBold);
      text("WORK HARD",width_edge+100,570);
      fill(255);
      textSize(16);
      text("at:",width_edge+100,600);
      text(places[counter%data_length],width_edge+100,620);
      pop();
}

function highlight4(){

    //background
    push();
    fill(157,188,255);
    rect(width_edge,480,width-width_edge,height-400);
    pop();
    //text
      push();
      stroke(0);
      fill(255);
      textSize(33);
      textFont(fontBold);
      text("FINALLY REST",width_edge+100,570);
      fill(255);
      textSize(16);
      text("at:",width_edge+100,600);
      text(places[counter%data_length],width_edge+100,620);
      pop();
}

function highlight5(){

  //background
  push();
  fill(157,188,255);
  rect(width_edge,480,width-width_edge,height-400);
  pop();
  //text
    push();
    stroke(0);
    fill(255);
    textSize(33);
    textFont(fontBold);
    text("DA BEST",width_edge+100,570);
    fill(255);
    textSize(16);
    text("at:",width_edge+100,600);
    text(places[counter%data_length],width_edge+100,620);
    pop();

}
