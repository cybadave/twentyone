import Suit from '../enums/Suit';
import Scores from '../enums/Scores'
class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this.blackJackValues = Scores;
  }
  get color() {
    return this.calcColor();
  }
  blackJackAccumulator(runningTotal, lastflag = false) {
    if (this.blackJackValues[this.rank].score === 0) {
      //we got an ace here
      if ((runningTotal + 11 > 21)|| !lastflag) {
        return runningTotal + 1;
      }else{
        return runningTotal + 11;
      }
    }
    return runningTotal + this.blackJackValues[this.rank].score
  }
  calcColor() {
    const redSuits = [Suit.hearts, Suit.diamonds];
    return redSuits.includes(this.suit) ? '#FF0000' : '#000000';
  }
}

export default Card;