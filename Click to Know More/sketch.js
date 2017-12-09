/*
Title: AI: What and How?
Imagined, Designed, and Programmed by: Daniel Santana
Date: 12/15/17
Description: A web page that intuitively explains AI.
Sources of ideas and inspiration (title, author, URL):
 * The Nature of Code, Dan Shiffman, https://www.youtube.com/watch?v=ntKn5TPHHAk
 *
 *

Includes code from (title, author, URL):
 * slider and scroll and button code, p5.js website, https://p5js.org/reference/#/libraries/p5.dom
 *
 *

<Reminders, you can delete:>
<Use command + T to auto-indent your code for cleaner formatting>
<Check that variable and function names are easy to read and understand. eg. "squareButton" vs.
"shapeButton2">
<If you can't remember where you found some code, Google the text to find it.>
<Put your name in the name of this file!>
*/

//AI image from https://futureoflife.org/background/benefits-risks-of-artificial-intelligence/

var xPosition = 100
var counter1 = 0
var switchTabButton;
var ethicsYTranslationFactor = 500;
var pos = 0;
var headerColor = [39, 163, 216];
var backgroundColor = [255,255,255];
//use the following code to make this color: (backgroundColor[0],backgroundColor[1],backgroundColor[2])
var image;

var webPages = {
  //the current tab is the page the user is on, which is dynamic, and the tabs count is the amount, -1, of tabs, so I can cycle through the tabs.
  tabsCount: 2,
  currentTab: 2,
  tabsArray: [[1000,500,100,100,100], [1000,500,200,0,0]],
  loadTab: function() {
    //allows cycling between tabs through one button
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    pos = 0
    //makes the page go to the top, and resents the scrolling position so the top header will be at the top
    print(webPages.currentTab)
    clear();
    if (webPages.currentTab == webPages.tabsCount) {
      counter1 = 0
      stayButton.button.show()
      swerveButton.button.show()
      webPages.currentTab = 0
    } else {
      counter1 = 800
      stayButton.button.hide()
      swerveButton.button.hide()
      webPages.currentTab += 1
    }
  }
}

function setup() {
  image = createImg('1.jpg');
  angleMode(DEGREES);
  createCanvas(windowWidth,windowHeight*2-300);
  //makes the button for the straight option
  stayButton.button = createButton(stayButton.text);
  stayButton.button.position(xPosition-20, 500+ethicsYTranslationFactor);
  stayButton.button.size(60)
  stayButton.button.mousePressed(stayButton.pressed);
  stayButton.button.hide()
  //makes the button for the swerve option
  swerveButton.button = createButton(swerveButton.text);
  swerveButton.button.position(xPosition+50, 500+ethicsYTranslationFactor);
  swerveButton.button.mousePressed(swerveButton.pressed);
  swerveButton.button.hide()

  switchTabButton = createButton("click me to continue exploring somewhere else...");
  switchTabButton.position(0, 51);
  switchTabButton.size(windowWidth)
  switchTabButton.mousePressed(webPages.loadTab);
  //
  //
  canvasWidth = windowWidth
  i = (canvasWidth/2)-200
  //loadNeuron()
  slider0 = createSlider(-100, 100, 100);
  //sets min and max to +-100 instead of +-1, to make more options, which will later be divided by 100
  slider0.position((canvasWidth/2)-120,input0Line((canvasWidth/2)-100)-40);
  slider0.style('width', '80px');
  slider0.hide()

  slider1 = createSlider(-100, 100, 100);
  slider1.position((canvasWidth/2)-120,input1Line((canvasWidth/2)-100)+40);
  slider1.style('width', '80px');
  slider1.hide()
  //makes weight sliders
  checkbox0 = createCheckbox('is positive', true);
  checkbox0.position((canvasWidth/2)-260-abs(input0*50),input0Line((canvasWidth/2)-230));
  checkbox0.changed(myCheckedEvent0);
  checkbox0.hide()

  checkbox1 = createCheckbox('is positive', true);
  checkbox1.position((canvasWidth/2)-260-abs(input1*50),input1Line((canvasWidth/2)-250));
  checkbox1.changed(myCheckedEvent1);
  checkbox1.hide()

  //defines and positions UI elements, including buttons, sliders, and check boxes
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
        translate(0,ethicsYTranslationFactor);
        ethicsPage.updateTheCarLocation(false);
        fill(255,0,0);
        strokeWeight(1);
        ethicsPage.makeX(xPosition+15,counter1/2+35)
        ethicsResultsGraph.updateGraph("stay")
        translate(0,-ethicsYTranslationFactor);
        alert('The driver died in the accident')
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
      translate(0,ethicsYTranslationFactor);
      ethicsPage.updateTheCarLocation(true);
      fill(255,0,0);
      strokeWeight(1);
      ethicsPage.makeX(xPosition+80,480)
      ethicsPage.makeX(xPosition+70,480)
      ethicsResultsGraph.updateGraph("swerve")
      translate(0,-ethicsYTranslationFactor);
      alert('The two pedestrians died in the accident')
    }
  }
}

