/**
 * Node modules
 */
import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';

/**
 * Custom components
 */
import Navbar from '../Navbar/Navbar';

/**
 * Styles
 */
import './AppContainer.css';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  showNav: PropTypes.bool,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    link: PropTypes.string,
  })),
};

const defaultProps = {
  showNav: false,
  tabs: [{
    label: 'Home',
    link: '/',
  }],
};

function AppContainer(props) {
  const {
    children,
    showNav,
    tabs,
  } = props;
  return (
    <div>
      {showNav && (
        <Navbar tabs={tabs} />
      )}
      <div className={isMobile ? 'm-app-container' : 'app-container'}>
        {children}
      </div>
    </div>
  );
}

AppContainer.propTypes = propTypes;
AppContainer.defaultProps = defaultProps;

export default AppContainer;
