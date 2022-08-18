import React from 'react';

interface ModalProps {
  text: string;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { text } = props;

  return <h1>{text}</h1>;
};

export default Modal;
