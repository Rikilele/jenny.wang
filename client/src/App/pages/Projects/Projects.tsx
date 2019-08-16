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
interface Project {
  id: number;
  title: string;
  description: string;
}

interface State {
  projects: Project[];
}

/**
 * Lists all projects
 */
export default class Projects extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      projects: [],
    };
  }

  // Fetch all project titles on mount
  componentDidMount() {
    this.getProjects();
  }

  // Retrieves projects from API endpoint
  getProjects() {
    fetch('/api/getProjectList')
      .then((res) => res.json())
      .then((projects: Project[]) => this.setState({ projects }));
  }

  render() {
    const { projects }: Partial<State> = this.state;
    return (
      <AppContainer showNav tabs={routes}>
        <Padding />
        {projects.map((project: Project) => (
          <Circle
            key={project.id}
            imageSrc={`/projects/${project.id}/${project.id}.jpg`}
            title={project.title}
            description={project.description}
            link={`/projects/details/${project.id}`}
          />
        ))}
      </AppContainer>
    );
  }
}
