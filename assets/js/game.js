class Game {
    constructor(playerName) {
        this.player = new Player(playerName);
        this.timer = new Timer();
        this.canvas = document.getElementById('pongCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.isGameActive = false;

        this.ball = new Ball(this.canvas.width / 2, this.canvas.height / 2, this.canvas.width, this.canvas.height);

        // Instancias de Paddle con velocidad ajustable
        this.leftPaddle = new Paddle(10, this.canvas.height / 2 - 30, 10, 60, 'red', 6); // Cambia 6 por la velocidad deseada
        this.rightPaddle = new Paddle(this.canvas.width - 20, this.canvas.height / 2 - 30, 10, 60, 'blue', 14); // Cambia 6 por la velocidad deseada

        this.lastTouchByPlayer = false;
        this.drawInitialState();
    }

    drawInitialState() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawCenterLine();
        this.ball.draw(this.ctx);
        this.leftPaddle.draw(this.ctx);
        this.rightPaddle.draw(this.ctx);
    }

    start() {
        this.isGameActive = true;
        this.ball.resume();
        this.timer.start();
        this.gameLoop();
    }

    gameLoop() {
        if (!this.isGameActive) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawCenterLine();

        this.leftPaddle.autoMove(this.ball, this.canvas);
        this.ball.updatePosition(this.canvas, this.leftPaddle, this.rightPaddle, this.handleLifeLost.bind(this));

        this.checkPaddleCollision();

        this.ball.draw(this.ctx);
        this.leftPaddle.draw(this.ctx);
        this.rightPaddle.draw(this.ctx);

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    drawCenterLine() {
        this.ctx.beginPath();
        this.ctx.setLineDash([10, 10]);
        this.ctx.moveTo(this.canvas.width / 2, 0);
        this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
        this.ctx.strokeStyle = 'grey';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        this.ctx.setLineDash([]);
    }

    checkPaddleCollision() {
        if (this.ball.x + this.ball.radius >= this.rightPaddle.x &&
            this.ball.y >= this.rightPaddle.y && this.ball.y <= this.rightPaddle.y + this.rightPaddle.height) {
            
            this.ball.speedX = -Math.abs(this.ball.speedX);
            this.ball.x = this.rightPaddle.x - this.ball.radius;
            this.lastTouchByPlayer = true;
            this.player.incrementScore(); // Incrementa la puntuación al golpear la paleta
        }

        if (this.ball.x - this.ball.radius <= this.leftPaddle.x + this.leftPaddle.width &&
            this.ball.y >= this.leftPaddle.y && this.ball.y <= this.leftPaddle.y + this.leftPaddle.height) {
            
            this.ball.speedX = Math.abs(this.ball.speedX);
            this.ball.x = this.leftPaddle.x + this.leftPaddle.width + this.ball.radius;
            this.lastTouchByPlayer = false;
        }
    }

    handleLifeLost() {
        const remainingLives = this.player.decrementLives();
        if (remainingLives <= 0) {
            this.endGame();
        } else {
            this.isGameActive = false;
            this.ball.x = this.canvas.width / 2;
            this.ball.y = this.canvas.height / 2;

            const continueButton = document.getElementById('continueButton');
            if (continueButton) {
                continueButton.classList.remove('hidden');
            }
        }
    }

    resumeGame() {
        const continueButton = document.getElementById('continueButton');
        if (continueButton) {
            continueButton.classList.add('hidden');
        }
        this.isGameActive = true;
        this.gameLoop();
    }

    endGame() {
        this.isGameActive = false;
        this.timer.stop();
        document.getElementById('gameOverModal').classList.remove('hidden');
    }
}

window.Game = Game;
