import { DragEventHandler, ReactNode } from 'react';

import './style.css';
import dragICO from '../../assets/drag-hold_ico.png';

export default function ListItem({
  children,
  isDragabble,
  onDragStart,
  onDragEnd,
  onDragOver,
}: ListItemPropTypes): JSX.Element {
  return (
    <div
      className="list-item"
      draggable={isDragabble}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <img className="dragger" src={dragICO} alt="drag-hold" />
      {children}
    </div>
  );
}

interface ListItemPropTypes {
  children: ReactNode;
  isDragabble?: boolean;
  onDragStart?: DragEventHandler<HTMLDivElement> | undefined;
  onDragEnd?: DragEventHandler<HTMLDivElement> | undefined;
  onDragOver?: DragEventHandler<HTMLDivElement> | undefined;
}