var car = {
  makeCarBody: function(x,y) {
    //makes a car-looking box
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

var ethicsResultsGraph = {
  x: 250,
  y: 480,
  stayPercent: 40,
  updateGraph: function(selected) {
    print(selected)
    push();
    translate(this.x,this.y);
    //calculates and displays user answers
    let theStayPercent = (swerveStayResults.stay/(swerveStayResults.stay + swerveStayResults.swerve))*100
    print(theStayPercent)
    ethicsPage.makeTheGraph(theStayPercent, 100 - theStayPercent);
    //(100 - stayPercent gives the swerve percent)
  }
};

var ethicsPage = {
  //this is one of the tabs, that involves an ethics game
  makeText: function(yTranslation) {
    fill(255);
    rect(0,0,windowWidth,500);
    fill(headerColor[0],headerColor[1],headerColor[2]);
    textSize(25);
    text("Ethical Dillemas of AI",30,100);
    textSize(8+windowWidth/200);
    fill(0);
    text("One ethical problem of AI arises visibly in the field of self-driving cars. In a scenario where a crash is inevitable, what should the car do? This question is fascinating \nbecause AI can be trained to act and make calculated decisions, unlike those of a human in a spontaneous situation. Here's another fascinating thought: if we declare \nthe purpose of self-driving cars as to save as many lives as possible, should it sacrifice the passengers in order to save strangers? This is a huge ethical issue, \nand even affects the economic success of the cars, decreasing the amount of people using them, and thus decreasing the ammount of lives saved. \nBy priotizing the life of the driver, some believe that more lives would be saved because more people would feel comfortable in the cards. Wouldn't it be weird to know \nthat your car didn't care about saving your life in particular? The following demonstration replicates a scenario in which a self-driving car must kil to save life.",60,120);
    fill(headerColor[0],headerColor[1],headerColor[2]-40);
    textSize(25);
    push()
    translate(windowWidth/2-500,250)
    rotate(90);
    text("------------>",-140,110)
    pop()
    text("Scroll down for a controversial scenario.",25,250)
  },
  makeX: function(x,y) {
    push()
    translate(x+1,y-5);
    //translates so that middle of the x is the coordinate.
    rotate(45);
    rect(0,0,2,10)
    rect(-4,4,10,2)
    pop()
  },
  makeTheGraph: function(stay,swerve) {
    //makes text that informs the user about ethical issues
    fill(0);
    text("As you can see, the decisions that AI will have to make are daunting, \nand people may have different ideas about what the AI should do. \nClick the top button to on to the next page and learn about how AI works.",100,-90)
    textSize(10);
    text("Responses",-10,10)
    textSize(7);
    text("__0%",32,2);
    text("__50%",32,-48);
    text("__100%",32,-98);
    fill(0,255,255);
    strokeWeight(0.5);
    for (var i = 0; i > -1*stay; i-= 2) {
      rect(0,i,10,2)

    }
    fill(0,0,255);
    for (var y = 0; y > -1*swerve; y-= 2) {
      rect(20,y,10,2)
    }
  },
  drawTheArrow: function(){
    rect(xPosition+5,410,10,50)
    triangle(xPosition+10,475,xPosition-10,455,xPosition+30,455)
  },
  updateTheCarLocation: function(swerveBool){
    //checks if the counter has not maxed out yet
    if (counter1 < 700) {
      strokeWeight(0);
      background(backgroundColor[0],backgroundColor[1],backgroundColor[2]);
      fill(headerColor[0],headerColor[1],headerColor[2]);
      textSize(20);
      text("A self-driving car housing 1 person perceives a physical obstacle ahead (a barricade), and two pedestrians crossing a street.",10,300-counter1/7)
      text("The only two options are to either hit the barrier or hit the pedestrians.",10,330-counter1/7)
      text("Do you think it should SWERVE to prioritize the life of the driver, or should it STAY to reduce the loss of life at the expense of the driver?",10,380-counter1/7)

      fill(0,255,205);
      textSize(25);
      text("Stay ",70,540)
      fill(0,0,255)
      text("Swerve",160,540)
      textSize(20);
      fill(0);
      text("or ",130,540)


      fill(230,200,80)
      rect(xPosition-20,480,60,5)
      //makes barricade
      fill(255,230,150);
      strokeWeight(0.5)
      ellipse(xPosition+80,480,5,5)
      ellipse(xPosition+70,480,5,5)
      strokeWeight(0)
      fill(0,255,205);
      ethicsPage.drawTheArrow()
      fill(0,0,255)
      push()
      translate(xPosition+5,410)
      rotate(-20)
      translate(-xPosition+30,-400)
      ethicsPage.drawTheArrow()
      pop()
      if (swerveBool) {
        push()
        //translate(xPosition,counter1)
        rotate(-10)
        ethicsPage.makeTheCarBody(xPosition-40,counter1+20)
        pop()
      } else {
        ethicsPage.makeTheCarBody(xPosition,counter1)
      }
      strokeWeight(0)
      counter1 += 3
    }
  },
  makeTheCarBody: function(x,y) {
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

var carBackgroundHasBeenCreated = false;

function draw() {
  strokeWeight(0);
  //updateCarLocation()
  if (webPages.currentTab == 0) {

    image.hide()
    slider0.hide()
    slider1.hide()
    checkbox0.hide()
    checkbox1.hide()
    ethicsPage.makeText(ethicsYTranslationFactor);
    if (pos > 100) {
      translate(0,500)
      ethicsPage.updateTheCarLocation()
      translate(0,-500)
    } else {
      if (carBackgroundHasBeenCreated == false) {
        //there is no need to repeatedly make the car, so this variable
        background(backgroundColor[0],backgroundColor[1],backgroundColor[2]);
        ethicsPage.makeTheCarBody(100,1000)
        carBackgroundHasBeenCreated = true
      } else {
        ethicsPage.makeText(ethicsYTranslationFactor);
      }
    }

  } else if (webPages.currentTab == 1) {
    carBackgroundHasBeenCreated = false
    image.hide()
    slider0.show()
    slider1.show()
    checkbox0.show()
    checkbox1.show()
    doNeuron()
    makeNeuronText()
  } else if (webPages.currentTab == 2) {
    loadMainPage()
    image.show()
    slider0.hide()
    slider1.hide()
    checkbox0.hide()
    checkbox1.hide()
  }
  topBarStaysAtTopOfView(webPages.currentTab)
}

var lastPosition = 0
//remembers where the header was last, to avoid weird/broken animations

function topBarStaysAtTopOfView(windowIndex) {
  //top bar stays at top of screen
  if (windowIndex == 2) {
    topBar.makeTopHeader(0,windowIndex);
  } else {
    if (pos >= 0 && pos <= 400) {
      topBar.makeTopHeader(pos,windowIndex);
      lastPosition = pos;
    } else {
      topBar.makeTopHeader(lastPosition,windowIndex);
    }
  }
}

function drawArrow() {
  rect(xPosition+5,410,10,50)
  triangle(xPosition+10,475,xPosition-10,455,xPosition+30,455)
}

///
///
///
///// main page

function loadMainPage() {
  image.hide()
  image = createImg('1.jpg')
  image.size(windowWidth,windowHeight-321)
  createCanvas(windowWidth,windowHeight*2-300);
  background(backgroundColor[0],backgroundColor[1],backgroundColor[2]);
  fill(headerColor[0],headerColor[1],headerColor[2]);
  textSize(30);
  text("What is Aritifical Intelligence?",20,110);
  textSize(15);
  fill(0);
  text("AI is most used in natural language processing, identifying objects (perception), and autonomous robots in manufacturing. It is also being implemented \nin the car industry by Google and other companies with self-driving cars. Artificial intelligence is also starting to expand into new fields, \nsuch as medicine, via expert systems. Expert systems accomplish decision-making in medicine or government fields like a human expert. \nIn 2005, researchers at a hospital in New York trained a deep learning program with data from over 700,000 patients, \nand it was able to predict diseases accurately by recognizing patterns in the data.",20,200);
  textSize(25);
  text("Artificial intelligence, or AI, is the process of computers making decisions and predictions \nby mimicking the cognitive abilities of natural intelligence, which humans possess.",20,140);

}

//NEURON EXPLANATION
//
//
//

var i;
var slider0;
var slider1;
var checkbox;

let neuronY = 200
let input0 = 1
let weight0 = -1
let input1 = 1
let weight1 = -.5
let canvasWidth = 900
let canvasHeight = 2000

function loadNeuron() {
  fill(255);
  ellipse(canvasWidth/2,neuronY,150,150);
  let color0 = findColor(input0)
  let color1 = findColor(input1)
  fill(color0[0],color0[1],color0[2]);
  ellipse((canvasWidth/2)-200,input0Line((canvasWidth/2)-200),input0*50)
  fill(color1[0],color1[1],color1[2]);
  ellipse((canvasWidth/2)-200,input1Line((canvasWidth/2)-200),input1*50)
  fill(0);
  fill(findColor(input0));
  text("Input 0: "+addPlusSignToPositiveNumber(input0),(canvasWidth/2)-230-abs(input0*50),input0Line((canvasWidth/2)-230))
  fill(findColor(weight0));
  text("Weight 0: "+addPlusSignToPositiveNumber(weight0),(canvasWidth/2)-110,input0Line((canvasWidth/2)-100)-40)
  fill(findColor(input1));
  text("Input 1: "+addPlusSignToPositiveNumber(input1),(canvasWidth/2)-230-abs(input1*50),input1Line((canvasWidth/2)-250))
  fill(findColor(weight1));
  text("Weight 1: "+addPlusSignToPositiveNumber(weight1),(canvasWidth/2)-110,input1Line((canvasWidth/2)-100)+40)
  fill(0);
  text("Neuron",canvasWidth/2-20,neuronY)
  line((canvasWidth/2)-200,input0Line((canvasWidth/2)-200),canvasWidth/2,neuronY-20)
  line((canvasWidth/2)-200,input1Line((canvasWidth/2)-200),canvasWidth/2,neuronY+10)
  text("Output",canvasWidth/2+100,neuronY-30)
}

function addPlusSignToPositiveNumber(x) {
  if (x > 0) {
    return "+"+String(x)
  } else {
    return String(x)
  }

}

function findColor(weightOrInput) {
  if (weightOrInput < 0) {
    return [205,0,0]
  } else {
    return [68, 155, 36]
  }

}

function input0Line(x) {
  return (neuronY/(canvasWidth/2))*x -20
}

function input1Line(x) {
  return -(neuronY/(canvasWidth/2))*x +410
}

function myCheckedEvent0() {
  if (this.checked()) {
    input0 = 1
  } else {
    input0 = -1
  }
}

function myCheckedEvent1() {
  if (this.checked()) {
    input1 = 1
  } else {
    input1 = -1
  }
}

function doNeuron() {
  clear()
  weight0 = slider0.value()/100;
  weight1 = slider1.value()/100;
  createCanvas(canvasWidth,windowHeight+400)
  background(backgroundColor[0],backgroundColor[1],backgroundColor[2])
  loadNeuron()
  fill(0);
  if (i < canvasWidth/2) {
    fill(findColor(weight0*input0));
    ellipse(i,input0Line(i),input0*weight0*50)
    fill(findColor(weight1*input1));
    ellipse(i,input1Line(i),input1*weight1*50)
  } else if (i < canvasWidth/2 + 50) {
    fill(findColor((input0*weight0*50)+(input1*weight1*50)))
    ellipse(i,neuronY,(input0*weight0*50)+(input1*weight1*50))

    if ((input0*weight0*50)+(input1*weight1*50) < 0) {
      text("-1: No",canvasWidth/2+100,neuronY)
    } else {
      text("+1: Yes",canvasWidth/2+100,neuronY)
    }

  } else {
    i = (canvasWidth/2)-200
  }
  i ++
  //animates the inputs going into the neuron
}

var topBar = {
  makeTopHeader: function(y,tab){
    strokeWeight(0);
    fill(headerColor[0],headerColor[1],headerColor[2]);
    rect(0,0+y,windowWidth,70);
    fill(0);
    //makes bar on top of screen
    fill(200);
    strokeWeight(0);
    fill(0);
    textSize(30);
    text("Artificial Intelligence <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <>",10,38+y)
    if (tab == 2) {
      switchTabButton.position(0, windowHeight-270+y);
    } else {
      switchTabButton.position(0, 51+y);
    }

  }
}

//
function makeTopHeader() {
  strokeWeight(0);
  fill(headerColor[0],headerColor[1],headerColor[2]);
  rect(0,0,windowWidth,70);
  fill(0);
  //makes bar on top of screen
  fill(200);
  strokeWeight(0);
  //rect(0,50,windowWidth,20)
  //rect(windowWidth/3,50,windowWidth/3,20)
  //rect(2*(windowWidth/3),50,windowWidth/3,20)
  //makes rectangular button places
  fill(0);
  textSize(30);
  text("Artificial Intelligence",10,38)
}

function makeNeuronText() {
  textSize(25);
  fill(0);
  translate(0,20);
  text("-1: no \n+1: yes",20,110);
  fill(headerColor[0],headerColor[1],headerColor[2]);
  text("So how does AI work?",20,310);
  textSize(15);
  fill(0);
  text("Achieving intelligence is accomplished by mimicking biology; a neural network, based on that of a brain, perceives information which stimulates artificial neurons \nuntil a result is achieved. Each artificial neuron is a mathematical function that has 1 or more inputs, and 1 output. \nFor every input, there is also a weight, which allows different inputs to contribute in different amounts to the final 'decision.'\nThese neurons are linked together in complex chains that allow complex decisions to be made.\n\nTHE EXAMPLE replicates a single neuron. Go ahead and experiment with different weights and inputs, and see how the output is affected.\n\nIn AI programs, the neurons are trained by inputing data, and allowing the neuron to guess, and then adjusting the weights based on the actual result.",20,340);
  translate(0,-20);
}

function mouseWheel(event) {
  print(event.deltaY);
  //move the square according to the vertical scroll amount

  if (webPages.currentTab != 2) {
    if (pos < 0) {
      pos = 0
    } else if (pos > 400) {
      pos = 400
    } else {
      image.hide()
      slider0.hide()
      slider1.hide()
      checkbox0.hide()
      checkbox1.hide()
      pos += event.deltaY;
    }
    print(pos)
  } else {
    return false;
  }
}
