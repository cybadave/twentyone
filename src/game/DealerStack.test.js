import DealerStack from './DealerStack';
import Rank from '../enums/Rank';
import Suit from '../enums/Suit';


describe('The Dealer Stack', () => {
  it('has all cards from all decks', () => {
    const stack = new DealerStack({decks: 3});
    Object.keys(Rank).forEach(rank =>
      Object.keys(Suit).forEach(suit =>
        expect(stack.cards.filter(card => card.suit === Suit[suit] && card.rank === Rank[rank]).length)
          .toEqual(3)
      )
    );
  });

  it('can deal a card',  () => {
    const stack = new DealerStack();
    const card = stack.deal();
    expect(stack.cards.length).toEqual(51);
  });

  it('can have cards returned', () => {
    const stack = new DealerStack();
    const card = stack.deal();
    stack.returnCard(card);
    expect(stack.cards.length).toEqual(52);
  });

  it('can shuffle', () => {
    const stack = new DealerStack();
    const firstCards = [];
    const secondCards = [];
    firstCards.push(stack.shuffle().deal());
    firstCards.push(stack.deal());
    firstCards.push(stack.deal());
    firstCards.forEach(card => stack.returnCard(card));
    secondCards.push(stack.shuffle().deal());
    secondCards.push(stack.deal());
    secondCards.push(stack.deal());
    expect(firstCards).not.toEqual(secondCards);
  });
});