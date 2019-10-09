/**
 * Node modules
 */
import React from 'react';

/**
 * Styles
 */
import styles from './Dear.module.css';

/**
 * Types
 */
interface State {
  currIndex: number;
  fadeIn: boolean;
}

/**
 * Switches name in Dear ___ every second.
 */
export default class Dear extends React.Component<{}, State> {

  /**
   * Different names I call her <3
   */
  private NAMES: string[] = [
    'Jen',
    'Baby',
    'Cookie',
    'Bae',
    'bbbb',
    'Boo',
    '🐰🍮🍑',
    'Babe',
    'Love',
  ];

  private interval: any;

  constructor(props: {}) {
    super(props);
    this.state = {
      currIndex: 0,
      fadeIn: true,
    };
    this.changeName = this.changeName.bind(this);
  }
  
  componentDidMount() {
    this.interval = setInterval(this.changeName, 1200);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /**
   * Change name every second.
   */
  changeName() {
    const {
      currIndex,
      fadeIn,
    }: Partial<State> = this.state;
    this.setState({
      currIndex: fadeIn ? currIndex : (currIndex + 1) % this.NAMES.length,
      fadeIn: !fadeIn,
    });
  }

  render() {
    const {
      currIndex,
      fadeIn,
    }: Partial<State> = this.state;
    const className = fadeIn ? 'animated fadeIn' : 'animated fadeOut';
    return (
      <h1 className={styles.dear}>
        Dear <span className={className}>{`${this.NAMES[currIndex]},`}</span>
      </h1>
    );
  }
}
