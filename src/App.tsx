import {Step} from "./fitness-types/workout";
import {CountDown} from "./components/count-down.tsx";
import {useEffect, useState} from "react";

const steps: Step[] = [
  {type: 'do', time: 5},
  {type: 'rest', time: 5},
  {type: 'do', time: 5},
]

function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState<Step>();
  const [workoutEnded, setWorkoutEnded] = useState(false);
  const timedOut = () => {
    setCurrentStep({
      type: 'do',
      time: 0
    })
    if (steps[currentStepIndex + 1]) setCurrentStepIndex(currentStepIndex + 1);
    else setWorkoutEnded(true);
  }
  useEffect(() => {
    setCurrentStep(steps[currentStepIndex]);
  }, [currentStepIndex]);

  return (
    <div className={"w-full h-full flex justify-center items-center text-center "}>
      {workoutEnded || !currentStep ? <section>ended</section> : <section>
        {currentStep.type}
        <CountDown time={currentStep.time} timedOut={() => timedOut()}/>
      </section>}
    </div>
  )
}

export default App
