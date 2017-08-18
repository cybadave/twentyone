import Hand from './Hand';
import DealerStack from "./DealerStack";

class GameState {
  constructor(){
    this.players = [];
    this.house = new Hand();
    this.stack = new DealerStack();
    this.game = true;
    this.replay = false;
    this.playCount = 0;
  }

  get dealerStack() {
    return this.stack;
  }

  get actionQue() {
    return this.actions;
  }

  get playerHands() {
    return this.players;
  }

  get houseHand() {
    return this.house;
  }

  get gameActive() {
    return this.game;
  }

  get tryAgain() {
    return this.replay;
  }

  get plays() {
    return this.playCount;
  }

  retry() {
    this.replay = true;
  }

  gameOver() {
    this.game = false;
    this.replay = false;
    this.playCount++;
  }

  resetPlayers() {
    this.players = [];
    this.replay = false;
  }

  addPlayer(playerId) {
    this.players.push(new Hand(playerId));
  }
}

export default GameState;