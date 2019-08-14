/**
 * Node modules
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

/**
 * Custom components
 */
import MobileNav from '../MobileNav/MobileNav';

/**
 * Styles
 */
import './Navbar.css';

const propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    link: PropTypes.string,
  })),
};

const defaultProps = {
  tabs: [{
    label: 'Home',
    link: '/',
  }],
};

function Navbar(props) {
  const { tabs } = props;
  if (isMobile) {
    return (
      <MobileNav
        tabs={tabs}
      />
    );
  }

  const reversedTabs = [...tabs].reverse();
  return (
    <nav className="navbar">
      {reversedTabs.map((tab) => (
        <Link
          key={tab.label}
          className="navbar-tab"
          to={tab.link}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
