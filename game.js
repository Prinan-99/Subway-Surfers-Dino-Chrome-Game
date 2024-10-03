const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

let gameRunning = false;

let player = {
    x: 50,
    y: 300,
    width: 50,
    height: 50,
    color: 'red',  
    velocityY: 0,
    gravity: 1,
    jumpPower: -15,
    isJumping: false,
};

let background = {
    x: 0,
    speed: 2,
};

let obstacles = [];
let obstacleSpeed = 5;
let score = 0;

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBackground() {
    // Simple colored ground
    ctx.fillStyle = '#228B22';  // Ground color
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

    // Simple sky effect with a gradient
    let skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(1, '#4682B4');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height - 50);
}

function createObstacle() {
    let obstacle = {
        x: canvas.width,
        y: canvas.height - 100,
        width: 50,
        height: 50,
        color: 'black',
    };
    obstacles.push(obstacle);
}

function drawObstacles() {
    obstacles.forEach((obstacle, index) => {
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        obstacle.x -= obstacleSpeed;

        
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(index, 1);
            score++;
        }

    
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            gameOver();
        }
    });
}

function updatePlayer() {
    player.velocityY += player.gravity;
    player.y += player.velocityY;

    if (player.y + player.height > canvas.height - 50) {
        player.y = canvas.height - 50 - player.height;
        player.velocityY = 0;
        player.isJumping = false;
    }
}

function jump() {
    if (!player.isJumping) {
        player.velocityY = player.jumpPower;
        player.isJumping = true;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();
    drawPlayer();
    updatePlayer();
    drawObstacles();

    if (gameRunning) {
        requestAnimationFrame(gameLoop);
    }
}

function startGame() {
    document.getElementById('startScreen').style.opacity = 0;
    gameRunning = true;
    setTimeout(() => {
        document.getElementById('startScreen').style.display = 'none';
        gameLoop();
    }, 500);
}

function gameOver() {
    gameRunning = false;
    document.getElementById('gameOverScreen').style.opacity = 1;
    document.getElementById('gameOverScreen').style.pointerEvents = 'all';
}

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('restartBtn').addEventListener('click', () => {
    location.reload(); 
});

document.addEventListener('keydown', (event) => {
    
    if (event.code === 'Space') {  
        jump();
    }
});

setInterval(createObstacle, 2000);
