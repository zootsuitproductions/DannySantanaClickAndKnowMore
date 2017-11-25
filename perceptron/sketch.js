var perceptron;
var myButton;

var theButton = {
  text: "presssss me",
  pressed: function(){
    print(hi)
  }
}

function setup() {
  let myInputs = [-1,0.5]
  perceptron = new Perceptron([1,-1])
  print(perceptron.outPutIt())
  perceptron.printItOut()
  print(perceptron.guess(myInputs))

  myButton.button = createButton(theButton.text);
  myButton.button.position(500,500)
  myButton.button.mousePressed(theButton.pressed)
}

class Perceptron {

  constructor(theXs) {
    //initialie weights
    this.output = 0;
    this.learningRate = 0.1;
    this.xs = theXs
    this.weights = []
    for (let i = 0; i < this.xs.length; i ++) {
      this.weights.push(random(-1,1))
    }
  }

  sign(number) {
    if (number > 0) {
      return 1
    } else {
      return -1
    }
  }

  printItOut() {
    print(this.weights)
  }

  outPutIt() {
    for (let i = 0; i < this.xs.length; i ++) {
      this.output += (this.xs[i] * this.weights[i])
    }
    return this.sign(this.output)

  }

  guess(inputs) {
    this.sum = 0;
    for (let i = 0; i < this.weights.length; i ++) {
      this.sum += (inputs[i] * this.weights[i]);
    }
    return this.sign(this.sum)
  }

  train(inputs, target) {
    this.guess = guess(inputs);
    this.error = target - guess

    for (let i = 0; i < this.weights.length; i ++) {
      this.weights[i] += this.error * this.xs[i] * this.learningRate;
    }
  }

}
