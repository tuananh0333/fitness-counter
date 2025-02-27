import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import DragExample from "./pages/drag-example.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DragExample/>
  </StrictMode>,
)
