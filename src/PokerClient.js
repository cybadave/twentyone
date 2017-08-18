import React, { Component } from 'react';
import ClientCard from './ClientCard';
import * as GameRules from './game/GameRules';
import GameState from './game/GameState';
import './PokerClient.css';


class PokerClient extends Component {
  constructor() {
    super();
    this.gameState = new GameState();
    this.gameState.gameOver();
    this.gameState.retry();
    this.interval = null;
    this.state = {
      dealer: [],
      hand: [],
      actions: [],
      applyAction: () => {},
    }
  }
  componentDidMount = () => {
    this.update();
  };
  update = () => {
    GameRules.rules.forEach(rule => this.gameState = rule(this.gameState));
    this.setState({
      dealer: this.gameState.houseHand.stack,
      hand: this.gameState.playerHands[0].stack,
      actions: this.gameState.playerHands[0].availableActions,
      dealerWin: this.gameState.houseHand.win,
      handWin: this.gameState.playerHands[0].win,
      plays: this.gameState.plays,
    });
  };
  applyAction = (idx) => {
    this.gameState.playerHands[0].applyAction(idx);
    this.update();
  };
  render() {
    const {
      dealer,
      hand,
      actions,
      dealerWin,
      handWin,
      plays,
    } = this.state;
    const dealerTranslate = '50%, -63%';
    const playerTranslate = '60%, 63%';
    return (
      <div className="Poker-client" >
        <ClientCard
          translate={''}
          key="dummy"
          rank=""
          suit=""
          color=""
        />
        {dealer.map((card, idx) => <ClientCard
          winner={dealerWin}
          fresh={true}
          index={idx}
          translate={dealerTranslate}
          key={card.rank + card.suit + plays}
          rank={card.rank}
          suit={card.suit}
          color={card.color}
        />)}
        {hand.map((card, idx) => <ClientCard
          winner={handWin}
          fresh={true}
          index={idx}
          translate={playerTranslate}
          key={card.rank + card.suit + plays}
          rank={card.rank}
          suit={card.suit}
          color={card.color}
        />)}
        {actions.map((action,idx) => <button key={action + plays} onClick={() => this.applyAction(idx)}>{action}</button>)}
      </div>
    )
  }
}

export default PokerClient;