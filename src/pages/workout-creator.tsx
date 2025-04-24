import {FC, useEffect, useRef, useState} from "react";
import {Step} from "../fitness-types/workout";
import {toHour, toMinute, toSecond} from "../utlis/number-utils.ts";
import {createSwapy, Swapy} from "swapy";

interface IStepCreatorProps {
  defaultStep: StepWithID;
  onDelete: () => void;
  onSave: (v: StepWithID) => void;
}

const StepCreator: FC<IStepCreatorProps> = ({defaultStep, onDelete, onSave}) => {
  const [type, setType] = useState(defaultStep.type);
  const [second, setSecond] = useState(toSecond(defaultStep.time));
  const [minute, setMinute] = useState(toMinute(defaultStep.time));
  const [hour, setHour] = useState(toHour(defaultStep.time));
  const [description, setDescription] = useState(defaultStep.description);

  const save = () => {
    const time = ((hour * 3600) + (minute * 60) + second);
    onSave({
      id: defaultStep.id,
      time: time,
      description: description,
      type: type
    })
  }

  const changed = type != defaultStep.type || hour != toHour(defaultStep.time) || minute != toMinute(defaultStep.time) || second != toSecond(defaultStep.time) || description !== defaultStep.description;

  return <div className={'flex flex-row gap-1 items-center my-1 border select-none'}>
    <div>
      <select className={'bg-blue-300 p-2 rounded'}
              value={type === 'do' ? 'do' : 'rest'}
              onChange={(v) => setType(v.target.value as 'do' | 'rest')}>
        <option value="do">do</option>
        <option value="rest">rest</option>
      </select>
      <div>
        <select name="hour" id="slc-hour" onChange={v => setHour(Number(v.target.value))}>
          {[...Array(10).keys()].map((_, i) => <option key={i} value={i}>{i}</option>)}
        </select>
        <select name="minute" id="slc-minute" onChange={v => setMinute(Number(v.target.value))}>
          {[...Array(61).keys()].map((_, i) => <option key={i} value={i}>{i}</option>)}
        </select>
        <select name="second" id="slc-second" onChange={v => setSecond(Number(v.target.value))}>
          {[...Array(61).keys()].map((_, i) => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>
      <div>
        <input type="text" value={description} placeholder={'description'}
               onChange={v => setDescription(v.target.value)}/>
      </div>
      <div></div>
    </div>
    <div>
      <button className={'px-4 py-1 border'} onClick={onDelete}>-</button>
    </div>
    {changed && <div>
        <button className={'px-4 py-1 border'} onClick={save}>save</button>
    </div>}
  </div>
}

interface StepWithID extends Step {
  id: string;
}

const WorkoutCreator = () => {
  const swapy = useRef<Swapy>(null);
  const container = useRef(null);
  const [currentSteps, setCurrentSteps] = useState<StepWithID[]>([]);
  const stepIDs = useRef<string[]>([]);

  useEffect(() => {
    if (container.current) {
      swapy.current = createSwapy(container.current);
      swapy.current.onSwap((event) => {
        console.log(`${event.fromSlot} ==> ${event.toSlot}`);
        stepIDs.current = stepIDs.current.map(id => {
          if (id === event.toSlot) return event.fromSlot;
          if (id === event.fromSlot) return event.toSlot;
          return id;
        });
        console.log(stepIDs.current)
      })
    }
    return () => {
      swapy.current?.destroy()
    }
  }, []);

  useEffect(() => {
    if (swapy.current) swapy.current.update();
  }, [currentSteps]);


  const createStep = () => {
    const id = crypto.randomUUID();
    stepIDs.current = [...stepIDs.current, id];
    setCurrentSteps([...currentSteps, {type: "do", time: 0, description: '', id: id}]);
  }

  const onDelete = (id: string) => {
    setCurrentSteps(currentSteps.filter((step) => step.id !== id));
  }

  const onSave = (v: StepWithID) => {
    setCurrentSteps(currentSteps.map(step => {
      if (step.id === v.id) {
        return v;
      }
      return step;
    }))
  }

  const check = () => {
    console.log(stepIDs.current)
  }

  return <section className={'p-3'}>
    <div className={'mt-4 flex gap-1'}>
      <button className={'px-4 py-1 border'} onClick={createStep}>+</button>
      <button className={'px-4 py-1 border'} onClick={check}>check</button>
    </div>

    <div ref={container}>
      {currentSteps.map((step: StepWithID) => (
        <div key={step.id} data-swapy-slot={step.id}>
          <div data-swapy-item={step.id}>
            {step.id}
            <StepCreator defaultStep={step}
                         onDelete={() => onDelete(step.id)}
                         onSave={onSave}/>
          </div>
        </div>
      ))}
    </div>
  </section>
}

export default WorkoutCreator;