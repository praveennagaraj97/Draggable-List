import { Component } from 'react';
import DraggableContainer from './DragabbleContainer';

export default class App extends Component {
  render(): JSX.Element {
    return (
      <div style={{ maxWidth: '360px', margin: 'auto', marginTop: '30px' }}>
        <DraggableContainer></DraggableContainer>
      </div>
    );
  }
}
