import Card from './Card';
import Rank from '../enums/Rank';
import Suit from '../enums/Suit';

class Deck {
  constructor(){
    this.stack = [];
    Object.keys(Suit).forEach(suit =>
      Object.keys(Rank).forEach(rank =>
        this.stack.push(new Card(Suit[suit], Rank[rank]))));
  }

  get cards() {
    return this.stack;
  }
}

export default Deck;