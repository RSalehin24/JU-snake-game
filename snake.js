let canvas;
let canvasContext;
let scoreSpan;
let levelSpan;

let headImage;
let appleImage;
let bodyImage;
let wallImage;
let doorImage;

let apple = {
    x: 0,
    y: 0,
};

let snake = {
    x: [],
    y: [],
    size: 3,
};

let wall = {
    x: [[100, 90, 80, 70, 60], [150, 150, 150, 150, 150], [70, 70, 70, 70, 70], [250, 240, 230, 220, 210], [290, 280, 270, 260, 250], [250, 250, 250, 250, 250], [130, 140, 150, 160, 170], [150, 150, 150, 150], [250, 250, 250, 250, 250], [230, 240, 250, 260, 270]],
    y: [[30, 30, 30, 30, 30], [100, 90, 80, 70, 60], [200, 210, 220, 230, 240], [270, 270, 270, 270, 270], [60, 60, 60, 60, 60], [100, 110, 120, 130, 140], [150, 150, 150, 150], [130, 140, 150, 160, 170], [30, 40, 50, 60, 70, 80], [250, 250, 250, 250, 250]]
}

let currentWall = {
    x: [wall.x[0], wall.x[1], wall.x[2], wall.x[3]],
    y: [wall.y[0], wall.y[1], wall.y[2], wall.y[3]],
    size: 5,
}

let door = {
    x: [[250, 250, 250], [250, 250, 250], [50, 50, 50], [50, 50, 50], [110, 120, 130], [170, 180, 190], [110, 120, 130], [170, 180, 190]],
    y: [[110, 120, 130], [170, 180, 190], [110, 120, 130], [170, 180, 190], [250, 250, 250], [250, 250, 250], [50, 50, 50], [50, 50, 50]],
}

let currentDoor = {
    x: [],
    y: [],
    size: 3,
    show: false,
}

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
   
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

let score = 0;
let level = 0;
let appleEatenCount = 0;

function init() {
    
    canvas = document.getElementById('myCanvas');
    canvasContext = canvas.getContext('2d');
    scoreSpan = document.getElementById("score");
    levelSpan = document.getElementById("level");

    loadImages();
    createSnake();
    locateApple();
    drawWall();
    setTimeout("gameCycle()", DELAY);
}    

function loadImages() {
    
    headImage = new Image();
    headImage.src = 'images/head.png';    
    
    bodyImage = new Image();
    bodyImage.src = 'images/body.png'; 
    
    appleImage = new Image();
    appleImage.src = 'images/apple.png'; 

    wallImage = new Image();
    wallImage.src = 'images/wall.jpg';

    doorImage = new Image();
    doorImage.src = 'images/door.png';
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

        canvasContext.drawImage(appleImage, apple.x, apple.y);

        for (let z = 0; z < snake.size; z++) {
            
            if (z == 0) {
                canvasContext.drawImage(headImage, snake.x[z], snake.y[z]);
            } else {
                canvasContext.drawImage(bodyImage, snake.x[z], snake.y[z]);
            }
        }    

       drawWall();
       drawDoor();
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
        appleEatenCount++;
        scoreSpan.innerText = score;
        locateApple();
    }
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
        inGame = false;
    }

    if (snake.y[0] < 0) {
       inGame = false;
    }

    if (snake.x[0] >= CANVAS_WIDTH) {
      inGame = false;
    }

    if (snake.x[0] < 0) {
      inGame = false;
    }
}

function locateApple() {
    let isSame = false;

    while(true) {
        apple.x = Math.floor(Math.random() * MAX_RAND) * CELL_SIZE;
        apple.y = Math.floor(Math.random() * MAX_RAND) * CELL_SIZE;

        for(let w = 0; w < 4; w++) {
            for (let z = 0; z < currentWall.size; z++) {
                if(apple.x == currentWall.x[w][z] && apple.y == currentWall.y[w][z]) {
                    isSame = true;
                    break;
                }
            }
            if(isSame) {
                break;
            }
        }
        
        if(isSame) {
            continue;
        }

        if(currentDoor.show) {

            for(let d = 0; d < currentDoor.size; d++) {
                if(apple.x ==  currentDoor.x[0][d] && apple.y == currentDoor.y[0][d] || apple.x ==  currentDoor.x[1][d] && apple.y == currentDoor.y[1][d]) {
                    isSame = true;
                    break;
                }
            }

            if(isSame) {
                continue;
            } else {
                break;
            }
        }
        

        if(!isSame) {
            break;
        }
    }
}    

