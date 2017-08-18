class Hand {
  constructor(playerId = 0) {
    this.playerId = playerId;
    this.stack = [];
    this.pot = 0;
    this.actionQue = null;
    this.availableActionsQue = [];
    this.stayFlag = false;
    this.winFlag = false;
  }

  get player() {
    return this.playerId;
  }

  get cards() {
    return this.stack;
  }

  get currentBet() {
    return this.pot;
  }

  get action() {
    return this.actionQue;
  }

  get availableActions() {
    return this.availableActionsQue;
  }

  get blackJackScore() {
    return this.calcBlackJackScore();
  }

  get stuck() {
    return this.stayFlag;
  }

  get win() {
    return this.winFlag;
  }

  winner() {
    this.winFlag = true;
  }

  stay() {
    this.stayFlag = true;
  }

  calcBlackJackScore() {
    const lastCard = this.stack.length - 1;
    return this.stack
      .sort((a,b) => a.blackJackAccumulator(0,true) > b.blackJackAccumulator(0, true))
      .reduce((acc,card,idx) => card.blackJackAccumulator(acc, idx === lastCard),0);
  }

  returnCards() {
    const tmp = this.stack;
    this.stack = [];
    this.winFlag = false;
    return tmp;
  }

  applyAction(index) {
    this.actionQue = this.availableActions[index];
    this.availableActionsQue = [];
  }

  clearAction() {
    this.actionQue = null;
    this.availableActionsQue = [];
  }

  addAvailableAction(action) {
    this.availableActions.push(action);
    return this;
  }

  addBet(amount) {
    this.pot += amount;
    return this;
  }

  addCard(card) {
    this.stack.push(card);
    return this;
  }

}

export default Hand;