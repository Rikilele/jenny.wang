/**
 * Node modules
 */
import React, { MouseEvent } from 'react';

/**
 * Custom components
 */
import Dear from './components/Dear/Dear';
import NormalSlide from './components/NormalSlide/NormalSlide';
import PhotoSlide from './components/PhotoSlide/PhotoSlide';

/**
 * Assets
 */
import p0 from './assets/march23.jpg';
import p1 from './assets/april27.jpg';
import p2 from './assets/may7.jpg';
import p3 from './assets/may10.jpg';
import p4 from './assets/june12.jpg';
import p5 from './assets/june15.jpg';
import p6 from './assets/june16.jpg';
import p7 from './assets/june19.jpg';
import p8 from './assets/june23.jpg';
import p9 from './assets/sept20.jpg';
import p10 from './assets/sept22.jpg';
import p11 from './assets/sept23.jpg';
import p12 from './assets/last.jpg';

/**
 * Styles
 */
import styles from './Birthday.module.css';

/**
 * Types
 */
interface State {
  currPage: number;
  displayButton: boolean;
}

/**
 * Special Birthday Page <3
 */
export default class Birthday extends React.Component<{}, State> {

  private totalPages = 19;
  private content = [
    {
      line1: '2019/10/10',
      line2: 'Your birthday.',
    },
    {
      line1: 'On this day 19 years ago, you were born into this world.',
      line2: 'I thank your parents so much for bringing up an angel like you.',
    },
    {
      line1: 'While I\'m not there to celebrate with you,',
      line2: 'here\'s an album of memories I compiled for you.',
    },
    {
      line1: 'Could you have imagined one year ago today,',
      line2: 'that we\'d share this many memories together?',
    },
    {
      line1: 'Probably not, but we\'re together now,',
      line2: 'and are bound to share so many more intimate moments.',
    },
  ];
  private photos = [ p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, ];
  private dates = [
    'March 23rd',
    'April 27th',
    'May 7th',
    'May 10th',
    'June 12th',
    'June 15th',
    'June 16th',
    'June 19th',
    'June 23rd',
    'September 20th',
    'September 22nd',
    'September 23rd',
    'Happy birthday baby.',
  ];
  private captions = [
    'The first day we met.',
    'Intimate nights in Donner.',
    'Dreamy picnic at Mellon Park.',
    'Being in love.',
    'Reunited in Shanghai.',
    'Second picnic at Century Park.',
    'Tipsy together.',
    'Being cute together.',
    'Enjoying some classy nights too.',
    'What everyday life would be like.',
    'Date nights to fall in love again.',
    'Being silly and giggling together.',
    'I love you so much.️',
  ];

  constructor(props: {}) {
    super(props);
    this.state = {
      currPage: 0,
      displayButton: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Goes to the next slide
   * Wraps around
   */
  handleClick(e: MouseEvent) {
    e.preventDefault();
    const { currPage }: Partial<State> = this.state;
    this.setState({
      currPage: (currPage + 1) % this.totalPages,
      displayButton: false,
    });
    setTimeout(() => this.setState({ displayButton: true }), 3500);
  }

  renderFrontPage() {
    return (
      <div className={styles.frontPage}>
        <Dear />
      </div>
    );
  }

  renderContent() {
    const currPage = this.state.currPage;
    let landscape = false;
    if (
      currPage === 5
      || currPage === 8
      || currPage === 9
      || currPage === 12
      || currPage === 13
      || currPage === 18
    ) {
      landscape = true;
    }

    if (currPage === 0) {
      return this.renderFrontPage();
    } else if (currPage <= 3) {
      const content = this.content[currPage - 1];
      return <NormalSlide line1={content.line1} line2={content.line2} />
    } else if (currPage <= 15) {
      const photo = this.photos[currPage - 4];
      const caption = this.captions[currPage - 4];
      const date = this.dates[currPage - 4];
      return <PhotoSlide photo={photo} date={date} caption={caption} landscape={landscape} />
    } else if (currPage <= 17) {
      const content = this.content[currPage - 13];
      return <NormalSlide line1={content.line1} line2={content.line2} />
    } else {
      const photo = this.photos[this.photos.length - 1];
      const caption = this.captions[this.captions.length - 1];
      const date = this.dates[this.dates.length - 1];
      return <PhotoSlide photo={photo} date={date} caption={caption} landscape={landscape}  />
    }
  }

  render() {
    const {
      currPage,
      displayButton,
    }: Partial<State> = this.state;
    const buttonClass = displayButton ? 'animated fadeIn delay-1s' : styles.invisible;
    return (
      <div className={styles.container}>
        <div>
          {this.renderContent()}
        </div>
        <button
          className={`${buttonClass} ${styles.button}`}
          onClick={this.handleClick}
        >
          {currPage === this.totalPages - 1 ? 'Replay' : '>>'}
        </button>
      </div>
    );
  }
}
