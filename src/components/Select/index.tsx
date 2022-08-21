import { Option } from 'types';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value: string;
  list: Option[];
  label?: string;
}

const defaultProps = {
  label: '',
};

function Select(props: SelectProps) {
  const { onChange, value, label, list, name } = props;

  return (
    <label className="w-full">
      <span className="text-white font-semibold">{label}</span>
      <select
        onChange={onChange}
        value={value}
        name={name}
        className="h-8 pl-2 w-full rounded-md outline-none"
      >
        <option value="">--Select Value--</option>
        {list.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
      </select>
    </label>
  );
}

Select.defaultProps = defaultProps;

export default Select;
