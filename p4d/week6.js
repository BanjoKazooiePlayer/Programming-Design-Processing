/*
    Paste the code for your week 6 exercise below.
*/
var lvl = { lives: 3, score: 0, finalScore: 0 } // object to store array and level
var instructions = { // object used for game instructions
    paddleMove: "Move the paddle using left and right arrows",
    ballRelease: "Release the ball with up arrow"
}
var paddX;//paddle x position
var paddY;//paddle y position
var paddHeight = 50;//paddle height
var paddWidth = 120; // paddle width
var w; // window width
var h; // window height
var starY = 0; //star y locations
var starX = 100; // star x location (it stars at 100 but it randomly moves throughout the game)
var time = 0; // all three varibles will help count
var seconds = 0;
var mins = 0;
var pSpeed = 6; // paddle speed
var ballX;//ball location x
var ballY;// ball location y
var ballRad = 50; // ball radius
var ballStuck = true// ball stuck on the paddle at the start
var ballSpeed = 6; // how fast the ball travels per frame 
/*All the next four variables are used to determine which way the ball goes*/
var right = true;
var left = false;
var up = true;
var down = false;
var gameOver = false;// tells if the game is over or not
var help = "Press Enter for instructions"; // string used for game instructions
var helpDisplay = false;
var angle = 45;
var rectDrawX = 0;
var rectDrawY = 0;
var blocksY = 0;
var blockXArr = [];
var test = false;
var partArr = [];

function setup() {
    //set up screen size
    if (windowWidth > windowHeight) {
        createCanvas(windowHeight, windowHeight);
        w = windowHeight;
        h = windowHeight;
    } else {
        createCanvas(windowWidth, windowWidth);
        w = windowWidth;
        h = windowWidth;
    }
    //set up the paddle
    paddStart();
    // start the block array
    blockArray();
    par();
}


function paddStart() {
    paddY = h - 10 - paddHeight; // paddle located on y axis at the bottom of the playing area
    paddX = (w / 2) - (paddWidth / 2); // paddle located in the middle of the screen
    ballY = paddY - paddHeight / 2; // ball location 
    ballX = paddX + paddWidth / 2; //ball location x
}

function blockArray() {
    let blockW = Math.round(w / 6)+10;
    for (let l = 0; l < blockW; l++) {
        blockXArr[l] = blockW * l;
    }
}

function par() {
    for (let l = 0; l < 400; l++) {
        partArr[l] = { x: random(0, w), y: random(0, h), xSpeed: random(1, 3), ySpeed: random(1, 3), partSize: random(2,10) }
    }
}

/* used to create the star
 * x and y are used for the location and npoints is how many points the star has on it 
 */
function star(x, y, radius1, radius2, npoints) { 
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}

//function to display the game scores
function score() {
    fill(255);
    textSize(20);
    text("Lives: " + lvl.lives, 10, 40);
    text("Score: " + lvl.score, 100, 40);
}

//function to control the ball movements
function ball() {
    //right wall collision
    if (ballX >= w - ballRad / 2) {
        right = false;
        left = true;
    }
    //left wall collision
    if (ballX <= 0 + ballRad / 2) {
        left = false;
        right = true;
    }
    //top collision
    if (ballY <= 0 + ballRad / 2) {
        up = false;
        down = true;
    }
    //paddle collision
    if (ballY == paddY - paddHeight / 2) {
        if (ballX >= paddX && ballX <= paddX + paddWidth) {
            down = false;
            up = true;
        }
    }

    //ball is stuck on the paddle before user hits the up arrow
    if (ballStuck) {
        ballX = paddX + paddWidth / 2;
    }

    //if the ball hits goes past the paddle
    if (ballY > h + 20) {
        ballY = paddY - paddHeight / 2; // move ball 
        lvl.finalScore += lvl.score; // update final score
        lvl.score = 0; // update live score
        lvl.lives--; // update the lives
        ballStuck = true; // have ball stuck on paddle
    }

    //ball movements when the ball is not stuck to the paddle
    if (ballStuck == false) {
        if (up == true) {
            ballY -= ballSpeed;
        }
        if (down == true) {
            ballY += ballSpeed;
        }
        if (right == true) {
            if (ballSpeed < 10) ballX += ballSpeed;
        }
        if (left == true) {
            if (ballSpeed > 0) ballX -= ballSpeed;
        }
    }
    //drawing the ball
    fill(250);
    circle(ballX, ballY, ballRad);
}

//drawing the paddle
function paddle() {
    fill(255);
    rect(paddX, paddY, paddWidth, paddHeight);
}

