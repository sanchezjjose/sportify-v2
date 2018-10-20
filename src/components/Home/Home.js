import React, { Component } from 'react';

import Header from '../Header/Header';
import Details from '../Details/Details';
import Roster from '../Roster/Roster';
import Navigation from '../Navigation/Navigation';

import './Home.css';

class Home extends Component {

  state = {
    // Initial seed data
    gameIndex: this.props.nextGameIndex
  }

  styleArrows = () => {
    if (this.props.schedule.length-1 === this.state.gameIndex) {
      document.getElementById('next-game-nav').classList.add('md-dark','md-inactive');
      document.getElementById('prev-game-nav').classList.remove('md-dark', 'md-inactive');

    } else if (this.state.gameIndex === 0) {
      document.getElementById('prev-game-nav').classList.add('md-dark','md-inactive');
      document.getElementById('next-game-nav').classList.remove('md-dark', 'md-inactive');

    } else if (this.state.gameIndex > 0 && this.state.gameIndex < this.props.schedule.length) {
      document.getElementById('next-game-nav').classList.remove('md-dark', 'md-inactive');
      document.getElementById('prev-game-nav').classList.remove('md-dark', 'md-inactive');
    }
  }

  handleScheduleChange = (e, currentGameIndex) => {
    e.preventDefault();

    const target = e.target.id;
    const schedule = this.props.schedule;

    if (target === 'next-game-nav' && schedule[currentGameIndex + 1]) {
        this.setState({ gameIndex: currentGameIndex + 1 });

    } else if (target === 'prev-game-nav' && schedule[currentGameIndex - 1]) {
      this.setState({ gameIndex: currentGameIndex - 1 });
    }
  }

  componentDidMount() {
    this.styleArrows();
  }

  componentDidUpdate() {
    this.styleArrows();
  }

  render () {
    const schedule = this.props.schedule;
    const currentGameIndex = this.state.gameIndex;
    const game = currentGameIndex >= 0 ? schedule[currentGameIndex] : {};

    return (
      <div className='Home'>
        <Navigation />
          <Header title={game.type} />
          <div className='content-wrapper'>
            <i onClick={e => this.handleScheduleChange(e, currentGameIndex)} id='prev-game-nav' className='schedule-nav material-icons'>arrow_back_ios</i>
            <div className='content'>
              <div className='next-game-details-wrapper'>
                <Details game={game} />
                <div className='line-divider'></div>
                <Roster roster={game.roster} gameId={game.id} gameIndex={currentGameIndex} handleRosterChange={this.props.handleRosterChange} />
              </div>
            </div>
            <i onClick={e => this.handleScheduleChange(e, currentGameIndex)} id='next-game-nav' className='schedule-nav material-icons'>arrow_forward_ios</i>
          </div>
      </div>
    );
  }
}

export default Home;
