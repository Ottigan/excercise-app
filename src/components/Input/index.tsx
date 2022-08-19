import React from 'react';
import cn from 'classnames';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  label?: string;
  autoComplete?: string,
}

const defaultProps = {
  type: 'text',
  label: '',
  autoComplete: 'new-password',
};

function Input(props: InputProps) {
  const { className, label, ...rest } = props;

  return (
    <label className={cn('w-full text', className)}>
      {label && <span className="text-white font-semibold">{label}</span>}
      <input className={cn('h-12 p-2 w-full rounded-md outline-none text-2xl')} {...rest} />
    </label>
  );
}

Input.defaultProps = defaultProps;

export default Input;
