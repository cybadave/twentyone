import GameState from "./GameState";
import Actions from '../enums/Actions';

export const newGame = (gameState) => {

  if (typeof gameState === 'undefined'){
    gameState = new GameState();
    gameState.gameOver();
    gameState.retry();
    gameState.resetPlayers();
  }

  if(!gameState.gameActive && gameState.tryAgain) {
    gameState.playerHands.forEach(hand =>
      hand.returnCards().forEach(card =>
        gameState.dealerStack.returnCard(card)));
    gameState.houseHand.returnCards().forEach(card =>
      gameState.dealerStack.returnCard(card));
    gameState.dealerStack.shuffle();
    gameState.resetPlayers();
    gameState.addPlayer(1);
    gameState.houseHand.addCard(gameState.dealerStack.deal());
    gameState.playerHands.forEach(hand => hand.addCard(gameState.dealerStack.deal()));
    gameState.playerHands.forEach(hand => hand.addCard(gameState.dealerStack.deal()));
  }
  return gameState;
};

export const applyPlayerActions = (gameState) => {
  gameState.playerHands.forEach(hand => {
    if(hand.action === Actions.hit){
      hand.addCard(gameState.dealerStack.deal());
      hand.clearAction();
    }
    if(hand.action === Actions.stick){
      hand.stay();
      hand.clearAction();
    }
    if(hand.action === Actions.playAgain){
      gameState.retry();
      hand.clearAction();
    }
  });
  return gameState;
};

export const addPlayerActions = (gameState) => {
  gameState.playerHands.forEach(hand => {
    if(hand.calcBlackJackScore() < 21 && !hand.stuck){
      hand.addAvailableAction(Actions.hit);
      hand.addAvailableAction(Actions.stick);
    }
  });
  return gameState;
};

export const allPlayersStuckOrBust = (gameState) => {
  const playersStuckOrBust = gameState.playerHands.reduce((acc,hand) => (hand.stuck || hand.calcBlackJackScore() >= 21), false);
  const playerScores = gameState.playerHands.map(hand => hand.calcBlackJackScore()).filter(h => h < 22);
  const maxPlayerScore = Math.max(playerScores);
  const playerWin = () => gameState.playerHands[0].winner();
  const dealerWin = () => gameState.houseHand.winner();
  if (playersStuckOrBust) {
    const targetStore = ((maxPlayerScore + 1) < 21) ? (maxPlayerScore + 1) : 21;
    while(gameState.houseHand.calcBlackJackScore() < targetStore){
      gameState.houseHand.addCard(gameState.dealerStack.deal());
    }
    gameState.gameOver();
    gameState.playerHands.forEach(hand => {
      hand.addAvailableAction(Actions.playAgain);
    });
    if (maxPlayerScore > 21) {
      dealerWin();
    } else {
      if (maxPlayerScore >= gameState.houseHand.calcBlackJackScore() || gameState.houseHand.calcBlackJackScore() > 21) {
        playerWin();
      }
      if (maxPlayerScore <= gameState.houseHand.calcBlackJackScore() && gameState.houseHand.calcBlackJackScore() <= 21) {
        dealerWin();
      }
    }
  }
  return gameState;
};

export const rules = [applyPlayerActions, newGame, addPlayerActions, allPlayersStuckOrBust];