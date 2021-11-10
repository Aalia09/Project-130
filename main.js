song= "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1status = "";
song2status = "";

function preload()
{
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600 , 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRigthWrist = results[0].pose.keypoints[10].score;


        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);


        
    }
}


function draw()
{
    image(video, 0 , 0 , 600 , 500);
    fill("#fc2003");
    stroke("#fc2003");

    song1status = song.isPlaying();
    song2status = song2.isPlaying();

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        song.stop();

        if(song2status == false)
        {
            song2.play();
            document.getElementById("song_name").innerHTML = "Playing - Peter Pan song";
        }
    }

;
    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);
        song.stop();

        if(song2status == false)
        {
            song2.play();
            document.getElementById("song_name").innerHTML = "Playing -Harry Potter song";
        }
    }
}



