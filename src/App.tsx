import {Step} from "./fitness-types/workout";
import {CountDown} from "./components/count-down.tsx";
import {useEffect, useState} from "react";
import classNames from "classnames";

const steps: Step[] = [
  {type: 'do', time: 60},
  {type: 'rest', time: 5},
  {type: 'do', time: 5},
]

function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState<Step|null>();
  const [workoutEnded, setWorkoutEnded] = useState(false);
  const timedOut = () => {
    // temporary set to reset step timeout
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

  if (!currentStep) return null;
  return (
    <div className={classNames("w-full h-full flex justify-center items-center text-center transition-all", {
      'bg-neutral-900 text-gray-300': workoutEnded || currentStep.type === 'rest',
      'bg-gray-300 text-neutral-900': !workoutEnded && currentStep.type === 'do',
    })}>
      {workoutEnded ? <section className={'text-5xl'}>ended</section> : <section>
        <span className={'text-5xl'} >{currentStep.type}</span>
        <CountDown time={currentStep.time} timedOut={() => timedOut()}/>
      </section>}
    </div>
  )
}

export default App
