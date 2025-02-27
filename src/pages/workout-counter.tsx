import {Step} from "../fitness-types/workout";
import {CountDown} from "../components/count-down.tsx";
import {useEffect, useState} from "react";
import classNames from "classnames";

const steps: Step[] = [
  {type: 'do', time: 30, description: 'cafe'},
  {type: 'rest', time: 50},
  {type: 'do', time: 100, description: 'code'},
  {type: 'do', time: 125, description: 'film'},
  {type: 'rest', time: 30000}
]

function WorkoutCounter() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState<Step | null>();
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

  const onSkip = () => {
    timedOut();
  }

  if (!currentStep) return null;
  return (
    <div className={classNames("w-full h-full flex justify-center items-center text-center transition-all select-none", {
      'bg-neutral-900 text-gray-300': workoutEnded || currentStep.type === 'rest',
      'bg-gray-300 text-neutral-900': !workoutEnded && currentStep.type === 'do',
    })}>
      {workoutEnded ? <section className={'text-5xl'}>ended</section> :
        <>
          <section>
            <span className={'text-5xl'}>{currentStep.description ?? currentStep.type}</span>
            <CountDown time={currentStep.time} timedOut={() => timedOut()}/>
            <button className={'p-5 w-xs rounded-2xl border-2 border-rose-600 text-rose-600 text-xl hover:bg-rose-800 hover:text-gray-300 active:bg-rose-950'}
                    onClick={onSkip}
            >skip</button>
          </section>
        </>}
    </div>
  )
}

export default WorkoutCounter
