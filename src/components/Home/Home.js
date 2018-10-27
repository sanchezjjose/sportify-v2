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

  touchStartX = 0;
  touchEndX = 0;

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

  handleScheduleChange = (e, prevGame, nextGame) => {
    const schedule = this.props.schedule;
    const currentGameIndex = this.state.gameIndex;

    if (nextGame && schedule[currentGameIndex + 1]) {
        this.setState({ gameIndex: currentGameIndex + 1 });

    } else if (prevGame && schedule[currentGameIndex - 1]) {
      this.setState({ gameIndex: currentGameIndex - 1 });
    }
  }

  componentDidMount() {
    this.styleArrows();
  }

  componentDidUpdate() {
    this.styleArrows();
  }

  handleTouchStart = (e) => {
    this.touchStartX = e.changedTouches[0].clientX;
    this.touchStartY = e.changedTouches[0].clientY;
  }

  handleTouchEnd = (e) => {
    if (this.touchStartX === null || this.touchStartY === null) {
      return;
    }

    const currentX = e.changedTouches[0].clientX;
    const currentY = e.changedTouches[0].clientY;

    const diffX = this.touchStartX - currentX;
    const diffY = this.touchStartY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        this.handleScheduleChange(e, false, true);

      } else {
        this.handleScheduleChange(e, true, false);
      }
    }
  }

  handleTouchMove = (e) => {
    // Code here to handle transition between cards
  }

  render () {
    const schedule = this.props.schedule;
    const currentGameIndex = this.state.gameIndex;
    const game = currentGameIndex >= 0 ? schedule[currentGameIndex] : {};

    return (
      <div className='Home'>
        <Navigation />
        <Header title={game.type} />
        <div className='content-wrapper' onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd} >
          <div className='content'>
            <div className='next-game-details-wrapper'>
              <i onClick={e => this.handleScheduleChange(e, true, false)} id='prev-game-nav' className='schedule-nav material-icons'>arrow_back_ios</i>
              <Details game={game} />
              <i onClick={e => this.handleScheduleChange(e, false, true)} id='next-game-nav' className='schedule-nav material-icons'>arrow_forward_ios</i>
            </div>
            <div className='line-divider'></div>
            <Roster roster={game.roster} gameId={game.id} gameIndex={currentGameIndex} handleRosterChange={this.props.handleRosterChange} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
