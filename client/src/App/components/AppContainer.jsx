import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';

const propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

function AppContainer(props) {
  const { children } = props;
  return (
    <div className={isMobile ? 'app-mobile' : 'app'}>
      {children}
    </div>
  );
}

AppContainer.propTypes = propTypes;

export default AppContainer;
