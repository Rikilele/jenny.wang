/**
 * Node modules
 */
import React from 'react';

/**
 * Styles
 */
import styles from './NormalSlide.module.css';

/**
 * Types
 */
interface Props {
  line1?: string;
  line2?: string;
}

interface State {
  className: string;
}

/**
 * Component just to add a little space to App.
 */
export default class NormalSlide extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      className: styles.invisible,
    };
    setTimeout(() => this.setState({ className: 'fadeInDown slow' }), 500);
  }

  componentDidUpdate(prevProps: Props) {
    // eslint-disable-next-line react/destructuring-assignment
    if (prevProps.line1 !== this.props.line1) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ className: styles.invisible });
      setTimeout(() => this.setState({ className: 'fadeInDown slow' }), 500);
    }
  }

  render() {
    const {
      line1,
      line2,
    }: Partial<Props> = this.props;
    const { className }: Partial<State> = this.state;
    return (
      <div className={styles.monologue}>
        <p className={`animated ${className}`}>{line1}</p>
        <p className={`animated ${className} delay-2s`}>{line2}</p>
      </div>
    );
  }
}
