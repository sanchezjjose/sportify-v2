import React from 'react';
import { BrowserRouter as Link } from 'react-router-dom';

import homeNavIcon from './home-nav-icon.svg';
import scheduleNavIcon from './schedule-nav-icon.svg';

const Footer = ({ teamId }) => {
	return (
    <div className='footer'>
      <Link className='link-home' to={`/${teamId}`}>
        <button className='footer-home'>
            <img src={homeNavIcon} className="tab-icon" alt="home" />
            <span className='footer-text'> home </span>
        </button>
      </Link>
      <Link to={`/${teamId}/schedule`}>
        <button className='footer-schedule'>
            <img src={scheduleNavIcon} className="tab-icon" alt="schedule" />
            <span className='footer-text'> schedule </span>
        </button>
      </Link>
    </div>
	);
}

export default Footer;
