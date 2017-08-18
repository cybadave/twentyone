import Card from './Card';
import Rank from '../enums/Rank';
import Suit from '../enums/Suit';

it('returns the correct color', () => {
  const redCard = new Card(Suit.hearts, Rank.queen);
  const blackCard = new Card(Suit.spades, Rank.ace);
  expect(blackCard.color).toEqual('#000000');
  expect(redCard.color).toEqual('#FF0000');
});

it(`knows it's blackjack value`, () => {
  const redCard = new Card(Suit.hearts, Rank.queen);
  const blackCard = new Card(Suit.spades, Rank.ace);
  const blackCardScore = blackCard.blackJackAccumulator(0,true);
  const redCardScore = redCard.blackJackAccumulator(blackCardScore);
  expect(blackCardScore).toEqual(11);
  expect(redCardScore).toEqual(21);
});