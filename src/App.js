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
            <p>July 25th, 8:15 p.m.</p>
          </div>

          {/* RsvpComponent */}

          <div className='line-divider'></div>

          {/* RosterComponent */}
          <div className='roster'>
            <div className='roster-title'>Roster</div>
            <div className='roster-subtitle'>9 players confirmed</div>
            <div className='roster-rsvp-in'>
              Max Moise <br/>
              Jose Sanchez
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default App;
