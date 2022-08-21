import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import React from 'react';
import styles from './styles.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'submit' | 'reset' | 'button' | undefined,
  bgColor?: string;
  icon?: IconDefinition,
  size?: SizeProp
}

const defaultProps = {
  type: 'button',
  bgColor: 'bg-white',
  icon: null,
  size: null,
};

function Button(props: ButtonProps) {
  const { children, className, bgColor, icon, size, type, ...rest } = props;

  return (
    <button
      type={type}
      className={cn('border-2 rounded-md px-3 text-black text-lg font-medium', icon ? 'h-8 w-8' : 'h-8', bgColor, className, styles.button)}
      {...rest}
    >
      {icon
        ? <FontAwesomeIcon icon={icon} size={size} />
        : children}
    </button>
  );
}

Button.defaultProps = defaultProps;

export default Button;
