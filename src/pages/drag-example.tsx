import * as React from "react";
import {FC, useCallback, useRef, useState} from "react";

interface Position {
  x: number;
  y: number;
}

interface DraggableComponentProps {
  defaultPosition?: Position;
  children?: React.ReactNode;
}

const DraggableComponent: FC<DraggableComponentProps> = ({defaultPosition, children}) => {
  const componentRef = useRef(null);
  const [moving, setMoving] = useState(false);
  const [x, setX] = useState(defaultPosition?.x ?? 0);
  const [y, setY] = useState(defaultPosition?.y ?? 0);

  const mouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (moving && componentRef.current) {
      const element = componentRef.current as HTMLDivElement;
      setX(element.offsetLeft + event.movementX);
      setY(element.offsetTop + event.movementY)
    }
  }, [moving]);

  const mouseDown = () => setMoving(true);
  const mouseUp = () => setMoving(false);
  const mouseLeave = () => setMoving(false);

  return <div className={'absolute'}
              style={{top: y, left: x, zIndex: moving ? 1000 : 1}}
              ref={componentRef}
              onMouseDown={mouseDown}
              onMouseLeave={mouseLeave}
              onMouseUp={mouseUp}
              onMouseMove={(event) => mouseMove(event)}>
    {children}
  </div>
}

const DragExample: FC = () => {

  const [positionList, setPositionList] = useState<Position[]>([]);

  const add = () => {
    setPositionList([...positionList, {
      x: 12,
      y: positionList.length * 60,
    }]);
  }

  return <div className={'w-full h-full p-3 relative select-none'}>
    <div>
      <button className={'p-3 bg-blue-300'} onClick={add}>add</button>
    </div>
    <div className={'relative'}>
      {positionList.map((position, index) => (<DraggableComponent defaultPosition={position} key={index}>
        <div className={'p-4 bg-gray-300'}>item {index}</div>
      </DraggableComponent>))}
    </div>
  </div>
}

export default DragExample;