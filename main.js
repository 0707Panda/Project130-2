music1 = "";
music2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeft=0;
LeftStatus="";
scoreRight=0;
RightStatus="";

function preload(){
    music1 = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.position(300, 200);
    video = createCapture(VIDEO);
    video.hide();

    net = ml5.poseNet(video, modelLoaded);
    net.on("poses", gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("purple");
    stroke("purple");
    
    music1.isPlaying();
    if(scoreLeft > 0.2){
        circle(leftWristX, leftWristY, 20);
        music2.stop();

        if(music1 == false){
            music1.play();
            document.getElementById("SongName").innerHTML = "The song playing is: " + music1;
        }
    }


    music2.isPlaying();
    if(scoreRight > 0.2){
        circle(rightWristX, rightWristY, 20);
        music1.stop();

        if(music2 == false){
            music2.play();
            document.getElementById("SongName").innerHTML = "The song playing is: " + music2;

        }
    }
}



function modelLoaded(){
    console.log("Model loaded!")
}

function gotPoses(){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Lrft Wrist X: " + leftWristX + "Left Wrist Y" + leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X: " + rightWristX + "Right Wrist Y" + rightWristY);

        scoreLeft = results[0].pose.keypoints[9].score;
        scoreRight = results[0].pose.keypoints[10].score;


    }
}