function gameCycle() {
    
    if (inGame) {
        checkWallCollision();
        checkLevel();
        checkApple();
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

function checkLevel() {

    if(appleEatenCount > 15 && level === 0 && !currentDoor.show) {
        setDoorLocation();
        drawDoor();
    } else if(appleEatenCount >27 && level === 1 && !currentDoor.show) {
        setDoorLocation();
        drawDoor();
    } else if(appleEatenCount >39 && level === 2 && !currentDoor.show) {
        setDoorLocation();
        drawDoor();
    }

    checkDoorPass();
};

function setDoorLocation() {
    if(level === 0) {
        currentDoor.x = [door.x[0], door.x[1]];
        currentDoor.y = [door.y[0], door.y[1]];
    } else if(level === 1) {
        currentDoor.x = [door.x[2], door.x[3]];
        currentDoor.y = [door.y[2], door.y[3]];
    } else if(level === 2) {
        currentDoor.x = [door.x[4], door.x[5]];
        currentDoor.y = [door.y[4], door.y[5]];
    }

    currentDoor.show = true;
};

function drawDoor() {
    if(currentDoor.show) {
        for(let d = 0; d < currentDoor.size; d++) {
            canvasContext.drawImage(doorImage, currentDoor.x[0][d], currentDoor.y[0][d]);
            canvasContext.drawImage(doorImage, currentDoor.x[1][d], currentDoor.y[1][d]);
        }
    }
};

function checkDoorPass() {
    if(currentDoor.show) {
        let doorFirstX;
        let doorFirstY;

        if(!(currentDoor.x[0][currentDoor.size - 1] === currentDoor.x[0][currentDoor.size - 2])) {
            doorFirstX = currentDoor.x[0][currentDoor.size - 1] + 10;
            doorFirstY = currentDoor.y[0][currentDoor.size - 1];
        } else {
            doorFirstY = currentDoor.y[0][currentDoor.size - 1] + 10;
            doorFirstX = currentDoor.x[0][currentDoor.size - 1];
        }
        
        for(let d = 0; d < currentDoor.size; d++) {
            if(snake.x[0] == currentDoor.x[0][d] && snake.y[0] == currentDoor.y[0][d]) {
                inGame = false;
                break;
            }

            if(snake.x[0] == currentDoor.x[1][d] && snake.y[0] == currentDoor.y[1][d]) {
                inGame = false;
                break;
            }

            if(!(currentDoor.x[0][currentDoor.size - 1] === currentDoor.x[0][currentDoor.size - 2])) {
                if(snake.x[0] == (doorFirstX + d*10) && snake.y[0] == doorFirstY) {
                    goneThroughTheDoor();
                    break;
                }
            } else {
                if(snake.x[0] == doorFirstX && snake.y[0] == (doorFirstY + d*10)) {
                    goneThroughTheDoor();
                    break;
                }
            }
        }
    }
}

function goneThroughTheDoor() {
    level++;
    appleEatenCount = 0;
    levelSpan.innerText = level;
    currentDoor.show = false;
    updateWallLocation();
    drawWall();
}

function updateWallLocation() {
    if(level === 1) {
        currentWall.x = [wall.x[4], wall.x[5], wall.x[6], wall.x[7]];
        currentWall.y = [wall.y[4], wall.y[5], wall.y[6], wall.y[7]];
    } else if(level === 2) {
        currentWall.x = [wall.x[8], wall.x[9], wall.x[0], wall.x[1]];
        currentWall.y = [wall.y[8], wall.y[9], wall.y[0], wall.y[1]];
    } else if(level === 3) {
        currentWall.x = [wall.x[8], wall.x[6], wall.x[3], wall.x[7]];
        currentWall.y = [wall.y[8], wall.y[6], wall.y[3], wall.y[7]];
    }
};

function drawWall() {

    for(let w = 0; w < 4; w++) {
        for (let z = 0; z < currentWall.size; z++) {
            canvasContext.drawImage(wallImage, currentWall.x[w][z], currentWall.y[w][z]);
        }
    }
}

function checkWallCollision() {

    for(let w = 0; w < 4; w++) {
        for (let z = 0; z < currentWall.size; z++) {
            if(snake.x[0] == currentWall.x[w][z] && snake.y[0] == currentWall.y[w][z]) {
                inGame = false;
                break;
            }
        }
    }
}
