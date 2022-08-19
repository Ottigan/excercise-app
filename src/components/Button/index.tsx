import React from 'react';
import cn from 'classnames';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconDefinition;
  type?: 'submit' | 'reset' | 'button' | undefined
}

const defaultProps = {
  icon: null,
  type: 'button',
};

function Button(props: ButtonProps) {
  const { children, className, icon, type, ...rest } = props;

  return (
    <button
      className={cn('border-2 rounded-md px-3 bg-white text-black text-lg font-medium', icon ? 'h-8 w-8' : 'h-10', className, styles.button)}
      {...rest}
    >
      {icon
        ? <FontAwesomeIcon icon={icon} size="xs" />
        : children}
    </button>
  );
}

Button.defaultProps = defaultProps;

export default Button;
