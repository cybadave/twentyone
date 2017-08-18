import GameState from './GameState'

describe('The GameState', () => {
  const gameState = new GameState();
  it('has player hands', () => {
    expect(gameState.playerHands).toBeTruthy();
  });
  it('has a dealer hand', () => {
    expect(gameState.houseHand).toBeTruthy();
  });
  it('can add players', () => {
    gameState.addPlayer(1);
    expect(gameState.playerHands[0].player).toEqual(1);
  });
});