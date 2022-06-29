img="";
status="";
object=[];

function setup(){
    canvas=createCanvas(450,450);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(450,450);
    video.hide()
    
}

function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}
function preload(){
    img=loadImage("img1.jpg");
}
function draw(){
    image(video,0,0,450,450);
    if (status!=""){
        objectDetector.detect(video,gotResults);
        for (i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="Status : Object Detected";
            document.getElementById("num_of_object").innerHTML="Number of objects detected are "+object.length;
            fill("#FF0000");
            percent=floor(object[i].confidence*100);
    text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
    noFill();
    stroke("#FF0000");
    rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
}
}
function modelLoaded(){
    console.log("Model is loaded");
    status=true;
    objectDetector.detect(video,gotResults);
}
function gotResults(error,result){
    if (error){
        console.log(error);
    }
    else {
        console.log(result);
        object=result;
    }
}