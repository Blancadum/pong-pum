class Ball {
    constructor(x, y, canvasWidth, canvasHeight) {
        this.radius = canvasWidth * 0.01;
        this.x = x;
        this.y = y;
        this.speedX = canvasWidth * 0.005; // Velocidad horizontal
        this.speedY = canvasHeight * 0.005; // Velocidad vertical
        this.isPaused = true;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#FF3399';
        ctx.fill();
        ctx.closePath();
    }

    resume() {
        this.isPaused = false;
    }

    updatePosition(canvas, leftPaddle, rightPaddle, onLifeLost) {
        if (this.isPaused) return;

        this.x += this.speedX;
        this.y += this.speedY;

        this.checkCollisions(canvas, leftPaddle, rightPaddle, onLifeLost);
    }

    checkCollisions(canvas, leftPaddle, rightPaddle, onLifeLost) {
        // Colisión con los bordes superior e inferior
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.speedY = -this.speedY; // Rebote vertical
        }

        // Colisión con el paddle derecho
        if (this.x + this.radius >= rightPaddle.x &&
            this.y >= rightPaddle.y && this.y <= rightPaddle.y + rightPaddle.height) {
            this.speedX = -this.speedX; // Rebote horizontal
            this.x = rightPaddle.x - this.radius; // Ajuste de posición
        }

        // Colisión con el paddle izquierdo
        if (this.x - this.radius <= leftPaddle.x + leftPaddle.width &&
            this.y >= leftPaddle.y && this.y <= leftPaddle.y + leftPaddle.height) {
            this.speedX = -this.speedX; // Rebote horizontal
            this.x = leftPaddle.x + leftPaddle.width + this.radius; // Ajuste de posición
        }

        // Si la bola se sale por el lado derecho
        if (this.x - this.radius > canvas.width) {
            onLifeLost(); // Llamada a la función de vida perdida
        }
    }
}

window.Ball = Ball;