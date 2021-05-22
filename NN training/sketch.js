let options;
let targetLabel = 'G'; 
let nn; 
let state = 'data'; 
let stateMarker; 
function setup()
{
  
  createCanvas(990, 600); 
  background(255); 
 options = {
  inputs: ['x', 'y'],
  outputs: ['label'],
  task: 'classification',
};
 nn = ml5.neuralNetwork(options); 
  stateMarker = select('#mode');
  
}


function mouseClicked()
{
  let inputs = {x: mouseX, y: mouseY}; 
  let output = {label: targetLabel}; 
  if (state == 'data')
    {
        nn.addData(inputs, output);
        drawEllipse(mouseX, mouseY); 
    } 
  if (state == 'predict')
    {
      nn.classify(inputs, drawPrediction);
    }

 
}


function drawPrediction(error, results)
{
  if (results)
    {
      targetLabel = results[0].label; 
      drawEllipse(mouseX, mouseY); 
    }
  
  
}


function keyTyped()
{
  if (key === 'c')
    {
      if (targetLabel == 'G')
        { 
           targetLabel = 'B'; 
        }
      else
        {
          targetLabel = 'G'; 
        }
    }
  else if (key == 't')
    {
      state = 'train'; 
      document.getElementById("mode").innerHTML = "Training Mode"; 
    console.log('starting training');
    nn.normalizeData();
    let options = {
      epochs: 20
    };
    nn.train(options, whileTraining, finishedTraining);
    }
  else if (key == 'd')
    {
      state = 'collection'; 
      document.getElementById("mode").innerHTML = "Collection Mode"; 
    }
}


function whileTraining(epoch, loss) {
  console.log(epoch);
}


function finishedTraining() {
  console.log('finished training.');
  state = 'predict';
document.getElementById("mode").innerHTML = "Predict Mode";
}







function drawEllipse(x, y)
{
  if (targetLabel === 'G')
    {
      stroke(0, 225, 0);
      fill(255); 
      ellipse(x, y, 24); 
       noStroke(); 
      fill(0, 255, 0); 
      textAlign(CENTER, CENTER); 
      text(targetLabel, x, y); 
    }
  
   if (targetLabel === 'B')
    {
      stroke(0, 0, 255);
      fill(255); 
      ellipse(x, y, 24); 
noStroke(); 
      fill(0, 0, 255);
      textAlign(CENTER, CENTER); 
      text(targetLabel, x, y); 
    }
  
  
}