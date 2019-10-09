/**
 * Node modules
 */
import React from 'react';

/**
 * Styles
 */
import styles from './PhotoSlide.module.css';

/**
 * Types
 */
interface Props {
  photo?: string;
  date?: string;
  caption?: string;
  landscape ?: boolean;
}

interface State {
  className: string;
}

/**
 * Component just to add a little space to App.
 */
export default class PhotoSlide extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      className: styles.invisible,
    };
    setTimeout(() => this.setState({ className: 'fadeIn' }), 500);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.caption !== this.props.caption) {
      this.setState({ className: styles.invisible });
      setTimeout(() => this.setState({ className: 'fadeIn' }), 500);
    }
  }

  render() {
    const {
      photo,
      date,
      caption,
      landscape,
    }: Partial<Props> = this.props;
    const { className }: Partial<State> = this.state;
    return (
      <div>
        <img
          className={`animated ${className} ${styles.photo} ${landscape ? styles.landscape : ''}`}
          src={photo}
          alt={caption}
        />
        <p className={`${styles.caption} animated ${className} delay-1s`}>{date}</p>
        <p className={`${styles.caption} animated ${className} delay-2s`}>{caption}</p>
      </div>
    );
  }
}