//player keyboard control
function keyPressed() {
    if (keyIsDown(LEFT_ARROW)) {
        if (paddX > 0) paddX -= pSpeed;
        return false;
    } else if (keyIsDown(RIGHT_ARROW)) {
        if (paddX < w - paddWidth) paddX += pSpeed;
        return false;
    }
    if (keyIsDown(UP_ARROW)) ballStuck = false;
    if (keyIsDown(ENTER)) {
        helpDisplay = true;
    }
}

//keep time of the game
function counter() {
    time++;
    if (time >= 60) {
        time = 0;
        seconds++;
    }
    if (seconds >= 60) {
        seconds = 0;
        mins++;
    }
}

// have star fall from the top and randomly generate in a new place every time
function starFall(sx,sy) {
    starSize = time;
    star(starX, starY, starSize, 10, 8);
    starY += 3;
    if (starY >= h + 100) {
        starY = -100;
        starX = Math.round((Math.random() * w));
    }

    //check star ball collision
    for (let bx = 0; bx < ballRad; bx++) {
        for (let by = 0; by < ballRad; by++) {
            if (((ballX + bx) > starX) && (ballX + bx) < (starX + starSize)) {
                if (((ballY + by) > starY) && (ballY + by) < (starY + starSize)) {
                    lvl.score += 10;
                    starY = -200;
                    starX = Math.round((Math.random() * w));
                }
            }
        }
    }

    //check star paddle collision
    for (let px = 0; px < paddWidth; px++) {
        for (let py = 0; py < paddHeight; py++) {
            if (((paddX + px) > starX) && (paddX + px) < (starX + starSize)) {
                if (((paddY + py) > starY) && (paddY + py) < (starY + starSize)) {
                    lvl.lives--;
                    starY = -200;
                    starX = Math.round((Math.random() * w));
                    paddX = w / 2;
                }
            }
        }
    }
}




//background decoration
function rectDraw() {
    rectDrawX++;
    rectDrawY++;
    if (angle <= 360) {
        angle += 0.02;
    }
    let c = cos(angle);
    translate(width / 2, rectDrawY);
    rectMode(CENTER);
    fill(255);
    rotate(c);
    stroke(frameCount % 250);
    noFill();
    rect(0, 0, 50, 50);
    resetMatrix();
    rectMode(CORNER);
    if (rectDrawY > h + 100) rectDrawY = -200;
}

//drawing the snow particle system
function particles() {
    for (let l = 0; l < partArr.length; l++) {
        noStroke();
        fill('rgba(200,160,160,0.5)');//made it half transparent and drawn first for depth
        if (partArr[l].x >= w) { partArr[l].x = -100 } //continue the particles flying across the screen and they leave it
        if (partArr[l].y >= w) { partArr[l].y = -100 }//same as above. Reseting y position
        partArr[l].x += partArr[l].xSpeed; //adding the movement
        partArr[l].y += partArr[l].ySpeed;
        circle(partArr[l].x, partArr[l].y, partArr[l].partSize);//drawing the particle
    }
}

//display help menu for the first minute of the game
function helpMenu() {
    if (mins < 1) {
        if (helpDisplay == true) {
            text(instructions.paddleMove, 300, 40);
            text(instructions.paddleMove, 300, 80);
        } else {
            text(help, 400, 40);
        }
    }
}



//display message at the end of the game
function endGame() {
    if (test == false) text("GAME OVER \nFinal Score:\n" + lvl.finalScore, (w / 2) - 50, h / 2);
    if (test == true) {
        lvl.finalScore += lvl.score;
        lvl.score = 0;
        text("YOU WIN \nFinal Score:\n" + lvl.finalScore, (w / 2) - 50, h / 2);
    }
}

// drawing and collisions for the block arrays
function blockArrayDraw(ypos) {
    let hit = false;
    for (let l = 0; l < blockXArr.length; l++) {
        rect(blockXArr[l], ypos, 100, 50);

        for (let bx = 0; bx < ballRad; bx++) {
            for (let by = 0; by < ballRad; by++) {
                if (((ballX + bx) > blockXArr[l]) && (ballX + bx) < (blockXArr[l] + 100)) {
                    if (((ballY + by) > ypos) && (ballY + by) < (ypos + 50)) {
                        lvl.score += 100;                       
                        if (up == true) {
                            up = false;
                            down = true;
                        } else {
                            down = false;
                            up = true;
                        }
                        blockXArr[l] = -200
                    }
                }
            }
        }        
    }
   
}

function draw() {
    background(0);//black background
    if (test == false) {
        particles();//draw particle system
        counter();//start the counter used for different functions
        keyPressed();//keyboard, user interaction control
        score();// keep the score running
        helpMenu();//run the help instrustions
        paddle(); // draw and control the paddle
        ball(); // draw the ball
        blockArrayDraw(300); // dray the block array at 300 on the y axis
        starFall();
    }
    if (mins > 2) {
        endGame();//end the game after allocated time
    }

    if (lvl.lives == 0) endGame();
}