import {FC, useEffect, useRef} from "react";
import {createSwapy, Swapy} from "swapy";

const WrapyExample: FC = () => {
  const swapy = useRef<Swapy>(null)
  const container = useRef(null)

  useEffect(() => {
    // If container element is loaded
    if (container.current) {
      swapy.current = createSwapy(container.current)

      // Your event listeners
      swapy.current.onSwap((event) => {
        console.log('swap', event);
      })
    }

    return () => {
      // Destroy the swapy instance on component destroy
      swapy.current?.destroy()
    }
  }, [])

  return  <div ref={container} className={'flex bg-gray-300'}>

    <div data-swapy-slot="a">
      <div data-swapy-item="a" className={'bg-blue-300'}>
        <div>A</div>
      </div>
    </div>

    <div data-swapy-slot="b">
      <div data-swapy-item="b">
        <div>B</div>
      </div>
    </div>

  </div>
}

export default WrapyExample;