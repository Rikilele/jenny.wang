/**
 * Node modules
 */
import React from 'react';
import PropTypes from 'prop-types';
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

const propTypes = {
  apiEndpoint: PropTypes.string.isRequired,
  publicRoute: PropTypes.string.isRequired,
};

class CarouselPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSources: [],
    };
  }

  componentDidMount() {
    this.getImageSources();
  }

  getImageSources() {
    const { apiEndpoint } = this.props;
    fetch(apiEndpoint)
      .then(res => res.json())
      .then(imageSources => this.setState({ imageSources }));
  }

  render() {
    const { publicRoute } = this.props;
    const { imageSources } = this.state;
    return (
      <div>
        <Navbar tabs={routes} />
        <Carousel
          showThumbs={!isMobile}
          showStatus={false}
          showIndicators={false}
          useKeyboardArrows
          infiniteLoop
          transitionTime={300}
          swipeable={false}
        >
          {imageSources.map(imgSrc => (
            <div
              key={imgSrc}
              className={isMobile ? 'm-carousel-page-height' : 'carousel-page-height'}
            >
              <img
                className="carousel-page-image"
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

CarouselPage.propTypes = propTypes;

export default CarouselPage;
