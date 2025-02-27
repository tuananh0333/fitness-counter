import {FC, useEffect, useRef, useState} from "react";
import * as React from "react";

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
  const moving = useRef(false);
  const [x, setX] = useState(defaultPosition?.x ?? 0);
  const [y, setY] = useState(defaultPosition?.y ?? 0);

  useEffect(() => {
    if (componentRef.current) {
      const element = componentRef.current as HTMLDivElement;
      const mouseDown = () => moving.current = true;
      const mouseUp = () => moving.current = false;
      const mouseMove = (event: MouseEvent) => {
        if (moving.current && componentRef.current) {
          const element = componentRef.current as HTMLDivElement;
          setX(element.offsetLeft + event.movementX);
          setY(element.offsetTop + event.movementY)
        }
      }
      const mouseLeave = () => moving.current = false
      element.addEventListener('mousedown', mouseDown);
      element.addEventListener('mouseup', mouseUp);
      element.addEventListener('mouseleave', mouseLeave)
      element.addEventListener('mousemove', mouseMove);
      return () => {
        element.removeEventListener('mousedown', mouseDown, true)
        element.removeEventListener('mouseup', mouseUp, true)
        element.removeEventListener('mouseleave', mouseLeave, true)
        element.removeEventListener('mousemove', mouseMove, true)
      }
    }
  }, []);

  return <div className={'absolute'}
              style={{top: y, left: x, zIndex: moving ? 1000 : 1}}
              ref={componentRef}>
    {children}
  </div>
}

const DragExample: FC = () => {
  const parentRef = useRef(null);
  const [toggle, setToggle] = useState(true)

  return <div className={'w-full h-full p-3 relative select-none'} ref={parentRef} >
    <DraggableComponent defaultPosition={{x: 10, y: 10}}>
      <div className={'p-10 rounded bg-blue-300'}>hello</div>
    </DraggableComponent>
    {toggle && <DraggableComponent defaultPosition={{x: 10, y: 150}}>
        <div className={'p-3'}>kkk</div>
    </DraggableComponent>}

    <button onClick={() => setToggle(!toggle)}>reset</button>
  </div>
}

export default DragExample;