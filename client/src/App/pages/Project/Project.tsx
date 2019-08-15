/**
 * Node modules
 */
import React from 'react';
import { RouteComponentProps } from 'react-router';
import ReactMarkdown from 'react-markdown';

/**
 * Custom components
 */
import AppContainer from '../../components/AppContainer/AppContainer';

/**
 * Routing
 */
import routes from '../routes.json';

/**
 * Types
 */
interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

interface State {
  content: string;
}

/**
 * Layout for a project.
 * Will display contents of fetched markdown.
 */
export default class Project extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  componentDidMount() {
    this.getProject();
  }

  getProject() {
    const { match }: Partial<Props> = this.props;
    fetch(`/projects/${match.params.id}/${match.params.id}.md`)
      .then((res) => res.text())
      .then((content: string) => this.setState({ content }));
  }

  render() {
    const { content }: Partial<State> = this.state;
    return (
      <AppContainer showNav tabs={routes}>
        <ReactMarkdown source={content} />
      </AppContainer>
    );
  }
}
