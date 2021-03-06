/**
 * Node modules
 */
import React from 'react';
import { RouteComponentProps } from 'react-router';

/**
 * Custom Components
 */
import CarouselPage from '../CarouselPage/CarouselPage';

/**
 * Types
 */
interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

export default function PhotoAlbum(props: Props) {
  const { match }: Partial<Props> = props;
  return (
    <CarouselPage
      isHorizontal
      apiEndpoint={`/api/photography/${match.params.id}`}
      publicRoute={`/photography/${match.params.id}`}
    />
  );
}
