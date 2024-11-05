// Clase SoundManager para controlar la música y los efectos de sonido
class SoundManager {
    constructor() {
        // Música de fondo
        this.backgroundMusic = new Audio('../sounds/music.mp3');
        this.backgroundMusic.loop = true; // Configura la música para que se reproduzca en bucle

        // Efectos de sonido
        this.leftPaddleHitSound = new Audio('../sounds/assets/sounds/ping.mp3'); // Sonido específico para el paddle izquierdo
        this.rightPaddleHitSound = new Audio('../sounds/assets/sounds/pong.mp3'); // Sonido específico para el paddle derecho
        this.wallHitSound = new Audio('../sounds/music.mp3');
        this.lifeLostSound = new Audio('../sounds/play.mp3');

        // Volumen de la música y efectos de sonido (puedes ajustar estos valores)
        this.backgroundMusic.volume = 0.3;
        this.leftPaddleHitSound.volume = 0.8;
        this.rightPaddleHitSound.volume = 0.8;
        this.wallHitSound.volume = 0.3;
        this.lifeLostSound.volume = 0.3;
    }

    // Métodos para reproducir y pausar la música de fondo
    playBackgroundMusic() {
        this.backgroundMusic.play();
    }

    stopBackgroundMusic() {
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0; // Reinicia la música
    }

    // Métodos para reproducir efectos de sonido específicos
    playLeftPaddleHit() {
        this.leftPaddleHitSound.currentTime = 0;
        this.leftPaddleHitSound.play();
    }

    playRightPaddleHit() {
        this.rightPaddleHitSound.currentTime = 0;
        this.rightPaddleHitSound.play();
    }

    playWallHit() {
        this.wallHitSound.currentTime = 0;
        this.wallHitSound.play();
    }

    playLifeLost() {
        this.lifeLostSound.currentTime = 0;
        this.lifeLostSound.play();
    }
}

// Hacer que SoundManager esté disponible globalmente
window.SoundManager = SoundManager;
