import cn from 'classnames';
import React from 'react';

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
    <label className={cn('w-full', className)}>
      {label && <span className="text-white font-semibold">{label}</span>}
      <input className={cn('h-8 p-2 w-full rounded-md outline-none text-xl')} {...rest} />
    </label>
  );
}

Input.defaultProps = defaultProps;

export default Input;
