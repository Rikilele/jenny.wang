import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import './Circle.css';

const propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  readonly: PropTypes.bool,
};

const defaultProps = {
  title: '',
  description: '',
  link: '',
  readonly: false,
};

class Circle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hovered: false };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState({ hovered: true });
  }

  handleMouseLeave() {
    this.setState({ hovered: false });
  }

  renderMobileCircle() {
    const {
      imageSrc,
      title,
      description,
    } = this.props;

    return (
      <div className="m-circle-container">
        <img
          className="m-circle"
          src={imageSrc}
          alt={title}
        />
        <div className="m-circle-layover">
          <div className="m-circle-title">{title}</div>
          <div className="m-circle-description">{description}</div>
        </div>
      </div>
    );
  }

  renderBrowserCircle() {
    const { hovered } = this.state;
    const {
      imageSrc,
      title,
      description,
    } = this.props;

    return (
      <div
        className={hovered ? 'circle-container circle-container-hover' : 'circle-container'}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <img
          className={hovered ? 'circle circle-hover' : 'circle'}
          src={imageSrc}
          alt={title}
        />
        {hovered && (
          <div className="circle-layover">
            <div className="circle-title">{title}</div>
            <div className="circle-description">{description}</div>
          </div>
        )}
      </div>
    );
  }

  render() {
    const {
      link,
      readonly,
    } = this.props;

    // Mobile will show title and description as default
    if (isMobile && readonly) {
      return this.renderMobileCircle();
    }

    if (isMobile) {
      return (
        <Link to={link}>
          {this.renderMobileCircle()}
        </Link>
      );
    }

    if (readonly) {
      return this.renderBrowserCircle();
    }

    return (
      <Link to={link}>
        {this.renderBrowserCircle()}
      </Link>
    );
  }
}

Circle.propTypes = propTypes;
Circle.defaultProps = defaultProps;

export default Circle;
