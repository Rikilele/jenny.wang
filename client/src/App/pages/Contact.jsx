import React from 'react';

/**
 * Contact form submitted to /api/sendMail
 */
export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      subject: '',
      content: '',
      apiResponse: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Submits a post request to the API server to send an email.
   * Normal responses will be stored in {this.state.apiResponse}.
   * API error will be notified by setting {this.state.apiError}.
   */
  handleSubmit(e) {
    e.preventDefault();
    const {
      name,
      email,
      subject,
      content,
    } = this.state;

    /**
     * Returns an object with success status:
     * {
     *   success: boolean,
     *   errors: string[]
     * }
     */
    fetch('/api/sendMail', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        subject,
        content,
      }),
    })
      .then(res => res.json())
      .then(apiResponse => this.setState({ apiResponse }));
  }

  /**
   * Handles all form input changes.
   */
  handleChange(e) {
    const newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  /**
   * Returns a React component enclosing API response.
   */
  renderAPIResponse() {
    const { apiResponse } = this.state;
    if (!apiResponse) {
      return null;
    }

    if (apiResponse.success) {
      return <div>Success!</div>;
    }

    if (apiResponse.errors) {
      return (
        <div>
          {apiResponse.errors.map(error => (
            <div>
              {error}
            </div>
          ))}
        </div>
      );
    }

    return null;
  }

  render() {
    const {
      name,
      email,
      subject,
      content,
    } = this.state;
    return (
      <div className="app">
        {this.renderAPIResponse()}
        <h1 className="home-title">
          Contact Jenny
        </h1>
        <p className="home-description">
          Pittsburgh - Vancouver - Shanghai
        </p>
        <form onSubmit={this.handleSubmit}>
          <input
            required
            placeholder="Name"
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <input
            required
            placeholder="Email address"
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            required
            placeholder="Subject"
            type="text"
            name="subject"
            value={subject}
            onChange={this.handleChange}
          />
          <textarea
            required
            placeholder="Content"
            type="text"
            name="content"
            value={content}
            onChange={this.handleChange}
            cols={60}
            rows={10}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}
