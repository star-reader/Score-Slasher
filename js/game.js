let score = 100;
let gameTimer;
let difficultyInterval;
let isGameRunning = false;

const scoreElement = document.querySelector('.score');
const difficultyElement = document.querySelector('.difficulty');
const knifeButton = document.querySelector('.knife-btn');
const messageElement = document.querySelector('.message');
const startOverlay = document.getElementById('startOverlay');
const endOverlay = document.getElementById('endOverlay');
const timerElement = document.querySelector('.timer');

function createBullet() {
    const bullet = document.createElement('div');
    bullet.className = 'bullet';
    bullet.textContent = TERMS[Math.floor(Math.random() * TERMS.length)];
    
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.max(window.innerWidth, window.innerHeight);
    const startX = window.innerWidth / 2 + Math.cos(angle) * radius;
    const startY = window.innerHeight / 2 + Math.sin(angle) * radius;
    
    bullet.style.left = `${startX}px`;
    bullet.style.top = `${startY}px`;
    document.body.appendChild(bullet);

    bullet.addEventListener('click', () => {
        if (isGameRunning) {
            score = Math.min(100, score + Math.floor(Math.random() * 5 + 3));
            scoreElement.textContent = score;
            updateDifficulty(score);
            updateBackgroundColor(score);
            showMessage("糟糕！难度增加了！");
        }
        bullet.remove();
    });

    animateBullet(bullet, startX, startY);
}

function animateBullet(bullet, startX, startY) {
    const targetX = window.innerWidth / 2;
    const targetY = window.innerHeight / 2;
    const speed = 3 + Math.random() * 2;
    
    let startTime = performance.now();
    function animate(currentTime) {
        if (!isGameRunning) {
            bullet.remove();
            return;
        }

        const elapsed = (currentTime - startTime) / 1000;
        const dx = targetX - startX;
        const dy = targetY - startY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const x = startX + (dx / distance) * speed * elapsed * 100;
        const y = startY + (dy / distance) * speed * elapsed * 100;
        
        bullet.style.transform = `translate(${x - startX}px, ${y - startY}px)`;

        if (Math.abs(x - targetX) < 10 && Math.abs(y - targetY) < 10) {
            bullet.remove();
        } else {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

function updateDifficulty(score) {
    let difficulty = "";
    if (score > 90) difficulty = "地狱级";
    else if (score > 80) difficulty = "困难";
    else if (score > 70) difficulty = "普通";
    else if (score > 60) difficulty = "简单";
    else difficulty = "超简单";
    
    difficultyElement.textContent = `当前难度：${difficulty}`;
}

function showMessage(text) {
    const message = text || MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    messageElement.textContent = message;
    messageElement.style.opacity = '1';
    setTimeout(() => {
        messageElement.style.opacity = '0';
    }, 2000);
}

function startGame() {
    score = 100;
    scoreElement.textContent = score;
    updateDifficulty(score);
    updateBackgroundColor(score);
    isGameRunning = true;
    startOverlay.style.display = 'none';
    
    let timeLeft = 12.0;
    timerElement.textContent = timeLeft.toFixed(1);

    difficultyInterval = setInterval(() => {
        if (score < 100 && isGameRunning) {
            score = Math.min(100, score + 1);
            scoreElement.textContent = score;
            updateDifficulty(score);
            updateBackgroundColor(score);
        }
    }, 50);

    gameTimer = setInterval(() => {
        timeLeft -= 0.1;
        timerElement.textContent = timeLeft.toFixed(1);
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 100);

    setInterval(() => {
        if (isGameRunning) {
            createBullet();
        }
    }, 500);
}

function endGame() {
    isGameRunning = false;
    clearInterval(difficultyInterval);
    clearInterval(gameTimer);
    
    document.querySelectorAll('.bullet').forEach(bullet => bullet.remove());
    
    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalDifficulty').textContent = 
        score > 90 ? "地狱级" :
        score > 80 ? "困难" :
        score > 70 ? "普通" :
        score > 60 ? "简单" : "超简单";
    
    endOverlay.style.display = 'flex';
}

// Event Listeners
document.querySelector('.start-btn').addEventListener('click', startGame);
document.querySelector('.restart-btn').addEventListener('click', () => {
    endOverlay.style.display = 'none';
    startGame();
});

knifeButton.addEventListener('click', (e) => {
    if (score > 0 && isGameRunning) {
        score = Math.max(0, score - Math.floor(Math.random() * 5 + 1));
        scoreElement.textContent = score;
        updateDifficulty(score);
        updateBackgroundColor(score);
        createSlashEffect(e.pageX, e.pageY);
        showMessage();

        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
});

document.body.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });

window.addEventListener('resize', () => {
    document.querySelectorAll('.bullet').forEach(bullet => bullet.remove());
});

// Initialize
createParticles(); 