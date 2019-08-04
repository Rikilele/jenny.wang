import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Circle.css';

const propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
};

const defaultProps = {
  title: '',
  description: '',
  link: '',
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

  render() {
    const { hovered } = this.state;
    const {
      imageSrc,
      title,
      description,
      link,
    } = this.props;
    return (
      <Link to={link}>
        <div
          className="circle-container"
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
      </Link>
    );
  }
}

Circle.propTypes = propTypes;
Circle.defaultProps = defaultProps;

export default Circle;
