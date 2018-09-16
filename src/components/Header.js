import React from 'react';

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
