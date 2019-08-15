/**
 * Node modules
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

/**
 * Styles
 */
import './Circle.css';

/**
 * Types
 */
interface Props {
  imageSrc: string;
  link: string | null;
  title?: string;
  description?: string;
}

interface State {
  hovered: boolean;
}

/**
 * Circle component for the App.
 * Displays an interactive circle with an image, title, and description.
 * Can be made a link depending on {props.link}: string | null
 */
class Circle extends React.Component<Props, State> {
  constructor(props: Props) {
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

  /**
   * Renders a circle for mobile view
   */
  renderMobileCircle() {
    const {
      imageSrc,
      title,
      description,
    }: Partial<Props> = this.props;
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

  /**
   * Renders a circle for normal browser view
   */
  renderBrowserCircle() {
    const {
      imageSrc,
      title,
      description,
    }: Partial<Props> = this.props;
    const { hovered }: Partial<State> = this.state;
    return (
      <div
        className={`circle-container ${hovered ? 'circle-container-hover' : ''}`}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <img
          className={`circle ${hovered ? 'circle-hover' : ''}`}
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
    const { link }: Partial<Props> = this.props;

    // Mobile will show title and description as default
    if (isMobile && !link) {
      return this.renderMobileCircle();
    }

    if (isMobile) {
      return (
        // @ts-ignore
        <Link to={link}>
          {this.renderMobileCircle()}
        </Link>
      );
    }

    if (!link) {
      return this.renderBrowserCircle();
    }

    return (
      // @ts-ignore
      <Link to={link}>
        {this.renderBrowserCircle()}
      </Link>
    );
  }
}

// @ts-ignore
Circle.defaultProps = {
  title: '',
  description: '',
};

export default Circle;
