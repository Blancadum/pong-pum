document.addEventListener('DOMContentLoaded', () => {
    const nameModal = document.getElementById('nameModal');
    const saveNameButton = document.getElementById('saveNameButton');
    const playerNameInput = document.getElementById('playerNameInput');
    const playButton = document.getElementById('click');
    const startButton = document.getElementById('startButton');
    const continueButton = document.getElementById('continueButton');
    let game;

    playButton.addEventListener('click', () => {
        document.getElementById('coverScreen').classList.add('hidden');
        document.getElementById('playWindow').classList.remove('hidden');
        nameModal.classList.remove('hidden');
    });

    saveNameButton.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        if (playerName) {
            localStorage.setItem('playerName', playerName);
            document.getElementById('gameName').textContent = playerName;
            nameModal.classList.add('hidden'); 
            startButton.classList.remove('hidden');
            game = new Game(playerName);
        } else {
            alert("Por favor, ingresa un nombre para comenzar.");
        }
    });

    startButton.addEventListener('click', () => {
        if (game) {
            startButton.classList.add('hidden');
            game.start();
        }
    });

    continueButton.addEventListener('click', () => {
        if (game) {
            game.resumeGame();
        }
    });

    document.getElementById('restartButton').addEventListener('click', () => {
        location.reload();
    });

    // Listener para mover la paleta derecha con las flechas
    document.addEventListener('keydown', (event) => {
        if (game && game.isGameActive) {
            if (event.key === 'ArrowUp') {
                game.rightPaddle.y = Math.max(game.rightPaddle.y - 10, 0);
            } else if (event.key === 'ArrowDown') {
                game.rightPaddle.y = Math.min(game.rightPaddle.y + 10, game.canvas.height - game.rightPaddle.height);
            }
        }
    });
});
