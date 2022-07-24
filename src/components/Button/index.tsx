import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  test?: string;
}

export const Button = (props: ButtonProps): React.ReactElement => {
  const { children } = props;

  return (
    <button
      className="h-8 border-2 rounded-md px-3 bg-white text-black font-medium" {...props}>
      {children}
    </button>
  );
};
