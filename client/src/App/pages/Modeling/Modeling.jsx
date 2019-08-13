/**
 * Node modules
 */
import React from 'react';

/**
 * Custom Components
 */
import CarouselPage from '../CarouselPage/CarouselPage';

export default function Modeling() {
  return (
    <CarouselPage
      apiEndpoint="/api/getModelImages"
      publicRoute="/modeling"
    />
  );
}
