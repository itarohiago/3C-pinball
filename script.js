const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configurações do canvas
canvas.width = 400;
canvas.height = 600;

let ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    dx: 2,
    dy: -2,
    radius: 10
};

let paddleWidth = 80;
let paddleHeight = 10;
let leftPaddleX = 70;
let rightPaddleX = canvas.width - paddleWidth - 70;
let paddleY = canvas.height - 30;
let leftPaddlePressed = false;
let rightPaddlePressed = false;

// Desenha a bola
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Desenha as pás
function drawPaddles() {
    ctx.fillStyle = "#0095DD";
    
    // Pás esquerda e direita
    ctx.fillRect(leftPaddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillRect(rightPaddleX, paddleY, paddleWidth, paddleHeight);
}

// Atualiza a posição da bola
function updateBallPosition() {
    // Verifica colisão com as bordas
    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > paddleY - ball.radius) {
        // Verifica colisão com as pás
        if ((ball.x > leftPaddleX && ball.x < leftPaddleX + paddleWidth) || 
            (ball.x > rightPaddleX && ball.x < rightPaddleX + paddleWidth)) {
            ball.dy = -ball.dy;
        }
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
}

// Controla as pás
function movePaddles() {
    if (leftPaddlePressed && leftPaddleX > 0) {
        leftPaddleX -= 5;
    }
    if (rightPaddlePressed && rightPaddleX < canvas.width - paddleWidth) {
        rightPaddleX += 5;
    }
}

// Detecta o pressionamento das teclas
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        leftPaddlePressed = true;
    } else if (e.key === "ArrowRight") {
        rightPaddlePressed = true;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") {
        leftPaddlePressed = false;
    } else if (e.key === "ArrowRight") {
        rightPaddlePressed = false;
    }
});

// Função principal do jogo
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddles();
    updateBallPosition();
    movePaddles();
    requestAnimationFrame(gameLoop);
}

gameLoop();
