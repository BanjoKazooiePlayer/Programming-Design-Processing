/*
    Paste the code for your week 5 exercise below.
*/

/* Please Note the wave function was derived from an Example by Daniel Shiffman
 * I have included citations in comments and I have included a Bibliography at the end
 * Despite commiting a lot of changes and the code being different, the functionality ideas were from Daniel Shiffam
 */

let xspacing = 10; // Distance between each horizontal location
let angle = 0.0; // Start angle at 0
let waveHeight = 50.0; // Height of wave
let period = 600.0; // How many pixels before the wave repeats
let incX; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave
let grav = 6; // how fast the ball falls down
let ballY = 100; // y postion of the ball
let ballX = 100; // x postion of the ball
let ballMove = 0; // left to right movement of the ball
let ballDirection = 0; // 1 is right, 2 is left
let ballSpeed = 3;// How fast the ball travels side to side (NOTE: Originally I calculated the gradient when it hits but it did not look as smooth)
let up = false; // ball moving down false and up is true
let red = 255; // Used to change the colour of the ball when it hits
let green = 255;// Used to change the colour of the ball when it hits
let blue = 255;// Used to change the colour of the ball when it hits
let reflection = 20; // How hard the ball will bounce back after a collision
let particleArr = []; //particle system background array

//(Shiffman, 2022)
function setup() {
    createCanvas(710, 600); // Canvas size
    incX = ((3.14 * 2) / period) * xspacing; // determines the gap between the balls in the wave
    yvalues = new Array(floor(width / xspacing)); // The array used for the bridge and collision detection
}

function draw() {
    background(0);//black bacground
    wave();
    renderWave();
    ballDraw();
    gravity();
}


//(Shiffman, 2022)
function wave() {
    // Increment angle 
    angle += 0.04;

    // For every x value, calculate a y value with sine function
    let x = angle;
    for (let i = 0; i < yvalues.length; i++) {
        yvalues[i] = waveHeight * sin(x);
        x += incX;
    }
}

function renderWave() {
    noStroke();
    fill(255);
    //draw the wave with an ellipse at each location
    //embedded for loops are so the function runs four waves
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < yvalues.length; x += 2) {
            ellipse(x * xspacing, (height / 2 + yvalues[x]) + (y * 16), 16, 16);
        }
    }
}


function ballDraw() {
    ballY += grav; // have the ball effected by gravity constantly
    fill(red, green, blue); // get random colours from the red,green,blue variables
    ellipse(ballX, ballY, 50, 50);//draw the ball
}

function gravity() {
    //Collision detection between the ball and the wave
    if (ballY > (height / 2 + yvalues[Math.round(ballX / 10)]) - 36) {
        //Determine which way the ball will move by calculating values from two of the wave elipses
        if (yvalues[Math.round(ballX / 10)] > yvalues[Math.round(ballX / 10) - 1]) {
            ballDirection = 1;
        } else {
            ballDirection = 2;
        }
        grav -= reflection;// how much intial lift the ball has when it makes a collision
        up = true; // used to determine the ball is going up
        ballColour(); // change the ball colour when it hits
    }
    if (up == true) {
        grav = grav * 0.81; // slow the ball down as it rises (NOTE: 9.81 Would have been cool but it did not look right)
        if (grav >= -0.3) { // Used to change the ball direction back down
            up = false;
            grav = 5;
        }
    }
    if (ballDirection == 1) ballX += 3; // ball moves right until next collision calculation
    if (ballDirection == 2) ballX -= 3;// ball moves right until next collision calculation
    if (ballX <= -20 || ballX > width + 20) {
        ballDirection = 0;
        ballX = Math.round(Math.random() * width - 10);
        ballY = 0;
    }
}

function ballColour() {
    red = Math.round(Math.random() * 255);// get a random value between 1 - 255. Math.round is used to round it up to and int
    green = Math.round(Math.random() * 255);
    blue = Math.round(Math.random() * 255);
}



/*Bibliography
Shiffman, D., 2022. P5JS. [Online]
Available at: https://p5js.org/examples/math-sine-wave.html
[Accessed 01 September 2022].
*/
