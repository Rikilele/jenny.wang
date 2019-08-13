/**
 * Node modules
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Styles
 */
import './HorizontalTable.css';

const propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

function HorizontalTable(props) {
  const { children } = props;
  return (
    <table className="horizontal-table">
      <tbody>
        <tr>
          {children.map((child, i) => (
            <td key={i}>
              {child}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

HorizontalTable.propTypes = propTypes;

export default HorizontalTable;
