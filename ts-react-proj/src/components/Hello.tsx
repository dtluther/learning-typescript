import * as React from 'react';

export interface HelloProps { compiler: String; framework: String; }
// 'HelloProps' describes the shape of props.

// Here's the function component option, which we should use since there is no state:
export const Hello = (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>

// Also a class otion if we want:
// export class Hello extends React.Component<HelloProps, {}> { // State is never set so we use the '{}' type.
//     render() {
//         return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
//     }
// }