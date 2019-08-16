# Personal TSX Style Guide(): void {

## Table of Contents

  1. [Modules](#modules)
  1. [Types](#types)
  1. [Props and State](#props-and-state)
  1. [Destructuring](#destructuring)

## Modules

  - Ordering for module imports:
  
  1. Node modules
  1. Custom components
  1. Assets
  1. Styles
  1. Types

     ```tsx
     /**
      * Node modules
      */
     import React from 'react';
     
     /**
      * Custom components
      */
     import CustomComponent from 'path/to/CustomComponent';
     
     /**
      * Assets
      */
     import someIcon from './someIcon.png';
     
     /**
      * Styles
      */
     import 'styles.css';
     
     /**
      * Types
      */
     interface CustomType {
       // ...
     }
     ```

**[⬆ back to top](#table-of-contents)**

## Types

  - Import types alongside regular node module imports when available.

    ```tsx
    /**
    * Node modules
    */
    import express, { Request, Response } from 'express';
    ```
   
  - Import custom types after all other imports.

    ```tsx
    
    /**
    * Types
    */
    import { CustomType } from 'path/to/types';
    ```

**[⬆ back to top](#table-of-contents)**

## Props and State

  - Declare interfaces for props and state after all imports and right before the react component.

    ```tsx
    // ...
    
    interface Props {
     // ...
    }
    
    interface State {
     // ...
    }
    
    /**
    * Component
    */
    class CustomComponent extends React.Component<Props, State> {
     // ...
    }
    ```

**[⬆ back to top](#table-of-contents)**

## Destructuring

  - When using object destructuring to assign content of `props` and `state` to variables, declare type as follows:

    > Why? `Partial<T>` allows props and states to be missing in the destructuring.
    > Even if all props or states are present in the destructuring, `Partial<T>` should be used for scalability.

    ```tsx
    class SampleComponent extends React.Component<Props, State> {
      someFunction() {
        const {
          // List props to use
        }: Partial<Props> = this.props;
        const {
          // List states to use
        }: Partial<State> = this.state;
        // ...
      }
    }
    ```

  - When using object destructuring to assign `props`, declare type as follows:
  
    > Why? All props must be assigned to a variable in a function component.
    > If not, the prop should be excluded from `Props` because it is unused.
  
    ```tsx
    function SampleComponent(props: Props) {
      const {
        // List all props
      }: Props = props;
      // ...
    }
    ```

  - When using object destructuring to assign to only one variable, use only a single line.

    > Why? Readability comes first imo if no big difference in functionality.

    ```tsx
    const { a }: Props = props;
    ```

**[⬆ back to top](#table-of-contents)**

# };
