/**
 * Node modules
 */
import React from 'react';
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

/**
 * Types
 */
import { Tab } from '../../types';

interface Props {
  tabs: Tab[]
}

/**
 *  Renders a navbar based on {props.tabs} given.
 *  Different views on mobile and others.
 */
function Navbar(props: Props) {
  const {
    tabs,
  }: Props = props;
  if (isMobile) {
    return (
      <MobileNav tabs={tabs} />
    );
  }

  const reversedTabs: Tab[] = [...tabs].reverse();
  return (
    <nav className="navbar">
      {reversedTabs.map((tab: Tab) => (
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

Navbar.defaultProps = {
  tabs: [{
    label: 'Home',
    link: '/',
  }],
};

export default Navbar;
