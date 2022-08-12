let canvas;
let canvasContext;
let scoreSpan;
let lifeSpan;

let headImage;
let appleImage;
let bodyImage;
let lifeImage;
let boosterAppleImage;

let apple = {
    x: 0,
    y: 0,
};

let life = {
    x: -40,
    y: -40,
    locateLife: false,
    drawLife: false,
}

let boosterApple = {
    x: -50,
    y: -50,
    locateApple: false,
    drawBoosterApple: false,
};

let snake = {
    x: [],
    y: [],
    size: 3,
    life: 3,
};

let leftDirection = false;
let rightDirection = true;
let upDirection = false;
let downDirection = false;
let inGame = true;    

const DELAY = 140;
const MAX_RAND = 29;
const CELL_SIZE = 10;
const CANVAS_WIDTH = 300; 
const CANVAS_HEIGHT = 300;
const MAX_APPLE_EATEN_TO_APPEAR_LIFE = 1;
const MIN_APPLE_EATEN_TO_APPEAR_LIFE = 15;
const SHOW_BOOSTERAPPLE_AFTER_APPLE_EATEN = 5;
   
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

let score = 0;
let count = 0;
let lifeTimeCount = 0;
let showLifeAfterAppleEaten = 13;


function init() {
    
    canvas = document.getElementById('myCanvas');
    canvasContext = canvas.getContext('2d');
    scoreSpan = document.getElementById("score");
    lifeSpan = document.getElementById("life");

    loadImages();
    createSnake();
    locateApple();
    setTimeout("gameCycle()", DELAY);
}    

function loadImages() {
    
    headImage = new Image();
    headImage.src = 'images/head.png';    
    
    bodyImage = new Image();
    bodyImage.src = 'images/body.png'; 
    
    appleImage = new Image();
    appleImage.src = 'images/apple.png'; 

    lifeImage = new Image();
    lifeImage.src = 'images/life.jpg';

    boosterAppleImage = new Image();
    boosterAppleImage.src = "images/booster_apple.png";
}

function createSnake() {

    for (let z = 0; z < snake.size; z++) {
        snake.x[z] = 50 - z * 10;
        snake.y[z] = 50;
    }
}   

function doDrawing() {
    
    canvasContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    if (inGame) {

        drawBoosterApple();
        drawLife();

        canvasContext.drawImage(appleImage, apple.x, apple.y);

        for (let z = 0; z < snake.size; z++) {
            
            if (z == 0) {
                canvasContext.drawImage(headImage, snake.x[z], snake.y[z]);
            } else {
                canvasContext.drawImage(bodyImage, snake.x[z], snake.y[z]);
            }
        }    
    } else {

        gameOver();
    }        
}

