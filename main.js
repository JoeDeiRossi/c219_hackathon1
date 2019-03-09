$(document).ready( startGame );

var game = null;
function startGame(){
  game = new Game();
  game.startGame();
}
