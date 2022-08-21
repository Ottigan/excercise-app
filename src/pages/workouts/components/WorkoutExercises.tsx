import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Exercise, WorkoutExercise } from '@prisma/client';
import Button from 'components/Button';
import Loader from 'components/Loader';
import useFetch from 'hooks/useFetch';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Option } from 'types';
import { getTemplate } from '../utils';
import ExerciseComponent from './WorkoutExercise';

interface WorkoutExercisesProps {
  exercises: WorkoutExercise[];
  onChange: (exercises: WorkoutExercise[]) => void;
}

function WorkoutExercises({ exercises, onChange }: WorkoutExercisesProps) {
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>(exercises);
  const exerciseController = useFetch<Exercise[]>({ url: '/api/exercises' });
  const exercisesList: Option[] = useMemo(() => {
    if (exerciseController.data) {
      return exerciseController.data.map(({ id, name }) => ({ id, name }));
    }

    return [];
  }, [exerciseController.data]);

  const handleAdd = useCallback(() => {
    setWorkoutExercises([...workoutExercises, getTemplate()]);
  }, [workoutExercises]);

  const handleUpdate = useCallback((id: string, currExercise: WorkoutExercise) => {
    setWorkoutExercises((prevExercises) => {
      const newExercises = prevExercises.map((prevExercise) => {
        if (prevExercise.id === id) {
          const updatedExercise = { ...currExercise, id };

          return updatedExercise;
        }

        return prevExercise;
      });

      return newExercises;
    });
  }, []);

  const handleRemove = useCallback((id: string) => {
    setWorkoutExercises([...workoutExercises.filter(({ id: exerciseId }) => exerciseId !== id)]);
  }, [workoutExercises]);

  useEffect(() => {
    const validExercises = workoutExercises.filter(({ exerciseId }) => exerciseId);

    onChange(validExercises);
  }, [onChange, workoutExercises]);

  if (exerciseController.isLoading) return <Loader isLoading />;

  return (
    <div className="w-full my-3">
      <ExerciseComponent
        key={workoutExercises[0].id}
        order={1}
        workoutExercise={workoutExercises[0]}
        exercises={exerciseController.data || []}
        exercisesList={exercisesList}
        handleUpdate={handleUpdate}
      />
      {workoutExercises.slice(1).map((exercise, i) => {
        const exercisesData = exerciseController.data || [];

        return (
          <ExerciseComponent
            key={exercise.id}
            order={i + 2}
            workoutExercise={exercise}
            exercises={exercisesData}
            exercisesList={exercisesList}
            handleUpdate={handleUpdate}
            handleRemove={handleRemove}
          />
        );
      })}
      <Button onClick={handleAdd} icon={faPlus} bgColor="bg-green-800" className="!text-white" />
    </div>
  );
}

export default WorkoutExercises;
