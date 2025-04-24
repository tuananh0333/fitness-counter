import {FC, useEffect, useRef, useState} from "react";
import {createSwapy, Swapy} from "swapy";

const DragExample: FC = () => {
  const swapy = useRef<Swapy>(null)
  const container = useRef(null)

  const [list, setList] = useState<number[]>([]);

  const add = () => {
    setList([...list, 0]);
  }

  useEffect(() => {
    if (container.current) {
      swapy.current = createSwapy(container.current)

      // Your event listeners
      swapy.current.onSwap((event) => {
        console.log(`${event.fromSlot} ==> ${event.toSlot}`)
      })
    }

    return () => {
      // Destroy the swapy instance on component destroy
      swapy.current?.destroy()
    }
  }, []);

  useEffect(() => {
    if (swapy.current) swapy.current.update();
  }, [list]);

  return <div className={'w-full h-full p-3 relative select-none'}>
    <div>
      <button className={'p-3 bg-blue-300'} onClick={add}>add</button>
    </div>
    <div className={''} ref={container}>
      {list.map((_item, index) => (<div key={index} data-swapy-slot={index}>
        <div data-swapy-item={index} className={'bg-blue-300 p-3 m-1'}>{index}</div>
      </div>))}
    </div>
  </div>
}

export default DragExample;