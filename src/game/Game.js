import gameRules from './GameRules';
import GameState from './GameState';

class Game {
  constructor(updateCallBack){

  }

  get state() {
    return this.gameState;
  }

  gameLoop() {
    self.gameState = gameRules.reduce((acc,rule) => rule(acc),this.gameState);
    console.log('this.update',self.update);
    self.update();
  }

  start() {
    this.interval = setInterval(this.gameLoop, 2000);
  }

  stop() {
    clearInterval(this.interval);
  }
}


export default Game;