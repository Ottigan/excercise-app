/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import cn from 'classnames';
import Button from 'components/Button';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';

interface ModalProps {
  isVisible: boolean;
  visibilityHandler: () => void;
  children: React.ReactNode;
  className?: string;
}

const defaultProps = {
  className: '',
};

function Modal(props: ModalProps) {
  const { isVisible, visibilityHandler, children, className } = props;

  if (!isVisible) return null;

  return (
    <div
      onClick={(e) => e.currentTarget === e.target && visibilityHandler()}
      className={styles.modalComponent}
    >
      <div className={cn(styles.modalComponentContent, className)}>
        <Button className={styles.closeBtn} onClick={visibilityHandler} icon={faXmark} />
        {children}
      </div>
    </div>
  );
}

Modal.defaultProps = defaultProps;

export default Modal;
