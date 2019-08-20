/**
 * Node modules
 */
import React, { ReactNode } from 'react';
import { isMobile } from 'react-device-detect';

/**
 * Custom components
 */
import Navbar from '../Navbar/Navbar';

/**
 * Styles
 */
import styles from './AppContainer.module.css';

/**
 * Types
 */
import { Tab } from '../../types';

interface Props {
  children: ReactNode | ReactNode[];
  showNav?: boolean;
  tabs?: Tab[];
}

/**
 * A wrapper component for the App.
 * Shows navbar containing {props.tab} on {props.showNav}
 */
function AppContainer(props: Props) {
  const {
    children,
    showNav,
    tabs,
  }: Props = props;
  return (
    <div>
      {showNav && (
        <Navbar tabs={tabs} />
      )}
      <div className={isMobile ? styles.m_container : styles.container}>
        {children}
      </div>
    </div>
  );
}

AppContainer.defaultProps = {
  showNav: false,
  tabs: [{
    label: 'Home',
    link: '/',
  }],
};

export default AppContainer;
