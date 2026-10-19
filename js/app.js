
/* ============================================
   JEWELS BLAST - MAIN APPLICATION
   ============================================ */

// ============ LOADING SCREEN LOGIC ============

const loadingTips = [
    "🍬 Match 3 candies to crush them!",
    "🧱 Fill complete rows to clear blocks!",
    "🔢 Connect numbers with paths!",
    "💎 Collect jewels to earn rewards!",
    "⭐ Complete levels to unlock new ones!",
    "🎯 Plan your moves carefully!",
    "🔥 Create combos for bonus points!",
    "💡 Look for special patterns!",
    "🏆 Beat your high score!",
    "🎮 Have fun playing!"
];

let loadProgress = 0;
let tipIndex = 0;

// Simulate loading
function startLoading() {
    const loadingBarFill = document.getElementById('loading-bar-fill');
    const loadingText = document.getElementById('loading-text');
    const loadingTip = document.getElementById('loading-tip');

    // Change tips every 1.5 seconds
    const tipInterval = setInterval(() => {
        tipIndex = (tipIndex + 1) % loadingTips.length;
        loadingTip.style.opacity = '0';
        setTimeout(() => {
            loadingTip.textContent = loadingTips[tipIndex];
            loadingTip.style.opacity = '1';
        }, 300);
    }, 1500);

    // Loading progress
    const loadInterval = setInterval(() => {
        // Random increment for realistic feel
        const increment = Math.random() * 8 + 2;
        loadProgress = Math.min(loadProgress + increment, 100);

        loadingBarFill.style.width = loadProgress + '%';
        loadingText.textContent = `Loading... ${Math.floor(loadProgress)}%`;

        if (loadProgress >= 100) {
            clearInterval(loadInterval);
            clearInterval(tipInterval);
            loadingText.textContent = 'Loading... 100%';

            // Transition to menu after a short delay
            setTimeout(() => {
                showScreen('menu-screen');
            }, 800);
        }
    }, 150);
}

// ============ SCREEN MANAGEMENT ============

function showScreen(screenId) {
    const currentScreen = document.querySelector('.screen.active');
    const nextScreen = document.getElementById(screenId);

    if (currentScreen) {
        currentScreen.classList.add('fade-out');
        setTimeout(() => {
            currentScreen.classList.remove('active', 'fade-out');
            nextScreen.classList.add('active', 'fade-in');
            setTimeout(() => {
                nextScreen.classList.remove('fade-in');
            }, 500);
        }, 500);
    } else {
        nextScreen.classList.add('active');
    }
}

// ============ GAME LAUNCHER ============

function launchGame(gameName) {
    // Add button press animation
    const cards = document.querySelectorAll('.game-card');
    cards.forEach(card => card.style.pointerEvents = 'none');

    switch (gameName) {
        case 'candy-crush':
            // For now, show alert. Later we'll navigate to game page
            showGameTransition('🍬', 'Candy Crush', '#ff6b6b', () => {
                window.location.href = 'games/candy-crush/candy.html';
            });
            break;
        case 'block-blast':
            showGameTransition('🧱', 'Block Blast', '#4d96ff', () => {
                window.location.href = 'games/block-blast/block.html';
            });
            break;
        case 'number-link':
            showGameTransition('🔢', 'Number Link', '#6bcb77', () => {
                window.location.href = 'games/number-link/number.html';
            });
            break;
    }
}

// ============ GAME TRANSITION EFFECT ============

function showGameTransition(icon, title, color, callback) {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${color};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.4s ease;
    `;

    overlay.innerHTML = `
        <div style="font-size: 5rem; animation: iconBounce 0.6s ease-in-out infinite;">${icon}</div>
        <h2 style="
            font-family: 'Fredoka One', cursive;
            color: white;
            font-size: 2rem;
            margin-top: 20px;
            letter-spacing: 3px;
            text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        ">${title}</h2>
        <p style="
            color: rgba(255,255,255,0.8);
            margin-top: 10px;
            font-size: 1rem;
        ">Loading game...</p>
        <div style="
            width: 60px;
            height: 60px;
            border: 4px solid rgba(255,255,255,0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            margin-top: 30px;
            animation: spin 1s linear infinite;
        "></div>
    `;

    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);

    document.body.appendChild(overlay);

    // Fade in
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
    });

    // Navigate after delay
    setTimeout(() => {
        if (callback) callback();
    }, 1500);
}

// ============ SETTINGS & SOUND ============

let soundEnabled = true;

function toggleSound() {
    soundEnabled = !soundEnabled;
    const soundIcon = document.getElementById('sound-icon');
    soundIcon.textContent = soundEnabled ? '🔊' : '🔇';

    // Save preference
    localStorage.setItem('jewelsBlast_sound', soundEnabled);
}

function showSettings() {
    alert('Settings coming soon! 🔧');
}

function showInfo() {
    alert('Jewels Blast v1.0\n\n🍬 Candy Crush - Match 3 puzzle\n🧱 Block Blast - Block puzzle\n🔢 Number Link - Number puzzle\n\nMade with ❤️');
}

// ============ LOCAL STORAGE - HIGH SCORES ============

function saveHighScore(game, score) {
    const key = `jewelsBlast_${game}_highScore`;
    const currentHigh = localStorage.getItem(key) || 0;
    if (score > currentHigh) {
        localStorage.setItem(key, score);
        return true; // New high score!
    }
    return false;
}

function getHighScore(game) {
    return localStorage.getItem(`jewelsBlast_${game}_highScore`) || 0;
}

// ============ INITIALIZE APP ============

function initApp() {
    // Load sound preference
    const savedSound = localStorage.getItem('jewelsBlast_sound');
    if (savedSound !== null) {
        soundEnabled = savedSound === 'true';
    }

    // Start loading
    startLoading();
}

// ============ START THE APP ============
document.addEventListener('DOMContentLoaded', initApp);
