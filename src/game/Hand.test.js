import Hand from './Hand';
import Card from './Card';
import Rank from '../enums/Rank';
import Suit from '../enums/Suit';

describe('The Hand', () => {
  it('can accept cards', () => {
    const hand = new Hand();
    hand.addCard(new Card(Suit.clubs, Rank.king));
    expect(hand.cards).toEqual([new Card(Suit.clubs, Rank.king)]);
  });
  it('can accrue bets', () => {
    const hand = new Hand();
    hand.addBet(1);
    expect(hand.currentBet).toEqual(1);
  });
  it('can return cards', () => {
    const hand = new Hand();
    hand.addCard(new Card(Suit.clubs, Rank.king));
    expect(hand.returnCards()).toEqual([new Card(Suit.clubs, Rank.king)]);
  });
  it('knows which player it belongs to', () => {
    const hand = new Hand(1);
    expect(hand.player).toEqual(1);
  });
  it('has available actions', () => {
    const hand = new Hand();
    const testActionA = {dummy: 'action'};
    const testActionB = {dummyer: 'actionB'};
    hand.addAvailableAction(testActionA);
    hand.addAvailableAction(testActionB);
    expect(hand.availableActions).toEqual([testActionA,testActionB ]);
  });
  it('can calculate a correct blackjack score', () => {
    const hand = new Hand();
    hand.addCard(new Card(Suit.clubs, Rank.king));
    hand.addCard(new Card(Suit.clubs, Rank.ace));
    expect(hand.blackJackScore).toEqual(21);
  });
  it('dose not exhibit the double ace bust bug', () => {
    const hand = new Hand();
    hand.addCard(new Card(Suit.clubs, Rank.king));
    hand.addCard(new Card(Suit.clubs, Rank.ace));
    hand.addCard(new Card(Suit.hearts, Rank.ace));
    expect(hand.blackJackScore).toEqual(12);
  });
});