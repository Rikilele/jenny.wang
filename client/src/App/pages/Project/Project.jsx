/**
 * Node modules
 */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

/**
 * Custom components
 */
import AppContainer from '../../components/AppContainer/AppContainer';

/**
 * Routing
 */
import routes from '../routes.json';

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
};

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
    };
  }

  componentDidMount() {
    this.getProject();
  }

  getProject() {
    const { match } = this.props;
    fetch(`/projects/${match.params.id}/${match.params.id}.md`)
      .then(res => res.text())
      .then(content => this.setState({ content }));
  }

  render() {
    const { content } = this.state;
    return (
      <AppContainer showNav tabs={routes}>
        <ReactMarkdown source={content} />
      </AppContainer>
    );
  }
}

Project.propTypes = propTypes;

export default Project;
