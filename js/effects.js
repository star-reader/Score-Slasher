function createParticles() {
    const particles = document.querySelector('.particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 4 + 'px';
        particle.style.height = particle.style.width;
        resetParticle(particle);
        particles.appendChild(particle);
    }
}

function resetParticle(particle) {
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = -10 + 'px';
    particle.style.opacity = Math.random() * 0.5 + 0.2;
    animateParticle(particle);
}

function animateParticle(particle) {
    const duration = Math.random() * 3000 + 2000;
    particle.style.transition = `top ${duration}ms linear`;
    setTimeout(() => {
        particle.style.top = '100vh';
        setTimeout(() => {
            resetParticle(particle);
        }, duration);
    }, 10);
}

function updateBackgroundColor(score) {
    const body = document.body;
    let color1, color2;
    
    if (score > 75) {
        color1 = `rgb(255, ${Math.floor((100-score) * 10.2)}, 0)`;
        color2 = `rgb(204, ${Math.floor((100-score) * 8.16)}, 0)`;
    } else if (score > 50) {
        color1 = `rgb(255, ${Math.floor((75-score) * 10.2)}, 0)`;
        color2 = `rgb(255, ${Math.floor((75-score) * 8.16)}, 0)`;
    } else if (score > 25) {
        color1 = `rgb(255, 255, ${Math.floor(score * 10.2)})`;
        color2 = `rgb(255, 255, ${Math.floor(score * 8.16)})`;
    } else {
        color1 = `rgb(${Math.floor(score * 10.2)}, 255, 0)`;
        color2 = `rgb(${Math.floor(score * 8.16)}, 204, 0)`;
    }
    
    body.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
}

function createSlashEffect(x, y) {
    const slash = document.createElement('img');
    slash.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M20.96 17.84l-2.12-2.12-2.83 2.83 2.12 2.12a1.5 1.5 0 0 0 2.12 0l.71-.71a1.5 1.5 0 0 0 0-2.12zM3.71 2.29a1 1 0 0 0-1.42 1.42l18 18a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z'/%3E%3C/svg%3E";
    slash.className = 'slash';
    slash.style.left = `${x - 30}px`;
    slash.style.top = `${y - 30}px`;
    document.body.appendChild(slash);

    slash.style.animation = 'slashAnimation 0.5s ease-out forwards';
    setTimeout(() => slash.remove(), 500);
} 