/**
 * Node modules
 */
import React from 'react';

/**
 * Custom Components
 */
import CarouselPage from '../CarouselPage/CarouselPage';

export default function Photography() {
  return (
    <CarouselPage
      apiEndpoint="/api/getPhotographyImages"
      publicRoute="/photography"
    />
  );
}