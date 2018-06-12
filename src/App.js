import React, { Component } from 'react';
import homeNavIcon from './home-nav-icon.svg';
import scheduleNavIcon from './schedule-nav-icon.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        
        {/* NavComponent */}
        <nav className='App-navigation'>
          <div className='App-logo'>sportify</div>
          <div className='nav-items'>
            <button className='nav-home'>
              <img src={homeNavIcon} className="tab-icon" alt="logo" />
              <span className='nav-text'> home </span>
            </button>
            <button className='nav-schedule'>
              <img src={scheduleNavIcon} className="tab-icon" alt="logo" />
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
            <div className='game-date'>July 25th, 8:15 p.m.</div>
            <div className='game-location-name'>Murry Bergtraum High School</div>
            <div className='game-location-address'>411 Pearl St, New York, NY 10038</div>
            <button className='rsvp-button'>IN</button>
            <button className='rsvp-button'>OUT</button>
          </div>

          {/* RsvpComponent */}

          <div className='line-divider'></div>

          {/* RosterComponent */}
          <div className='roster'>
            <div className='roster-title'>Roster</div>
            <div className='roster-subtitle'>9 player(s) confirmed</div>

        	{/* foreach */}
            <div className='roster-rsvp-in'>Max Moise</div>
            <div className='roster-rsvp-in'>Jose Sanchez</div>
            <div className='roster-rsvp-in'>Edwin</div>
            <div className='roster-rsvp-in'>Chris</div>
            <div className='roster-rsvp-in'>Fan Feng</div>
            <div className='roster-rsvp-in'>Hao Tan</div>
            <div className='roster-rsvp-in'>Ernest Lindain</div>
            <div className='roster-rsvp-in'>Dave</div>
            <div className='roster-rsvp-in'>William Lin</div>
          </div>

        </div>

      </div>
    );
  }
}

export default App;
