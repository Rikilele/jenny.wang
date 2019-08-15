/**
 * Node modules
 */
import React, { ReactNode } from 'react';

/**
 * Styles
 */
import './HorizontalTable.css';

/**
 * Types
 */
interface Props {
  children: ReactNode[];
}

/**
 * A component to auto-generate horizontal row of cells.
 * Renders {props.children} horizontally.
 */
export default function HorizontalTable(props: Props) {
  const { children }: Props = props;
  return (
    <table className="horizontal-table">
      <tbody>
        <tr>
          {children.map((child: ReactNode, i: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <td key={i}>
              {child}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
