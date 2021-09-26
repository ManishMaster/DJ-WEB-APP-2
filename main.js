function preload() {
          pirate_song = loadSound("01pirates-of-caribean-theme-ringtone-30430.mp3");
          alan_walker_song = loadSound("Alan-Walker-Fade.mp3");
}

function setup() {
          canvas = createCanvas(600, 500);
          canvas.center();

          video = createCapture(VIDEO);
          video.hide();

          poseNet = ml5.poseNet(video, modelLoaded);
          poseNet.on('pose', gotPoses)
}

function play() {

          pirate_song.play();
}

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

score_leftWrist = 0;
score_rightWrist = 0;

function modelLoaded() {
          console.log("Model just got Loaded");
}

function gotPoses() {
          if (results.length > 0) {
                    leftWristX = results[0].pose.leftWrist.x;
                    leftWristY = results[0].pose.leftWrist.y;
                    rightWristX = results[0].pose.rightWrist.x;
                    rightWristY = results[0].pose.rightWrist.y;
                    score_leftWrist = results[0].pose.keypoints[9].score;
                    score_rightWrist = results[0].pose.keypoints[10].score;
                    console.log("The coordinates for left wrist is " + "x: " + leftWristX + " y: " + leftWristY)
                    console.log("The coordinates for right wrist is " + "x: " + rightWristX + " y: " + rightWristY)
          }
}

function draw() {
          image(video, 0, 0, 600, 500);
          fill("85, 250, 129");
          stroke("85, 250, 129");

          if (score_rightWrist > 0.2) {
                    circle(rightWristX, rightWristY, 20);
                    if (rightWristY > 0 && rightWristY <= 100) {
                              document.getElementById("speed").innerHTML = "Speed = 0.5x";
                              song.rate(0.5);
                    }
                    if (rightWristY > 100 && rightWristY <= 200) {
                              document.getElementById("speed").innerHTML = "Speed = 1x";
                              song.rate(1);
                    }
                    if (rightWristY > 200 && rightWristY <= 300) {
                              document.getElementById("speed").innerHTML = "Speed = 1.5x";
                              song.rate(1.5);
                    }
                    if (rightWristY > 300 && rightWristY <= 400) {
                              document.getElementById("speed").innerHTML = "Speed = 2x";
                              song.rate(2);
                    }
                    if (rightWristY > 400 && rightWristY <= 500) {
                              document.getElementById("speed").innerHTML = "Speed = 2.5x";
                              song.rate(2.5);
                    }
          }

          if (score_leftWrist > 0.2) {
                    circle(leftWristX, leftWristY, 20);
                    InNumberleftWristY = Number(leftWristY);
                    remove_decimals = floor(InNumberleftWristY);

                    volume = remove_decimals / 500;
                    document.getElementById("volume").innerHTML = "Volume : " + volume;
                    song.setVolume(volume);
          }
}