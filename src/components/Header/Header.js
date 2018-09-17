import React from 'react';
import './Header.css';

const Header = ({ title }) => {
    return (
        <header className='App-header'>
            <div className='header-title'>
                {title}
            </div>
        </header>
    );
}

export default Header;
