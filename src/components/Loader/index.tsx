import React from 'react';

interface LoaderProps {
    text?: string;
}

const defaultProps = {
  text: 'Loading...',
};

export const Loader: React.FC<LoaderProps> = (props) => {
  const { text } = props;

  return <h1 className="text-white">{text}</h1>;
};

Loader.defaultProps = defaultProps;
