var webPages = {
  tabsCount: 2,
  currentTab: 0,
  tabsArray: [[1000,500,100,100,100], [1000,500,200,0,0]],
  loadTab: function() {
    print(webPages.currentTab)
    clear();
    /*if (webPages.currentTab == webPages.tabsCount) {
      counter1 = 0
    } */
    if (webPages.currentTab == webPages.tabsCount) {
      counter1 = 0
      stayButton.button.show()
      swerveButton.button.show()
      myP.show()
      webPages.currentTab = 0
    } else {
      counter1 = 800
      stayButton.button.hide()
      swerveButton.button.hide()
      myP.hide()
      createCanvas(windowWidth,windowHeight)
      //createCanvas(webPages.tabsArray[webPages.currentTab][0],webPages.tabsArray[webPages.currentTab][1])
      background(webPages.tabsArray[webPages.currentTab][2],webPages.tabsArray[webPages.currentTab][3],webPages.tabsArray[webPages.currentTab][4])
      webPages.currentTab += 1
    }
  }
}

var switchTabButton;

function setup() {
  angleMode(DEGREES);
  let h2 = createElement('h2','The Ethics of Self-Driving Cars');
  myP = createP('Should the self-driving car prioritize the life of the driver, or should it reduce the loss of life at the expense of the driver?');
  createCanvas(windowWidth,windowHeight);
  background(200);
  //makes the button for the straight option
  stayButton.button = createButton(stayButton.text);
  stayButton.button.position(xPosition-20, 620);
  stayButton.button.mousePressed(stayButton.pressed);
  //makes the button for the swerve option
  swerveButton.button = createButton(swerveButton.text);
  swerveButton.button.position(xPosition+50, 620);
  swerveButton.button.mousePressed(swerveButton.pressed);

  switchTabButton = createButton("switch tab");
  switchTabButton.position(20, 110);
  switchTabButton.mousePressed(webPages.loadTab);
}

var swerveStayResults = {
  swerve: 0,
  stay: 0
}

var stayButton = {
  text: "Stay",
  resetToggled: false,
  pressed: function(){
    if (this.resetToggled == true) {
      resetToggled = false
      this.text = "Stay"
    } else {
      if (confirm('You just decided to sacrifice the driver to save 2 lives. 1 person will die. ARE YOU SURE?') == true) {
        swerveStayResults.stay ++
        counter1 = 699;
        updateCarLocation(false);
        fill(255,0,0);
        strokeWeight(1);
        makeX(xPosition+15,counter1/2+35)
        ethicsResultsGraph.updateGraph("stay")
        alert('The driver died in the accident')
        //this.resetToggled = true
        //this.text = "Reset"
        //this.button = createButton(this.text);
      }
    }
  }
}
var swerveButton = {
  text: "Swerve",
  pressed: function(){
    if (confirm('You just decided to kill 2 pedestrians to save the driver. 2 people will die. ARE YOU SURE?') == true) {
      swerveStayResults.swerve ++
      print(swerveStayResults.swerve)
      counter1 = 699;
      updateCarLocation(true);
      fill(255,0,0);
      strokeWeight(1);
      makeX(xPosition+80,480)
      makeX(xPosition+70,480)
      ethicsResultsGraph.updateGraph("swerve")
      alert('The two pedestrians died in the accident')
    }
  }
}

var counter1 = 0
var firstTime = true

var car = {
  makeCarBody: function(x,y) {
    fill(255,0,0);
    rect(x,y/2,20,50), rect(x,y/2+10,20,30)
    fill(0);
    rect(x-2,y/2+8,2,10), rect(x+20,y/2+8,2,10), rect(x-2,y/2+35,2,10), rect(x+20,y/2+35,2,10)
    fill(255,230,150);
    strokeWeight(0.5)
    ellipse(x+15,y/2+35,5,5)
    strokeWeight(0)
  }
}

var xPosition = 100
var myP;

var ethicsResultsGraph = {
  x: 250,
  y: 480,
  stayPercent: 40,
  updateGraph: function(selected) {
    print(selected)
    push();
    translate(this.x,this.y);
    let theStayPercent = (swerveStayResults.stay/(swerveStayResults.stay + swerveStayResults.swerve))*100
    print(theStayPercent)
    makeGraph(theStayPercent, 100 - theStayPercent);
    //(100 - stayPercent gives the swerve percent)
  }
};

function makeGraph(stay,swerve) {
  fill(0,255,255);
  strokeWeight(0.5);
  for (var i = 0; i > -1*stay; i-= 2) {
    rect(0,i,10,2)
  }
  fill(0,0,255);
  for (var y = 0; y > -1*swerve; y-= 2) {
    rect(20,y,10,2)
  }
}

function makeX(x,y) {
  push()
  translate(x+1,y-5);
  //translates so that middle of the x is the coordinate.
  rotate(45);
  rect(0,0,2,10)
  rect(-4,4,10,2)
  pop()
}

function updateCarLocation(swerveBool) {
  if (counter1 >= 700 && firstTime == true && counter1 < 800) {
    firstTime = false
    alert('Self-Driving cars will not make urgent decisions in an accident, like humans. They decide based on machine learning and their programming. Take your time.')
  }
  if (counter1 < 700) {
    strokeWeight(0);
    background(255);
    fill(230,200,80)
    rect(xPosition-20,480,60,5)
    //makes barricade
    fill(255,230,150);
    strokeWeight(0.5)
    ellipse(xPosition+80,480,5,5)
    ellipse(xPosition+70,480,5,5)
    strokeWeight(0)
    fill(0,255,255);
    drawArrow()
    fill(0,0,255)
    push()
    translate(xPosition+5,410)
    rotate(-20)
    translate(-xPosition+30,-400)
    drawArrow()
    pop()
    if (swerveBool) {
      push()
      //translate(xPosition,counter1)
      rotate(-10)
      car.makeCarBody(xPosition-40,counter1+20)
      pop()
    } else {
      car.makeCarBody(xPosition,counter1)
    }
    strokeWeight(0)
    counter1 += 3
  }
}

function draw() {
  updateCarLocation()
}

function drawArrow() {
  rect(xPosition+5,410,10,50)
  triangle(xPosition+10,475,xPosition-10,455,xPosition+30,455)
}
