import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import WorkoutCounter from "./pages/workout-counter.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WorkoutCounter/>
  </StrictMode>,
)
