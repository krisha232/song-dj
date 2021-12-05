status1 ="";
status2 ="";
song1 = "";
song2 = "";
leftx=0;
lefty=0;
rightx=0;
righty=0;
scoreLeftWrist=0;
scoreRightWrist=0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    canvas.position(340, 250);

    video = createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        leftx=results[0].pose.leftWrist.x;
        lefty=results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftx + "LeftWristY = " + lefty);

        rightx=results[0].pose.rightWrist.x;
        righty=results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightx + "RightWristY = " + righty);
}}

function modelLoaded(){
    console.log('PoseNet is initialized');
}


function draw() {
    image(video, 0, 0, 600, 500);
    
    fill("#FF0000");
    stroke("#FF0000");
      
    
    
    status1=song1.isPlaying ();
    if(scoreLeftWrist>0.2){
        circle(leftx,lefty,20);    
        song2.stop();
        if(status1==false){
            song1.play();
            document.getElementById("song").innerHTML = "Halsey - castle is playing currently";
        }
    }
    status2=song2.isPlaying ();
    if(scoreRightWrist>0.2){
        circle(rightx,righty,20);    
        song1.stop();
        if(status2==false){
            song2.play();
            document.getElementById("song").innerHTML = "Harry potter remix is currently playing";
        }
    }

}


function preload() {
    song1 = loadSound("Halsey - Castle.mp3");
    song2 = loadSound("music.mp3");
        
}

