import { Button } from 'components/Button';
import { GetServerSideProps } from 'next';
import React, { FormEvent, useCallback, useReducer, useState } from 'react';
import { authOptions, UserWithId } from 'pages/api/auth/[...nextauth].next';
import { Exercise } from '@prisma/client';
import { getServerSession } from 'utils/auth';
import { db } from 'utils/db';
import { formDataTemplate, reducer } from './utils';

interface ExercisesProps {
  exercises: Exercise[];
}

export default function Exercises(props: ExercisesProps) {
  const [exercises, setExercises] = useState(props.exercises);
  const [formData, handleFormData] = useReducer(reducer, formDataTemplate);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      fetch('/api/exercises', {
        method: 'POST',
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data: Exercise[]) => {
          setExercises(data);
          handleFormData({ type: 'clear' });
        })
        .catch((err) => console.error(err));
    },
    [formData],
  );

  return (
    <div>
      <h1>Exercises</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          onChange={({ target: { value, name } }) => handleFormData({ type: name, payload: value })}
          value={formData.name}
          type="text"
          name="name"
        />
        <input
          onChange={({ target: { value, name } }) => handleFormData({ type: name, payload: value })}
          value={formData.description}
          type="text"
          name="description"
        />
        <Button type="submit">Create</Button>
      </form>
      <div>
        {exercises.map(({ id, name, description }) => (
          <span key={id} className="flex text-white">
            <p>{name}</p>
            <p>{description}</p>
          </span>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  const exercises = await db.exercise.findMany({ where: { userId: (session?.user as UserWithId).id } });

  return { props: { exercises } };
};
