/**
 * Node modules
 */
import React from 'react';

/**
 * Custom components
 */
import AppContainer from '../../components/AppContainer/AppContainer';
import Circle from '../../components/Circle/Circle';
import Padding from '../../components/Padding/Padding';

/**
 * Routing
 */
import routes from '../routes.json';

/**
 * Types
 */
interface Album {
  id: number;
  title: string;
  description: string;
}

interface State {
  albums: Album[];
}

/**
 * Lists all projects
 */
export default class Photography extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      albums: [],
    };
  }

  // Fetch all project titles on mount
  componentDidMount() {
    this.getAlbums();
  }

  // Retrieves projects from API endpoint
  getAlbums() {
    fetch('/api/photography')
      .then((res) => res.json())
      .then((albums: Album[]) => this.setState({ albums }));
  }

  render() {
    const { albums }: Partial<State> = this.state;
    return (
      <AppContainer showNav tabs={routes}>
        <Padding />
        {albums.map((album: Album) => (
          <Circle
            key={album.id}
            imageSrc={`/photography/${album.id}.jpg`}
            title={album.title}
            description={album.description}
            link={`/photography/album/${album.id}`}
          />
        ))}
        <Padding />
      </AppContainer>
    );
  }
}
