import React, { Component } from 'react';

import Header from '../Header/Header';
import Details from '../Details/Details';
import Roster from '../Roster/Roster';
import Navigation from '../Navigation/Navigation';

import './Home.css';

class Home extends Component {

  render () {
    const nextGame = this.props.nextGame;
    const players = this.props.players || [];

    return (
      <div className='Home'>
        <Navigation />
        <Header title={nextGame.type} />
        <div className='content-wrapper'>
          <div className='content'>
            <div className='next-game-details-wrapper'>
              <Details game={nextGame} />
              <div className='line-divider'></div>
              {/* <Roster metadata={this.props.metadata} players={players} handleRosterChange={this.props.handleRosterChange} /> */}
              {/* {players.length > 0 && */}
                <Roster metadata={this.props.metadata} players={players} handleRosterChange={this.props.handleRosterChange} />
              {/* } */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
