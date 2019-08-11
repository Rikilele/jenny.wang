import React from 'react';
import PropTypes from 'prop-types';
import './InputWrapper.css';

const propTypes = {
  required: PropTypes.bool,
  children: PropTypes.element.isRequired,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
};

const defaultProps = {
  required: false,
  label: '',
  errorMessage: '',
};

function InputWrapper(props) {
  const {
    required,
    children,
    label,
    errorMessage,
  } = props;
  return (
    <div className="input-wrapper">
      <p>
        {label}
        {required && <span className="input-required">(Required)</span>}
      </p>
      {errorMessage && <p className="input-error">{errorMessage}</p>}
      {children}
    </div>
  );
}

InputWrapper.propTypes = propTypes;
InputWrapper.defaultProps = defaultProps;

export default InputWrapper;
