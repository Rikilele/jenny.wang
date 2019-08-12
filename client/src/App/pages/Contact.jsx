import React from 'react';
import validator from 'validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppContainer from '../components/AppContainer';
import InputWrapper from '../components/InputWrapper';

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
      validated: [true, true, true, true],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Validates input {name}, {email}, {subject}, and {content}.
   * Newly sets state {validated}.
   */
  validateInput(name, email, subject, content) {
    const newlyValidated = [false, false, false, false];
    if (validator.isLength(name, { min: 1, max: 70 })) {
      newlyValidated[0] = true;
    }

    if (validator.isEmail(email)) {
      newlyValidated[1] = true;
    }

    if (validator.isLength(subject, { min: 0, max: 70 })) {
      newlyValidated[2] = true;
    }

    if (validator.isLength(content, { min: 20, max: 500 })) {
      newlyValidated[3] = true;
    }

    this.setState({ validated: newlyValidated });

    // Returns whether each input is actually valid
    return newlyValidated.every(validated => validated);
  }

  /**
   * Requests API to send form input.
   * Invokes toasts depending on response.
   */
  requestContactToAPI(name, email, subject, content) {
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
      .then((apiResponse) => {
        if (apiResponse.success) {
          toast.success('Successfully sent!', {
            position: toast.POSITION.BOTTOM_CENTER,
            className: 'toast-success',
            autoClose: 8000,
          });

          // Reset form
          this.setState({
            name: '',
            email: '',
            subject: '',
            content: '',
            validated: [true, true, true, true],
          });
        } else {
          apiResponse.errors.forEach((error) => {
            toast.error(error, {
              position: toast.POSITION.BOTTOM_CENTER,
              className: 'toast-error',
              autoClose: 8000,
            });
          });
        }
      });
  }

  /**
   * Submits a post request to the API server to send an email.
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
     * Validate input first.
     * If validation passes, ask API
     */
    if (this.validateInput(name, email, subject, content)) {
      this.requestContactToAPI(name, email, subject, content);
    }
  }

  /**
   * Handles all form input changes.
   */
  handleChange(e) {
    const newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  render() {
    const {
      name,
      email,
      subject,
      content,
      validated,
    } = this.state;
    return (
      <AppContainer>
        <h2>
          Contact
        </h2>
        <table className="app-table">
          <tbody>
            <tr>
              <td>
                <a
                  href="mailto:jiayi3@andrew.cmu.edu"
                  target="__blank"
                >
                  <img
                    src="/emailicon.png"
                    alt="Email"
                    width="30px"
                  />
                </a>
              </td>
              <td>
                <a
                  href="https://www.instagram.com/jen_nwang/"
                  target="__blank"
                >
                  <img
                    src="/instaicon.png"
                    alt="Instagram"
                    width="30px"
                  />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <h3>
          or send a message
        </h3>
        <form onSubmit={this.handleSubmit}>
          <InputWrapper
            required
            label="Name"
            errorMessage={validated[0] ? '' : 'Name must be under 70 characters'}
          >
            <input
              required
              className="app-input"
              type="text"
              name="name"
              value={name}
              maxLength={70}
              onChange={this.handleChange}
            />
          </InputWrapper>
          <InputWrapper
            required
            label="Email"
            errorMessage={validated[1] ? '' : 'Must be a valid email address'}
          >
            <input
              required
              className="app-input"
              type="email"
              name="email"
              value={email}
              maxLength={320}
              onChange={this.handleChange}
            />
          </InputWrapper>
          <InputWrapper
            label="Subject"
            errorMessage={validated[2] ? '' : 'Subject must be under 70 characters'}
          >
            <input
              className="app-input"
              type="text"
              name="subject"
              value={subject}
              maxLength={70}
              onChange={this.handleChange}
            />
          </InputWrapper>
          <InputWrapper
            required
            label="Content"
            errorMessage={validated[3] ? '' : 'Content must be between 20 and 500 characters'}
          >
            <textarea
              required
              className="app-input"
              type="text"
              name="content"
              value={content}
              rows={4}
              minLength={20}
              maxLength={500}
              onChange={this.handleChange}
            />
          </InputWrapper>
          <button
            className="app-button"
            type="submit"
          >
            Send
          </button>
          <ToastContainer />
        </form>
      </AppContainer>
    );
  }
}