function gameOver() {
    
    canvasContext.fillStyle = 'white';
    canvasContext.textBaseline = 'middle'; 
    canvasContext.textAlign = 'center'; 
    canvasContext.font = 'normal bold 18px serif';
    
    canvasContext.fillText('Game over', CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
}

function checkApple() {

    if ((snake.x[0] == apple.x) && (snake.y[0] == apple.y)) {

        score++;
        count++;
        lifeTimeCount++;
        scoreSpan.innerText = score;
        locateApple();
    }
}

function checkBoosterApple() {
    if ((snake.x[0] == boosterApple.x) && (snake.y[0] == boosterApple.y)) {
        score += 3;
        scoreSpan.innerText = score;
        dissappearBoosterApple();
    }
}

function dissappearBoosterApple() {
    count = 0;
    boosterApple.locateApple = false;
    boosterApple.drawBoosterApple = false;
}

function move() {

    for (let z = snake.size; z > 0; z--) {
        snake.x[z] = snake.x[(z - 1)];
        snake.y[z] = snake.y[(z - 1)];
    }

    if (leftDirection) {
        snake.x[0] -= CELL_SIZE;
    }

    if (rightDirection) {
        snake.x[0] += CELL_SIZE;
    }

    if (upDirection) {
        snake.y[0] -= CELL_SIZE;
    }

    if (downDirection) {
        snake.y[0] += CELL_SIZE;
    }
}    

function checkCollision() {

    if (snake.y[0] >= CANVAS_HEIGHT) {
        resetAfterGetKilled();
    }

    if (snake.y[0] < 0) {
        resetAfterGetKilled();
    }

    if (snake.x[0] >= CANVAS_WIDTH) {
        resetAfterGetKilled();
    }

    if (snake.x[0] < 0) {
        resetAfterGetKilled();
    }
}

function locateApple() {

    apple.x = Math.floor(Math.random() * MAX_RAND) * CELL_SIZE;
    apple.y = Math.floor(Math.random() * MAX_RAND) * CELL_SIZE;
} 

function locateBoosterApple() {

    if(!boosterApple.locateApple && count == SHOW_BOOSTERAPPLE_AFTER_APPLE_EATEN) {

        boosterApple.x = Math.floor(Math.random() * MAX_RAND) * CELL_SIZE;
        boosterApple.y = Math.floor(Math.random() * MAX_RAND) * CELL_SIZE;
        boosterApple.locateApple = true;
    }
}

function drawBoosterApple() {
    if(count >= SHOW_BOOSTERAPPLE_AFTER_APPLE_EATEN) {
        locateBoosterApple();
        if(!boosterApple.drawBoosterApple && count == SHOW_BOOSTERAPPLE_AFTER_APPLE_EATEN) {
            setTimeout('dissappearBoosterApple()', 5000);
        }
        canvasContext.drawImage(boosterAppleImage, boosterApple.x, boosterApple.y);
        boosterApple.drawBoosterApple = true;
    }
}

function gameCycle() {
    
    if (inGame) {

        checkApple();
        checkBoosterApple();
        checkLife();
        checkCollision();
        move();
        doDrawing();
        setTimeout("gameCycle()", DELAY);
    }
}

onkeydown = function(e) {
    
    let key = e.keyCode;
    
    if ((key == LEFT_KEY) && (!rightDirection)) {
        
        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == RIGHT_KEY) && (!leftDirection)) {
        
        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == UP_KEY) && (!downDirection)) {
        
        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if ((key == DOWN_KEY) && (!upDirection)) {
        
        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }        
};    

function resetAfterGetKilled() {
    snake.life--;
    lifeSpan.innerText = snake.life;
    if(snake.life == 0) {
        inGame = false;
    } else {
        createSnake();
    }
}

function locateLife() {

    if(!life.locateLife && lifeTimeCount == showLifeAfterAppleEaten) {
        do {
            life.x = Math.floor(Math.random() * MAX_RAND) * CELL_SIZE;
            life.y = Math.floor(Math.random() * MAX_RAND) * CELL_SIZE;
        } while((life.x == apple.x) && (life.y == apple.y) || (life.x == boosterApple.x) && (life.y == boosterApple.y));
        
        life.locateLife = true;
    }
}

function drawLife() {
    
    if(lifeTimeCount >= showLifeAfterAppleEaten){
        locateLife();
        if(!life.drawLife && lifeTimeCount == showLifeAfterAppleEaten) {
            setTimeout("dissappearLife()", 5000);
        }
        canvasContext.drawImage(lifeImage, life.x, life.y);
        life.drawLife = true;
    }
}

function checkLife() {
    if ((snake.x[0] == life.x) && (snake.y[0] == life.y)) {
        snake.life += 1;
        lifeSpan.innerText = snake.life;
        dissappearLife();
    }
}

function dissappearLife() {
    lifeTimeCount = 0;
    showLifeAfterAppleEaten = Math.floor(Math.random() * (MAX_APPLE_EATEN_TO_APPEAR_LIFE - MIN_APPLE_EATEN_TO_APPEAR_LIFE + 1) + MIN_APPLE_EATEN_TO_APPEAR_LIFE);
    life.locateLife = false;
    life.drawLife = false;
}
