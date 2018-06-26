import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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
    	<Router>
	      <div className='App'> 
	        <NavComponent />
	        <Route exact={true} path='/' render={() => (
	        	<HomeComponent schedule={this.state.schedule} players={this.state.players} />
	        )}/>
	        <Route exact={true} path='/schedule' render={() => (
	        	<ScheduleComponent schedule={this.state.schedule} />
	        )}/>
	      </div>
	    </Router>
    );
  }
}

// TODO: Move below to separate files

const HomeComponent = ({ schedule, players }) => {
	return (
		<div className='container'>
			<HeaderComponent title='Pickup Game' />
	  	<div className='content'>
	      <DetailsComponent schedule={schedule[0]} />
	      <div className='line-divider'></div>
	      <RosterComponent players={players} />
	    </div>
	  </div>
	);
}

const ScheduleComponent = ({ schedule }) => {
	return (
		<div className='container'>
			<HeaderComponent title='Schedule' />
	    <div className='content'>
        {schedule.map(game => {
          return (
            <div key={game.date} className='Schedule'>
              <div className='game-details'>
                <div className='game-date'>{game.date}</div>
                <div className='game-location-name'>{game.location}</div>
                <div className='game-location-address'>{game.address}</div>
              </div>
              <div className='line-divider'></div>
            </div>
          );
        })}
	    </div>
    </div>
	);
}

const NavComponent = () => {
	return (
		<nav className='App-navigation'>
      <div className='App-logo'>sportify</div>
      <div className='nav-items'>
        <button className='nav-home'>
        	<Link to={'/'}>
	          <img src={homeNavIcon} className="tab-icon" alt="home" />
	          <span className='nav-text'> home </span>
	        </Link>
        </button>
        <button className='nav-schedule'>
        	<Link to={'/schedule'}>
	          <img src={scheduleNavIcon} className="tab-icon" alt="schedule" />
	          <span className='nav-text'> schedule </span>
	        </Link>
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
		<div className='Details'>
	    <div className='game-date'>{schedule.date}</div>
	    <div className='game-location-name'>{schedule.location}</div>
	    <div className='game-location-address'>{schedule.address}</div>
	    {/* <RsvpComponent textValue='IN' />
	    <RsvpComponent textValue='OUT' /> */}
	  </div>
  )
}

const RsvpComponent = ({ textValue }) => {
	return (
		<button className='rsvp-button'>{textValue}</button>
	);
}

class RosterComponent extends Component {

  constructor(props) {
    super(props);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
  }

  handleOnKeyDown(e) {
    // e.preventDefault();
    if (e.keyCode === 13) {
      console.log(`${e.keyCode} key code pressed`);
    }
  }

  render() {
    return (
      <div className='Roster'>
        <div className='roster-title'>Roster</div>
        <div className='roster-subtitle'>{this.props.players.rsvpYes.length} player(s) confirmed</div>
        <div className='rsvp-form'>
          <input onKeyDown={this.handleOnKeyDown} placeholder='Enter Your Name To Play' type='text' />
        </div>
        {this.props.players.rsvpYes.map (name => {
          return <div key={name} className='roster-rsvp-in'>{name}</div>;
        })}
      </div>
    );
  }
}

export default App;
