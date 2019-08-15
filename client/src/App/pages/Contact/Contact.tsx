/**
 * Node modules
 */
import React, { FormEvent, ChangeEvent } from 'react';
import validator from 'validator';
import { ToastContainer, toast } from 'react-toastify';

/**
 * Custom components
 */
import AppContainer from '../../components/AppContainer/AppContainer';
import HorizontalTable from '../../components/HorizontalTable/HorizontalTable';
import InputWrapper from '../../components/InputWrapper/InputWrapper';
import Padding from '../../components/Padding/Padding';

/**
 * Assets
 */
import instaIcon from './instaicon.png';
import emailIcon from './emailicon.png';

/**
 * Styles
 */
import 'react-toastify/dist/ReactToastify.css';
import './Contact.css';

/**
 * Routing
 */
import routes from '../routes.json';

/**
 * Types
 */
interface State {
  name: string;
  email: string;
  subject: string;
  content: string;
  validated: boolean[];
}

// For apiResponse
interface ResultObj {
  success: boolean;
  errors: string[];
}

/**
 * Contact form submitted to /api/sendMail
 */
export default class Contact extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: '',
      email: '',
      subject: '',
      content: '',
      validated: [true, true, true, true],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  /**
   * Validates input {name}, {email}, {subject}, and {content}.
   * Newly sets state {validated}.
   * Returns boolean value of whether all inputs were valid.
   */
  validateInput(
    name: string,
    email: string,
    subject: string,
    content: string,
  ): boolean {
    const newlyValidated: boolean[] = [false, false, false, false];
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
    return newlyValidated.every((validated: boolean) => validated);
  }

  /**
   * Requests API to send form input.
   * Invokes toasts depending on response.
   */
  requestContactToAPI(
    name: string,
    email: string,
    subject: string,
    content: string,
  ): void {
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
      .then((res) => res.json())
      .then((apiResponse: ResultObj) => {
        if (apiResponse.success) {
          toast.success('Successfully sent!', {
            position: toast.POSITION.BOTTOM_CENTER,
            className: 'contact-toast-success',
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
          apiResponse.errors.forEach((error: string) => {
            toast.error(error, {
              position: toast.POSITION.BOTTOM_CENTER,
              className: 'contact-toast-error',
              autoClose: 8000,
            });
          });
        }
      });
  }

  /**
   * Submits a post request to the API server to send an email.
   */
  handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const {
      name,
      email,
      subject,
      content,
    }: Partial<State> = this.state;

    /**
     * Validate input first.
     * If validation passes, ask API
     */
    if (this.validateInput(name, email, subject, content)) {
      this.requestContactToAPI(name, email, subject, content);
    }
  }

  /**
   * Handles change in name field.
   */
  handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  /**
   * Handles change in email field.
   */
  handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    this.setState({ email: e.target.value });
  }

  /**
   * Handles change in subject field.
   */
  handleSubjectChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    this.setState({ subject: e.target.value });
  }

  /**
   * Handles change in content field.
   */
  handleContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    this.setState({ content: e.target.value });
  }

  render() {
    const {
      name,
      email,
      subject,
      content,
      validated,
    }: Partial<State> = this.state;
    return (
      <AppContainer showNav tabs={routes}>
        <Padding />
        <HorizontalTable>
          <a href="mailto:jiayiw3@andrew.cmu.edu" target="__blank">
            <img src={emailIcon} alt="Email" width="30px" />
          </a>
          <a href="https://www.instagram.com/jen_nwang/" target="__blank">
            <img src={instaIcon} alt="Instagram" width="30px" />
          </a>
        </HorizontalTable>
        <p>
          or send a message
        </p>
        <form onSubmit={this.handleSubmit}>
          <InputWrapper
            required
            label="Name"
            errorMessage={validated[0] ? '' : 'Name must be under 70 characters'}
          >
            <input
              required
              className="contact-input"
              type="text"
              name="name"
              value={name}
              maxLength={70}
              onChange={this.handleNameChange}
            />
          </InputWrapper>
          <InputWrapper
            required
            label="Email"
            errorMessage={validated[1] ? '' : 'Must be a valid email address'}
          >
            <input
              required
              className="contact-input"
              type="email"
              name="email"
              value={email}
              maxLength={320}
              onChange={this.handleEmailChange}
            />
          </InputWrapper>
          <InputWrapper
            label="Subject"
            errorMessage={validated[2] ? '' : 'Subject must be under 70 characters'}
          >
            <input
              className="contact-input"
              type="text"
              name="subject"
              value={subject}
              maxLength={70}
              onChange={this.handleSubjectChange}
            />
          </InputWrapper>
          <InputWrapper
            required
            label="Content"
            errorMessage={validated[3] ? '' : 'Content must be between 20 and 500 characters'}
          >
            <textarea
              required
              className="contact-input"
              name="content"
              value={content}
              rows={4}
              minLength={20}
              maxLength={500}
              onChange={this.handleContentChange}
            />
          </InputWrapper>
          <button className="contact-button" type="submit">Send</button>
          <ToastContainer />
        </form>
        <Padding />
      </AppContainer>
    );
  }
}
