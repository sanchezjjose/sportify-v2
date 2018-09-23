import React from 'react';
import Navigation from '../Navigation/Navigation';

const Landing = () => {
  return (
    <div className='Landing'>
      <Navigation />
      <div className='content-wrapper'>
        <div className='content'>
          <h2 className='welcome-message'><span>Welcome to Sportify.</span></h2>
          <p className='description'>
            {`
                Schedule, RSVP, get directions, create music playlists, and more...

                Please visit your team page to get started.
            `}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;