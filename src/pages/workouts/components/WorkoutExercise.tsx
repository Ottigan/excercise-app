import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Exercise, WorkoutExercise } from '@prisma/client';
import Button from 'components/Button';
import Input from 'components/Input';
import Select from 'components/Select';
import { ChangeEvent, useCallback } from 'react';
import { Option } from 'types';

interface ExerciseProps {
  order: number;
  workoutExercise: WorkoutExercise;
  exercises: Exercise[];
  exercisesList: Option[];
  handleUpdate: (id: string, exercise: WorkoutExercise) => void;
  handleRemove? :(id: string) => void;
}

const defaultProps = {
  handleRemove: null,
};

function WorkoutExerciseComponent(props: ExerciseProps) {
  const { order, workoutExercise, exercises, exercisesList, handleUpdate, handleRemove } = props;
  const label = `Exercise #${order}`;

  const handleChange = useCallback((e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { target: { name, value } } = e;

    if (name === 'name') {
      const selectedExercise = exercises.find(({ id }) => id === value);

      if (selectedExercise) {
        const { workoutId } = workoutExercise;
        const formattedExercise = {
          id: workoutExercise.id,
          name: selectedExercise.name,
          sets: selectedExercise.sets,
          reps: selectedExercise.reps,
          rest: selectedExercise.rest,
          weight: selectedExercise.weight,
          exerciseId: selectedExercise.id,
          workoutId,
        };

        handleUpdate(workoutExercise.id, formattedExercise);
      }
    } else if (workoutExercise) {
      const numberTypes = Object.keys(workoutExercise).filter((key) => {
        const v = workoutExercise[key as keyof WorkoutExercise];

        return typeof v === 'number';
      });

      const parsedValue = numberTypes.includes(name) ? Number(value) : value;

      handleUpdate(workoutExercise.id, { ...workoutExercise, [name]: parsedValue });
    }
  }, [exercises, handleUpdate, workoutExercise]);

  return (
    <div className="mb-3">
      <div className="flex gap-2 items-end">
        <Select
          onChange={handleChange}
          value={workoutExercise?.exerciseId || ''}
          label={label}
          list={exercisesList}
          name="name"
        />
        { handleRemove && (
          <Button
            onClick={() => handleRemove(workoutExercise.id)}
            icon={faXmark}
            bgColor="bg-red-800"
            className="!text-white"
          />
        )}
      </div>
      {workoutExercise && (
        <div className="flex gap-2">
          <Input
            onChange={handleChange}
            value={workoutExercise?.sets || 0}
            label="Sets"
            name="sets"
            type="number"
            min={0}
            className="w-3/12"
          />
          <Input
            onChange={handleChange}
            value={workoutExercise?.reps || 0}
            label="Reps"
            name="reps"
            type="number"
            min={0}
            className="w-3/12"
          />
          <Input
            onChange={handleChange}
            value={workoutExercise?.rest || 0}
            label="Rest"
            name="rest"
            type="number"
            step="0.1"
            min={0}
            className="w-3/12"
          />
          <Input
            onChange={handleChange}
            value={workoutExercise?.weight || 0}
            label="Weight"
            name="weight"
            type="number"
            step="0.1"
            min={0}
            className="w-3/12"
          />
        </div>
      )}
    </div>
  );
}

WorkoutExerciseComponent.defaultProps = defaultProps;

export default WorkoutExerciseComponent;
