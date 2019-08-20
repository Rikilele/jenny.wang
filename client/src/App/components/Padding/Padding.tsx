/**
 * Node modules
 */
import React from 'react';
import { isMobile } from 'react-device-detect';

/**
 * Styles
 */
import styles from './Padding.module.css';

/**
 * Component just to add a little space to App.
 */
export default function Padding() {
  return (
    <div className={isMobile ? styles.m_padding : styles.padding} />
  );
}
