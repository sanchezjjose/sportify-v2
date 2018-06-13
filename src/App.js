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

  render() {
    return (
      <div className='App'>
        
        {/* NavComponent */}
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
        
        {/* HeaderComponent */}
        <header className='App-header'>
          <div className='header-title'>
            Pickup Game
          </div>
        </header>

        <div className='container'>

          {/* DetailsComponent */}
          <div className='content'>
            <div className='game-date'>{this.state.schedule[0].date}</div>
            <div className='game-location-name'>{this.state.schedule[0].location}</div>
            <div className='game-location-address'>{this.state.schedule[0].address}</div>
            <button className='rsvp-button'>IN</button>
            <button className='rsvp-button'>OUT</button>
          </div>

          {/* RsvpComponent */}

          <div className='line-divider'></div>

          {/* RosterComponent */}
          <div className='roster'>
            <div className='roster-title'>Roster</div>
            <div className='roster-subtitle'>{this.state.players.rsvpYes.length} player(s) confirmed</div>
            
            {this.state.players.rsvpYes.map (name => {
              return <div key={name} className='roster-rsvp-in'>{name}</div>;
            })}
          </div>

        </div>

      </div>
    );
  }
}

export default App;
