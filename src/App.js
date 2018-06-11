import React, { Component } from 'react';
import homeNavIcon from './home-nav-icon.svg';
import scheduleNavIcon from './schedule-nav-icon.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
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
        <header className='App-header'>
          <div className='header-title'>
            Pickup Game
          </div>
        </header>
      </div>
    );
  }
}

export default App;
