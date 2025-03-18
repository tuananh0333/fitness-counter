import * as React from "react";
import {FC, useCallback, useRef, useState} from "react";

interface Position {
  x: number;
  y: number;
}

interface DraggableComponentProps {
  index: number;
  defaultPosition?: Position;
  children?: React.ReactNode;
  onSetPosition?: (position: Position, activeIndex: number) => void;
}

const DraggableComponent: FC<DraggableComponentProps> = ({defaultPosition, children, onSetPosition, index}) => {
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
  const mouseUp = () => {
    setMoving(false);
    if (onSetPosition) onSetPosition({
      x: x, y: y
    }, index);
  }
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

  const [positionList, setPositionList] = useState<{ index: number, position: Position }[]>([]);

  const add = () => {
    console.log(positionList);
    setPositionList([...positionList, {
      index: positionList.length,
      position: {
        x: 12,
        y: positionList.length * 60
      },
    }]);
  }

  const onSetPosition = (_position: Position, index: number) => {
    const predictedIndex = 3;
    const newList = [...positionList.slice(0, predictedIndex-1), {
      index: index, position: {
        x: 12, y: (predictedIndex-1) * 60
      }
    }, ...positionList.slice(predictedIndex, positionList.length)];

    console.log(newList)
  }

  return <div className={'w-full h-full p-3 relative select-none'}>
    <div>
      <button className={'p-3 bg-blue-300'} onClick={add}>add</button>
    </div>
    <div className={'relative'}>
      {positionList.map((item, index) => (<DraggableComponent
        key={index}
        index={item.index}
        defaultPosition={item.position}
        onSetPosition={onSetPosition}
      >
        <div className={'p-4 bg-gray-300'}>item {index}</div>
      </DraggableComponent>))}
    </div>
  </div>
}

export default DragExample;