import React, { Component } from 'react';

import Header from '../Header/Header';
import Details from '../Details/Details';
import Roster from '../Roster/Roster';
import Navigation from '../Navigation/Navigation';

import './Home.css';

class Home extends Component {

  constructor(props) {
    super(props);

    this.nextGame = this.nextGame.bind(this);
  }

  nextGame = () => {
    const compare = (a, b) => {
      if (new Date(a.date) < new Date(b.date)) return -1;
      if (new Date(a.date) > new Date(b.date)) return 1;
      return 0;
    }

    return this.props.schedule.sort(compare)[0] || {};
  };

  render () {
    const nextGame = this.nextGame();
    const players = nextGame.players || [];

    return (
      <div className='Home'>
        <Navigation />
        <Header title={nextGame.type} />
        <div className='content-wrapper'>
          <div className='content'>
            <div className='next-game-details-wrapper'>
              <Details key={nextGame.date} game={nextGame} />
              <div className='line-divider'></div>
              {players.length > 0 &&
                <Roster players={players} />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
