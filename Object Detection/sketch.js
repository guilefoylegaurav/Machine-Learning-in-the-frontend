let video; 
let detections = []; 

function setup()
{
 
  createCanvas(1200, 800); 
  video = createCapture(VIDEO);
  video.hide();   
  yoloObjectDetector = ml5.objectDetector('yolo', modelReady);


}

function modelReady()
{
  console.log("Loaded model"); 
  yoloObjectDetector.detect(gotDetections); 

}

function gotDetections(error, results)
{
  if (error) {
    console.error(error);
  }
  detections = results;
  yoloObjectDetector.detect(video, gotDetections);
   
}

function draw()
{
  image(video, 0, 0);
  if (detections.length == 0)
  {
    fill(255); 
    noStroke(); 
    text("Loading", 10, 10)
  }
  for (let i = 0; i < detections.length; i++) {
    let object = detections[i];
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }
  

}