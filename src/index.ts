import Game from './Game';

const game: Game = new Game();

window.addEventListener('load', () => {
  const startButton : HTMLElement | null = document.querySelector('#start-button');
  const endButton : HTMLElement | null = document.querySelector('#end-button');
  if (startButton && endButton) {
    startButton.addEventListener('click', startGame);
    endButton.addEventListener('click', endGame);
  }
});

function startGame() {
  game.start();
}

function endGame() {
  game.end();
}
