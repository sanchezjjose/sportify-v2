import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Landing.css';

const Landing = () => {
  return (
    <div className='Landing'>
      <Navigation />
      <div className='content'>
        <h2 className='welcome-message'><span>Welcome to Sportify.</span></h2>
        <p className='description'>
          {`
              Create a team, schedule games, build a rosters, and start playing!

              With Sportify, everyone can RSVP to games, so you always know if you have enough players.

              Features:

              - RSVP to games.
              - Pick who will bring the game ball.
              - Get directions to game location.

              Please visit your team page to get started.
          `}
        </p>
      </div>
    </div>
  );
};

export default Landing;