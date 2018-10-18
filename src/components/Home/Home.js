import React, { Component } from 'react';

import Header from '../Header/Header';
import Details from '../Details/Details';
import Roster from '../Roster/Roster';
import Navigation from '../Navigation/Navigation';

import './Home.css';

class Home extends Component {
  render () {
    return (
      <div className='Home'>
        <Navigation />
        <Header title={this.props.nextGame.type} />
        <div className='content-wrapper'>
          <div className='prev-game-arrow nav-arrow'> <i className='material-icons md-dark md-inactive'>arrow_back_ios</i> </div>
          <div className='content'>
            <div className='next-game-details-wrapper'>
              <Details game={this.props.nextGame} />
              <div className='line-divider'></div>
              <Roster roster={this.props.nextGame.roster} handleRosterChange={this.props.handleRosterChange} />
            </div>
          </div>
          <div className='next-game-arrow nav-arrow'> <i className='material-icons'>arrow_forward_ios</i> </div>
        </div>
      </div>
    );
  }
}

export default Home;
