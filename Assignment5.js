//canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640; 
canvas.height = 544;
document.getElementById("theCanvas").appendChild(canvas);

//background image 
var backBool = false;
var bgImage = new Image();
bgImage.onload = function(){ backBool = true };
bgImage.src = "images/background.jpg";

//candy image
var candyBool = false;
var candyImage = new Image();
candyImage.onload = function(){ candyBool = true; };
candyImage.src = "images/candy.png";

var score = 0;
var hopInterval = 2000;

function resetLocation() {
    candy.x = 30 + (Math.random() * (canvas.width - 130));
    candy.y = 30 + (Math.random() * (canvas.height - 130));
};

var hop = setInterval(
    function ()
    { resetLocation();}
    , hopInterval);

var candy = { speed: 300 };

canvas.addEventListener("mousedown", clicked, false);
function clicked(e) {
    e.preventDefault();
    var x = e.clientX;
    var y = e.clientY;

    if (x > candy.x + 70 && x < candy.x + 158 && y > candy.y + 55 && y < candy.y + 150){
        score += 10;
        resetLocation();
        
        if (hopInterval - 100 >= 50) {
            clearInterval(hop);
            hopInterval -= 100;
            hop = setInterval(function () {
                resetLocation();
            }, hopInterval);
        }
    }
}

//reset speed button
var resetSpeed = function () {
    clearInterval(hop);
    hopInterval = 2000;
    hop = setInterval(function () {
        resetLocation();
    }, hopInterval);
};

//reset score button
var resetScore = function () {
    score = 0;
    resetSpeed();
};

var render = function () {
    if (backBool) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (candyBool) {
        ctx.drawImage(candyImage, candy.x, candy.y);
    }

    document.getElementById("score").innerHTML = "Score : " + score;
};

//game start!
var gameStart = function () {
    render();
    requestAnimationFrame(gameStart);
};

gameStart();