import Deck from './Deck';
import Rank from '../enums/Rank';
import Suit from '../enums/Suit';

describe('The Deck', () => {
  it('has all the cards ', () => {
    const deck = new Deck();
    Object.keys(Rank).forEach( rank =>
      Object.keys(Suit).forEach(suit =>
        expect(deck.cards.find(card => card.suit === Suit[suit] && card.rank === Rank[rank])).toBeDefined()));
  });
});