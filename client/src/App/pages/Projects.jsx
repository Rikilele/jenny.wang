import React from 'react';
import Circle from './components/Circle';

export default class Projects extends React.Component {
  constructor(props) {
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
      .then(res => res.json())
      .then(projects => this.setState({ projects }));
  }

  render() {
    const { projects } = this.state;

    return (
      <div className="app">
        <div>
          {projects.map(project => (
            <Circle
              key={project.id}
              imageSrc={`/projects/${project.id}/${project.id}.jpg`}
              title={project.title}
              description={project.description}
              link={`/projects/details/${project.id}`}
            />
          ))}
        </div>
      </div>
    );
  }
}
