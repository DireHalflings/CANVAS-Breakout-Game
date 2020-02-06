let canvas = document.getElementById("myCanvas");
//600x800
let ctx = canvas.getContext("2d");

let frameRate = 10;
let paddleElevation = 78;
let x = canvas.width / 2;
let y = canvas.height - paddleElevation;


let ballSpeed = 8;
let ballx = ballSpeed;
let bally = -ballSpeed;
let ballRad = 8;

let paddleSpeed = 8
let paddleWidth = 80;
let paddleHeight = 12;
let paddleX = (canvas.width - paddleWidth) / 2;



let rightPressed = false;
let leftPressed = false;
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRad, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}


function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleElevation, paddleWidth, paddleHeight);
    //(pos     w  h)(w  x  h  object)
    ctx.fillstyle = "blue";
    ctx.fill();
    ctx.closePath();
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    x += ballx;
    y += bally;

    if (rightPressed) {
        paddleX += paddleSpeed;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    }

    else if (leftPressed) {
        paddleX -= paddleSpeed;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }

    if ((x + ballx > canvas.width - ballRad) || (x + ballx < ballRad)) {
        ballx = -ballx;
    } else if ((y + bally > canvas.height - ballRad) || (y + bally < ballRad)) {
        bally = -bally;
    } else if ((y + bally == canvas.height - paddleElevation) && ((x > paddleX) && (x < paddleX + paddleWidth))) {
        console.log(y + ' ' + ' ' + bally + ' ' + ' ' + canvas.height)
        bally = -bally;
    } else if (y + bally > canvas.height - paddleElevation) {
        console.log('loser');
    }
}





setInterval(draw, frameRate);

