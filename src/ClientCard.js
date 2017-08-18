import React, { Component } from 'react';

import cardback from './cardback.png'
import './ClientCard.css';

class ClientCard extends Component {
  constructor() {
    super();
    this.transform = '';
    this.state = {};
  }
  componentDidMount() {
    const {
      translate,
      index,
    } = this.props;
    setTimeout(() => {
      if (this.card) this.card.style.transform = `translate(${translate})  rotateY(180deg) rotateZ(${7 - (7 * index)}deg)`;
    }, 200);
  }
  shouldComponentUpdate(nextProps) {
    return true;
  }
  componentWillUnmount = () => {
    delete this.card;
  };
  render() {
    const {
      rank,
      suit,
      color,
      fresh,
      winner,
      index,
    } = this.props;
    const style = { color, transform: this.transform, zIndex: index };
    return (
      <div ref={div =>  this.card = div} className={`Card${fresh ? ' Fresh' : ''}${winner ? ' Winner' : ''}`} style={style}>
        <div className="Card-back">
          <img src={cardback}  alt="card-back" />
        </div>
        <div className="Card-front">
          <div className="Card-print-area">
            <div className="Rank-suit">
              <div className="Tag-left">{rank}<br/>{suit}</div>
              <div className="Tag-right">{rank}<br/>{suit}</div>
            </div>
            <div className="Rank-suit-bottom">
              <div className="Tag-left">{rank}<br/>{suit}</div>
              <div className="Tag-right">{rank}<br/>{suit}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ClientCard;