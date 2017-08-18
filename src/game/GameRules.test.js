import * as GameRules from './GameRules';
import GameState from './GameState';

describe('the GameRules', () => {
  it('can start a new game',() => {
    let gameState = new GameState();
    gameState.gameOver();
    gameState.retry();
    gameState = GameRules.newGame(gameState);
    expect(gameState.houseHand.cards.length).toEqual(1);
    expect(gameState.playerHands[0].cards.length).toEqual(2);
  });

  it('can add available player actions to the gamestate',() => {
    let gameState = new GameState();
    gameState.gameOver();
    gameState.retry();
    gameState = GameRules.newGame(gameState);
    const actionAddedState = GameRules.addPlayerActions(gameState);
    if(actionAddedState.playerHands[0].calcBlackJackScore() < 21){
      expect(actionAddedState.playerHands[0].availableActions.length).toEqual(2);
    } else {
      expect(actionAddedState.playerHands[0].availableActions.length).toEqual(0);
    }
  });

  it(`can apply the state's hand actions`, () => {
    let gameState = new GameState();
    gameState.gameOver();
    gameState.retry();
    gameState = GameRules.newGame(gameState);
    const actionAddedState = GameRules.addPlayerActions(gameState);
    if (actionAddedState.playerHands[0].calcBlackJackScore() < 21) {
      actionAddedState.playerHands[0].applyAction(0);
      const actionActedState =  GameRules.applyPlayerActions(actionAddedState);
      expect(actionAddedState.playerHands[0].cards.length).toEqual(3);
    }
  });

  it('makes the house hit until win or bust when all players are stuck or bust', () => {
    let gameState = new GameState();
    gameState.gameOver();
    gameState.retry();
    gameState = GameRules.newGame(gameState);
    const actionAddedState = GameRules.addPlayerActions(gameState);
    actionAddedState.playerHands[0].applyAction(1);
    const actionActedState = GameRules.applyPlayerActions(actionAddedState);
    const gameDoneState = GameRules.allPlayersStuckOrBust(actionAddedState);
    expect (gameDoneState)
  });

});