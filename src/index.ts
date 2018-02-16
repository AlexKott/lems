import Game from './Game';

window.addEventListener('load', () => {
  const canvasElement = <HTMLCanvasElement> document.querySelector('#canvas');
  const startButton = <HTMLButtonElement> document.querySelector('#start-button');
  const endButton =  <HTMLButtonElement> document.querySelector('#end-button');
  const game: Game = new Game(canvasElement);

  startButton.addEventListener('click', game.start.bind(game));
  endButton.addEventListener('click', game.end.bind(game));
});
