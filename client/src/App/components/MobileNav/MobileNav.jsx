/**
 * Node modules
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Assets
 */
import menu from './menu.png';

/**
 * Styles
 */
import './MobileNav.css';

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

class MobileNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const { tabs } = this.props;
    const { isOpen } = this.state;
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
          {tabs.map((tab) => (
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

MobileNav.propTypes = propTypes;
MobileNav.defaultProps = defaultProps;

export default MobileNav;
