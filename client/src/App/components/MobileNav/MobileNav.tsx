/**
 * Node modules
 */
import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

/**
 * Assets
 */
import menu from './menu.png';
import x from './x.png';

/**
 * Styles
 */
import styles from './MobileNav.module.css';

/**
 * Types
 */
import { Tab } from '../../types';

interface Props {
  tabs: Tab[];
}

interface State {
  isOpen: boolean;
}

/**
 * Renders a navbar for mobile.
 * Bar with menu icon shows on top.
 * When clicked, tabs show up underneath.
 */
class MobileNav extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isOpen: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: MouseEvent) {
    e.preventDefault();
    const { isOpen }: Partial<State> = this.state;
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const { tabs }: Partial<Props> = this.props;
    const { isOpen }: Partial<State> = this.state;
    return (
      <div>
        <div
          className={styles.nav}
        >
          <button
            className={styles.button}
            type="button"
            onClick={this.handleClick}
          >
            <img
              className={styles.icon}
              src={isOpen ? x : menu}
              alt="menu"
            />
          </button>
        </div>
        <nav className={`${styles.dropdown} ${isOpen ? styles.open : styles.closed}`}>
          {tabs.map((tab: Tab) => (
            <Link
              key={tab.label}
              className={`${styles.tab} ${isOpen ? styles.open : styles.closed}`}
              to={tab.link}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>
    );
  }
}

// @ts-ignore
MobileNav.defaultProps = {
  tabs: [{
    label: 'Home',
    link: '/',
  }],
};

export default MobileNav;
