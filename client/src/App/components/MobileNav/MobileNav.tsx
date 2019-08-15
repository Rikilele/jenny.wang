/**
 * Node modules
 */
import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

/**
 * Assets
 */
import menu from './menu.png';

/**
 * Styles
 */
import './MobileNav.css';

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
          className="m-nav"
        >
          <button
            className="m-button"
            type="button"
            onClick={this.handleClick}
          >
            <img
              className="m-nav-icon"
              src={menu}
              alt="menu"
            />
          </button>
        </div>
        <nav className={`m-nav-dropdown ${isOpen ? 'm-nav-open' : 'm-nav-closed'}`}>
          {tabs.map((tab: Tab) => (
            <Link
              key={tab.label}
              className={`m-nav-tab ${isOpen ? 'm-nav-open' : 'm-nav-closed'}`}
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
