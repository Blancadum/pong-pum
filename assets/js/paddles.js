class Paddle {
    constructor(x, y, width, height, color = 'blue', speed = 15) { // Velocidad 
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    autoMove(ball, canvas) {
        const centerY = this.y + this.height / 2;
        const targetY = ball.y - this.height / 2; // Posición objetivo centrada en la pelota
        const smoothFactor = 0.1; // Cuanto más pequeño, más suave es el movimiento

        // Interpolar hacia la posición objetivo
        this.y += (targetY - this.y) * smoothFactor;

        // Limitar dentro de los bordes del canvas
        this.y = Math.max(0, Math.min(this.y, canvas.height - this.height));
    }
}

window.Paddle = Paddle;
