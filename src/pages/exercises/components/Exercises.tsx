import { Exercise } from '@prisma/client';
import Button from 'components/Button';
import React from 'react';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import Table from 'components/Table';

interface ExercisesProps {
  isLoading: boolean,
  exercises: Exercise[];
  handleView: (exercise: Exercise) => void
  handleDelete: (id: string) => void
}

const Exercises: React.FC<ExercisesProps> = (props) => {
  const { isLoading, exercises, handleView, handleDelete } = props;

  return <>
    <Table isLoading={isLoading}>
      <thead>
        <tr>
          <th className='w-4/12'>Name</th>
          <th className='w-6/12'>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {exercises.length
          ? exercises.map((exercise) => {
            const { id, name, description } = exercise;
            return <tr key={id}>
              <td title={name}>{name}</td>
              <td title={description || ''}>{description}</td>
              <td>
                <Button value={name} onClick={() => handleView(exercise)} icon={faEye}/>
                <Button value={name} onClick={() => handleDelete(id)} icon={faTrash}/>
              </td>
            </tr>;
          })
          : <tr><td colSpan={2} style={{ textAlign: 'center' }}>No exercises...</td></tr>}
      </tbody>
    </Table>
  </>;
};

export default Exercises;
