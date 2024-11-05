class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.level = 1;
        this.lives = 3; // Vidas iniciales del jugador
    }

    incrementScore() {
        this.score += 1;
        // Actualiza el marcador de puntuación en el DOM
        const scoreElement = document.getElementById('playerScore');
        if (scoreElement) {
            scoreElement.textContent = `Points: ${this.score}`;
        }
        
        if (this.score % 2 === 0) {
            this.incrementLevel();
        }
    }

    incrementLevel() {
        this.level += 1;
        // Actualiza el marcador de nivel en el DOM
        const levelElement = document.getElementById('playerLevelDisplay');
        if (levelElement) {
            levelElement.textContent = `Level: ${this.level}`;
        }
    }

    decrementLives() {
        this.lives -= 1;
        // Actualiza el marcador de vidas en el DOM
        const livesElement = document.getElementById('playerLives');
        if (livesElement) {
            livesElement.textContent = `Lives: ${this.lives}`;
        }
        return this.lives;
    }
}

window.Player = Player;