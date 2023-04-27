// Design Section
var cards = document.querySelectorAll('.card');

// Commented out animation for repeat filps
// [...cards].forEach((card)=>{
//   card.addEventListener( 'click', function() {
//     card.classList.toggle('is-flipped');
//   });
// });

[...cards].forEach((card)=>{
  card.addEventListener( 'click', function flip() {
    card.classList.toggle('is-flipped');
    card.removeEventListener('click', flip); // Upon the first click, the event listener is removed
  });
}); 

// Ensure the height of the front and back section are equal. 
// Done using the height of the paragraph division, and the height of the table and footer at the back
function sameHeight() {
  var front = document.getElementById("front");
  var back = document.getElementById("back");
  var height = front.offsetHeight;
  if (height > back.offsetHeight) {
    back.style.height = height + "px";
  }
  else {
    front.style.height = back.offsetHeight + "px";
  }
};



// Calculator Functions...

//Enginespecs -- ImpulseClass, EngineType, TotalImpulse, TimeDelay, MaxLift, MaxThrust, ThrustDuration, EngineMass
var engineSpecs =  [  [1, "class1/4A", "1/4A3-3T", 0.625, 3,  0.028, 4.9, 0.25, 0.0056],
                      [2, "class1/2A", "1/2A3-2T", 1.25, 2, 0.057, 8.3, 0.3, 0.0056],
                      [3, "classA", "A3-4T", 2.50, 4, 0.057, 6.8, 0.6, 0.0076],
                      [4, "classA", "A10-3T", 2.50, 3, 0.085, 13, 0.8, 0.0079],
                      [5, "class1/2A", "1/2A6-2", 1.25, 2, 0.057, 8.9, 0.3, 0.015],
                      [6, "classA", "A8-3", 2.50, 3, 0.085, 10.7, 0.5, 0.0162],
                      [7, "classB", "B4-2", 5.00, 2, 0.113, 13.2, 1.1, 0.0198],
                      [8, "classB", "B4-4", 5.00, 4, 0.099, 13.2, 1.1, 0.0210],
                      [9, "classB", "B6-2", 5.00, 2, 0.127, 12.1, 0.8, 0.0193],
                      [10, "classB", "B6-4", 5.00, 4, 0.113, 12.1, 0.8, 0.0201],
                      [11, "classC", "C6-3", 10.00, 3, 0.113, 15.3, 1.6, 0.0249],
                      [12, "classC", "C6-5", 10.00, 5, 0.113, 15.3, 1.6, 0.0258],
                      [13, "classC", "C11-3", 10.00, 3, 0.170, 22.1, 0.8, 0.0322],
                      [14, "classD", "D12-3", 20.00, 3, 0.396, 32.9, 1.6, 0.0422],
                      [15, "classD", "D12-5", 20.00, 5, 0.283, 32.9, 1.6, 0.0431],
                      [16, "classE", "E9-4", 30.00, 4, 0.425, 25.0, 2.8, 0.0567],
                      [17, "classE", "E9-6", 30.00, 6, 0.340, 25.0, 2.8, 0.0567],
]


function rocketMassConverter() {
  var massRocket = Number(document.getElementById("userInputRocket").value);
  if (massRocket > 0) {
    var massUnitsRocket = document.getElementById("massUnitsRocket").value;
    var newMassRocket = massRocket;
    if (massUnitsRocket == "grams") {
     newMassRocket = massRocket * 0.001;
    }
    else if (massUnitsRocket == "lbs") {
     newMassRocket = massRocket * 0.45359237;
    }
    else if (massUnitsRocket == "oz") {
     newMassRocket = massRocket * 0.02834952;
    }
    return newMassRocket
  }
  else {
    window.alert("Ensure the rocket mass is a postive integer!")
  }
}

// function engineMassConverter() {
//   var massEngine = Number(document.getElementById("userInputEngine").value);
//   var massUnitsEngine = document.getElementById("massUnitsEngine").value;
//   var newMassEngine = massEngine;
//   if (massUnitsEngine == "grams") {
//     newMassEngine = massEngine * 0.001;
//   }
//   else if (massUnitsEngine == "lbs") {
//     newMassEngine = massEngine * 0.45359237;
//   }
//   else if (massUnitsEngine == "oz") {
//     newMassEngine = massEngine * 0.02834952;
//   }
//   return newMassEngine
// }

function engineSelector() {
  var viableEnginesArray = [];
  var totalImpulseClass = document.getElementById("impulseClass").value;
  if (totalImpulseClass == "N/A") {
    window.alert("Choose your desired impulse class...")
  }
  else {
    var rocketMass = rocketMassConverter();
    for (let i = 0; i < engineSpecs.length; i++) {
      var engineInfo = engineSpecs[i]
      if ((totalImpulseClass == engineInfo[1]) && (engineInfo[5] >= rocketMass)){
       viableEnginesArray.push(engineInfo);
      }
    }
    return viableEnginesArray
  }
}

function apogeeCalculator() {
  var viableEngines = engineSelector();
  var newEnginesArray = [];
  var rocketMass = rocketMassConverter();
  var answer = "";
  if (viableEngines.length == 0) {
    document.getElementById("idFooter").innerHTML = "No rocket in the chosen class can lift your rocket!"
  }
  else {
    for (let i = 0; i < viableEngines.length; i++) {
      var engine = viableEngines[i]
      var a = (engine[6]/rocketMass) - 9.81;
      var t = engine[7];
      var apogeeTime = (a*t)/9.81;
      var timeDelay = engine[4];
      if (timeDelay < apogeeTime) { //Need to work on this...
        newEnginesArray.push(engine[2])
        counter = i + 1
      }
    }
    if (newEnginesArray.length == 0) {
      document.getElementById("idFooter").innerHTML = "No rocket engine meets the impulse class and mass criteria."
    }
    else {
      for (let i = 0; i < newEnginesArray.length; i++) {
        answer = newEnginesArray[i] + ", " + answer;
      }
      answer = answer.substring(0, answer.length - 2)
      document.getElementById("idFooter").innerHTML = "Suggested Engine(s) for given rocket Mass and impulse class: " + answer
    }
  }
}