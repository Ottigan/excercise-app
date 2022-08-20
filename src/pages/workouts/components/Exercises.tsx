interface ExercisesProps {
  value?: string;
}

const defaultProps = {
  value: '',
};

function Exercises(props: ExercisesProps) {
  const { value } = props;

  return (
    <div className="w-full mb-3">
      <label>
        <span className="text-white font-semibold">Exercise</span>
        <select
          value={value}
          name="pets"
          className="h-10 pl-2 w-full rounded-md outline-none text-xl"
        >
          <option value="">---</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="hamster">Hamster</option>
          <option value="parrot">Parrot</option>
          <option value="spider">Spider</option>
          <option value="goldfish">Goldfish</option>
        </select>
      </label>
    </div>
  );
}

Exercises.defaultProps = defaultProps;

export default Exercises;
