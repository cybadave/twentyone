import Deck from './Deck';

class DealerStack {
  constructor(options) {
    const defaultOptions = {
      decks: 1
    };
    this.options = Object.assign([], defaultOptions, options);
    this.stack = [];
    for (let i = 0; i < this.options.decks; i++) {
      this.stack = this.stack.concat(new Deck().cards);
    }
  }

  get cards() {
    return this.stack;
  }

  shuffle() {
    let counter = this.stack.length;
    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = this.stack[counter];
      this.stack[counter] = this.stack[index];
      this.stack[index] = temp;
    }
    return this;
  }

  returnCard(card) {
    this.stack.unshift(card);
    return this;
  }

  deal = () => this.stack.pop();
}

export default DealerStack;