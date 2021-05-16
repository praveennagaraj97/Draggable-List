import ListItem from '../Shared/Listitem';

import './style.css';

import { list } from '../../data/dummy-list';
import { Component, DragEvent } from 'react';

export default class DraggableContainer extends Component<
  {},
  {
    currentDragItem: { id: number; name: string } | null;
    items: { id: number; name: string }[];
    startPos: number | null;
  }
> {
  constructor(props: {}) {
    super(props);
    this.state = { currentDragItem: null, items: [], startPos: null };
  }

  listenToDragStartEvent = (
    e: DragEvent<HTMLDivElement>,
    item: { id: number; name: string }
  ) => {
    e.currentTarget.classList.add('dragging');
    this.setState({ currentDragItem: item });
    this.setState({ startPos: e.clientY });
  };

  listenToDragEndEvent = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('dragging');
  };

  listenToDragOver = (
    e: DragEvent<HTMLDivElement>,
    item: { id: number; name: string }
  ) => {
    e.preventDefault();
    const listState = [...this.state.items];
    if (e.clientY < this.state.startPos!) {
      listState[
        listState.findIndex(
          (each) => each.id === this.state.currentDragItem?.id
        )
      ] = item;
      listState[listState.findIndex((each) => each.id === item.id)] =
        this.state.currentDragItem!;
    } else {
      listState[listState.findIndex((each) => each.id === item.id)] =
        this.state.currentDragItem!;
      listState[
        listState.findIndex(
          (each) => each.id === this.state.currentDragItem?.id
        )
      ] = item;
    }

    this.setState({
      items: listState,
    });
    window.navigator.vibrate(200);
    this.setState({ startPos: e.clientY });
  };

  componentDidMount() {
    this.setState({ items: list });
  }

  render() {
    return (
      <div className="drag-container">
        {this.state.items?.map(({ id, name }) => {
          return (
            <ListItem
              key={id}
              isDragabble={true}
              onDragStart={(e) => this.listenToDragStartEvent(e, { id, name })}
              onDragEnd={this.listenToDragEndEvent}
              onDragOver={(e) => this.listenToDragOver(e, { id, name })}
            >
              <p>{name}</p>
            </ListItem>
          );
        })}
      </div>
    );
  }
}
