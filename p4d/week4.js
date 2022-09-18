/*
    Paste the code for your week 4 exercise below.
*/
let canvasSize = 500;

//place a smaller circle in a smaller circle
function innerCircle(xPos, yPos, rad, red, green, blue) {
    fill(red, green, blue);
    circle(xPos, yPos, rad);
    fill(0);
    circle(xPos, yPos, rad - 2);
}

/*make different kind of stars
 *x and y are it's location 
 * radius1 (stupid name sorry) and radius2 dictate the size
 * npoints is how many points the star has
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

/*Randomly draws dots all over the canvas
 * Math.round is used to round up the float to an int
*/ 
function nightSky(canvasSize, starPixels, starCount) {
    for (let a = 0; a < starCount; a++) {
        let randX = Math.round((Math.random() * canvasSize));
        let randY = Math.round((Math.random() * canvasSize));
        fill(255, 255, 200);
        circle(randX, randY, starPixels);
    }
}

//for loop that draws a smaller circle over and over. It changes by 6 pixels
function fadingCircle(circleSize, center) {
    for (let x = 0; x < circleSize; x = x + 6) {
        fill(0, 0, 0 + x);
        circle(center, center, circleSize - x);
    }
}

//draws the tree stars at the top 
function starPins(dist, starWidth, starSize, starPoints, innerWidth) {
    fill(255);
    for (let loc = 1; loc < 4; loc++) {
        let yVal = 100;
        if (loc == 2) {
            yVal = 50;
        } else yVal = 100;
        star(dist * loc, yVal, starWidth, starSize, starPoints);
        star(dist * loc, yVal, innerWidth, starSize, starPoints);
    }
}

// turn of the loop to help set the background stars because they are generated randomly
function setup() {
    createCanvas(canvasSize, canvasSize);
    noLoop();
}

function draw() {
    let circleSize = 500;
    let center = canvasSize / 2;
    let starSize = 30;
    let starWidth = 10;
    let starPoints = 6;
    let starGap = 125;
    let pinSize = 80;
    let pinWidth = 10;
    let pinPoints = 4;
    let innerWidth = 1;
    let starPixels = 2;
    let starCount = 500;
    
    background(0);

    //Randomly place stars in background
    nightSky(canvasSize, starPixels, starCount);

    //Generate fading colour circle in background
    fadingCircle(circleSize, center);

    //Make three stars and place them 125 pixels appart on the x axis
    starPins(starGap, starWidth, starSize, starPoints, innerWidth);

    //Place pin in the middle of the canvas
    star(center, center, pinWidth, pinSize, pinPoints);
    star(center, center, innerWidth, pinSize, pinPoints);
    
}




