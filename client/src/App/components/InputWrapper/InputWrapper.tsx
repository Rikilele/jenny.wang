/**
 * Node modules
 */
import React, { ReactNode } from 'react';

/**
 * Styles
 */
import styles from './InputWrapper.module.css';

/**
 * Types
 */
interface Props {
  required?: boolean;
  children: ReactNode;
  label?: string;
  errorMessage?: string;
}

/**
 * Wraps any input with a label and error message if needed.
 */
function InputWrapper(props: Props) {
  const {
    required,
    children,
    label,
    errorMessage,
  }: Props = props;
  return (
    <div className={styles.wrapper}>
      <p>
        {label}
        {required && <span className={styles.required}>(Required)</span>}
      </p>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      {children}
    </div>
  );
}

InputWrapper.defaultProps = {
  required: false,
  label: '',
  errorMessage: '',
};

export default InputWrapper;
