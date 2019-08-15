# Personal TSX Style Guide() {

## Interfacing Props and State

Declare interfaces for props and states after all imports as follows:

```typescript
/**
 * Types
 */
import { customType } from 'path/to/types';

interface Props {
  // Declare types for each prop
}

interface State {
  // Declare types for each state
}
```

## Object Destructuring

### `class` components

When using object destructuring to assign content of `props` and `state` to variables, declare type as follows:

```typescript
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

This is because `Partial<T>` allows props and states to be missing in the destructuring.

Even if all props or states are present in the destructuring, `Partial<T>` should be used for scalability.


### `function` components

When using object destructuring to assign `props`, declare type as follows:

```typescript
function SampleComponent(props: Props) {
  const {
    // List all props
  }: Props = props;
  // ...
}
```

This is because all props must be assigned to a variable in a function component.

If not, the prop should be excluded from `Props` because it is unused.

### Assigning to single variable

When using object destructuring to assign to only one variable, use only a single line.

```typescript
const { a }: Props = props;
```

Readability comes first imo if no big difference in functionality.

# };
