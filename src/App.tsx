import './App.css'
import {Step} from "./fitness-types/workout";
import {CountDown} from "./components/count-down.tsx";
import {useState} from "react";

const steps: Step[] = [
  {type: 'do', time: 5},
  {type: 'rest', time: 6},
]

function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [workoutEnded, setWorkoutEnded] = useState(false);
  const timedOut = () => {
    if (steps[currentStepIndex+1]) setCurrentStepIndex(currentStepIndex + 1);
    else setWorkoutEnded(true);
  }

  if (workoutEnded) return 'ended'
  return (
    <>
      {steps[currentStepIndex].type}
      <CountDown time={steps[currentStepIndex].time} timedOut={() => timedOut()} />
    </>
  )
}

export default App
