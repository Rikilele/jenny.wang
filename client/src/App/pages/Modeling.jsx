import React from 'react';
import { isMobile } from 'react-device-detect';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.css"

export default class Modeling extends React.Component {
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
    fetch('/api/getModelImages')
      .then(res => res.json())
      .then(imageSources => this.setState({ imageSources }));
  }

  render() {
    const { imageSources } = this.state;

    return (
      <div className={isMobile ? 'carousel-mobile' : 'carousel-browser'}>
        <Carousel
          showThumbs={!isMobile}
          showStatus={false}
          showIndicators={false}
          swipeScrollTolerance={1}
          useKeyboardArrows
          infiniteLoop
        >
          {imageSources.map(imgSrc => (
            <div
              key={imgSrc}
              className="slide-limitter"
            >
              <img
                className="carousel-image"
                src={`/modeling/${imgSrc}`}
                alt={imgSrc}
              />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}
