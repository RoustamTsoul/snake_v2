const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const field = new Image();
field.src = "img/field3.png";

const beef = new Image();
beef.src = "img/beef.png";

let head = new Image();
head.src = "img/head.png";

let body = new Image();
body.src = "img/body.png";
let body1 = new Image();
body1.src = "img/body1.png";
let body2 = new Image();
body2.src = "img/body2.png";
let body3 = new Image();
body3.src = "img/body3.png";
let body4 = new Image();
body4.src = "img/body4.png";
let body5 = new Image();
body5.src = "img/body5.png";
let body6 = new Image();
body6.src = "img/body6.png";
let body7 = new Image();
body7.src = "img/body7.png";
let body8 = new Image();
body8.src = "img/body8.png";

let bodyImages = [
    body, body1, body2, body3, body4, body5, body6, body7, body8
];

// Function to shuffle the array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(bodyImages);

let box = 32;
let score = 0;
let food = {
    x: Math.floor((Math.random() * 24 + 1)) * box,
    y: Math.floor((Math.random() * 18 + 3)) * box,
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

document.addEventListener("keydown", direction);

let dir;
let gameOver = false;

function direction(event) {
    if (event.keyCode == 65 && dir != "right")
        dir = "left";

    else if (event.keyCode == 87 && dir != "down")
        dir = "up"

    else if (event.keyCode == 68 && dir != "left")
        dir = "right"

    else if (event.keyCode == 83 && dir != "up")
        dir = "down"

}

function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            gameOver = true;
            clearInterval(game)
        }
    }
}



function drawGame() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(field, 0, 0);

    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(beef, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        if (i === 0) {
            ctx.drawImage(head, snake[i].x, snake[i].y);
        } else {
            const bodyIndex = (i - 1) % bodyImages.length;
            const bodyImage = bodyImages[bodyIndex];
            ctx.drawImage(bodyImage, snake[i].x, snake[i].y);
        }
    }

    ctx.fillStyle = "darkred";
    ctx.font = "60px 'Creepster' ";
    ctx.fillText(score, box * 2.5, box * 2.5);

    // Draw the line above the score text
    ctx.lineWidth = box / 3;
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(box * 1.8, box * 1.8 - box / 1);
    ctx.lineTo(box * 1.5 + (canvas.width * 0.9), box * 1.5 - box / 1.5);
    ctx.stroke();

    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.strokeText(score, box * 2.5, box * 2.5);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX == food.x && snakeY == food.y) {
        score++
        food = {
            x: Math.floor((Math.random() * 24 + 1)) * box,
            y: Math.floor((Math.random() * 18 + 3)) * box,
        };
    } else {
        snake.pop();
    }

    if (snakeX < box || snakeX > box * 24 || snakeY < 2 * box || snakeY > box * 24 || gameOver) {
        clearInterval(game)
        ctx.fillStyle = "darkred";
        ctx.font = "120px 'Creepster', cursive";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);



        return;

    }

    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);
    snake.unshift(newHead);
}


let game = setInterval(drawGame, 100);