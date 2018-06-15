import React, { Component } from 'react';
import homeNavIcon from './home-nav-icon.svg';
import scheduleNavIcon from './schedule-nav-icon.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      players: require('./data/players.json'),
      schedule: require('./data/schedule.json')
    };
  }

  componentDidMount() {
    console.log('componentDidMount() called.');
  }

  render() {
    return (
      <div className='App'> 
        <NavComponent />
        <HeaderComponent title='Pickup Game' />
        <div className='container'>
          <DetailsComponent schedule={this.state.schedule[0]} />
          <div className='line-divider'></div>
          <RosterComponent players={this.state.players} />
        </div>
      </div>
    );
  }
}

const NavComponent = () => {
	return (
		<nav className='App-navigation'>
      <div className='App-logo'>sportify</div>
      <div className='nav-items'>
        <button className='nav-home'>
          <img src={homeNavIcon} className="tab-icon" alt="home" />
          <span className='nav-text'> home </span>
        </button>
        <button className='nav-schedule'>
          <img src={scheduleNavIcon} className="tab-icon" alt="schedule" />
          <span className='nav-text'> schedule </span>
        </button>
      </div>
    </nav>
	);
}

const HeaderComponent = ({ title }) => {
	return (
		<header className='App-header'>
      <div className='header-title'>
        {title}
      </div>
    </header>
	);
}

const DetailsComponent = ({ schedule }) => {
	return (
		<div className='content'>
	    <div className='game-date'>{schedule.date}</div>
	    <div className='game-location-name'>{schedule.location}</div>
	    <div className='game-location-address'>{schedule.address}</div>

	    <RsvpComponent textValue='IN' />
	    <RsvpComponent textValue='OUT' />
	  </div>
  )
}

const RsvpComponent = ({ textValue }) => {
	return (
		<button className='rsvp-button'>{textValue}</button>
	);
}

const RosterComponent = ({ players }) => {
	return (
		<div className='roster'>
      <div className='roster-title'>Roster</div>
      <div className='roster-subtitle'>{players.rsvpYes.length} player(s) confirmed</div>
      
      {players.rsvpYes.map (name => {
        return <div key={name} className='roster-rsvp-in'>{name}</div>;
      })}
    </div>
	);
}

export default App;
