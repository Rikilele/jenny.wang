/**
 * Node modules
 */
import React from 'react';
import { isMobile } from 'react-device-detect';
import { Carousel } from 'react-responsive-carousel';

/**
 * Custom components
 */
import Navbar from '../../components/Navbar/Navbar';

/**
 * Styles
 */
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './CarouselPage.css';

/**
 * Routing
 */
import routes from '../routes.json';

/**
 * Types
 */
interface Props {
  isHorizontal?: boolean;
  apiEndpoint: string;
  publicRoute: string;
}

interface State {
  imageSources: string[];
}

/**
 * Layout for a page containing a carousel.
 * Assumes that api is built so images can be retrieved at a public route.
 */
export default class CarouselPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      imageSources: [],
    };
  }

  componentDidMount() {
    this.getImageSources();
  }

  getImageSources(): void {
    const { apiEndpoint }: Partial<Props> = this.props;
    fetch(apiEndpoint)
      .then((res) => res.json())
      .then((imageSources: string[]) => this.setState({ imageSources }));
  }

  render() {
    const {
      publicRoute,
      isHorizontal,
    }: Partial<Props> = this.props;
    const { imageSources }: Partial<State> = this.state;
    let imgClassAddition = '';
    if (isMobile && isHorizontal) {
      imgClassAddition = 'carousel-horizontal'
    }

    return (
      <div>
        <Navbar tabs={routes} />
        {!isMobile && <br />}
        <Carousel
          showThumbs={!isMobile}
          showStatus={false}
          showIndicators={false}
          useKeyboardArrows
          infiniteLoop
          transitionTime={300}
          swipeable={false}
        >
          {imageSources.map((imgSrc: string) => (
            <div
              key={imgSrc}
              className={isMobile ? 'm-carousel-page-height' : 'carousel-page-height'}
            >
              <img
                className={`carousel-page-image ${imgClassAddition}`}
                src={`${publicRoute}/${imgSrc}`}
                alt={imgSrc}
              />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}
