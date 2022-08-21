import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Button';
import Table from 'components/Table';
import { WorkoutWithExercises } from 'types';

interface ExercisesProps {
  isLoading: boolean,
  workouts: WorkoutWithExercises[];
  handleView: (workout: WorkoutWithExercises) => void
  handleDelete: (id: string) => void
}

function Exercises(props: ExercisesProps) {
  const { isLoading, workouts, handleView, handleDelete } = props;

  return (
    <Table isLoading={isLoading}>
      <thead>
        <tr>
          <th className="w-full">Name</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {workouts.length
          ? workouts.map((workout) => {
            const { id, name } = workout;
            return (
              <tr key={id}>
                <td title={name}>{name}</td>
                <td>
                  <Button value={name} onClick={() => handleView(workout)} icon={faEye} />
                  <Button value={name} onClick={() => handleDelete(id)} icon={faTrash} />
                </td>
              </tr>
            );
          })
          : <tr><td colSpan={2} style={{ textAlign: 'center' }}>No workouts...</td></tr>}
      </tbody>
    </Table>
  );
}

export default Exercises;
