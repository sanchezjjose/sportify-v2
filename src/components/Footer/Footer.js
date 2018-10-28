import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';
import homeNavIcon from './home-nav-icon.svg';
import scheduleNavIcon from './schedule-nav-icon.svg';

const Footer = ({ teamId }) => {
	return (
    <div className='Footer'>
      <Link className='link-home' to={`/${teamId}`}>
        <div className='footer-button'>
            <img src={homeNavIcon} className="tab-icon" alt="home" />
            <span className='footer-text'> home </span>
        </div>
      </Link>
      <Link to={`/${teamId}/schedule`}>
        <div className='footer-button'>
            <img src={scheduleNavIcon} className="tab-icon" alt="schedule" />
            <span className='footer-text'> schedule </span>
        </div>
      </Link>
    </div>
	);
}

export default Footer;
