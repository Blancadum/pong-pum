class Timer {
    constructor() {
        this.timeElapsed = 0;
        this.timerInterval = null;
    }

    start() {
        this.stop(); // Detenemos cualquier temporizador previo
        this.timerInterval = setInterval(() => {
            this.timeElapsed++;
            this.updateDisplay();
        }, 1000);
    }

    stop() {
        clearInterval(this.timerInterval);
    }

    reset() {
        this.stop();
        this.timeElapsed = 0;
        this.updateDisplay();
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeElapsed / 60).toString().padStart(2, '0');
        const seconds = (this.timeElapsed % 60).toString().padStart(2, '0');
        document.getElementById('timerDisplay').textContent = `Time: ${minutes}:${seconds}`;
    }
}

window.Timer = Timer;
