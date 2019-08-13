/**
 * Node modules
 */
import React from 'react';
import { isMobile } from 'react-device-detect';

/**
 * Styles
 */
import './Padding.css';

export default function Padding() {
  return (
    <div className={isMobile ? 'm-padding' : 'padding'} />
  );
}
