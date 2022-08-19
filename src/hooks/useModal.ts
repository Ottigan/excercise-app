import { useCallback, useState } from 'react';

const useModal = (): [boolean, () => void] => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  return [isVisible, toggleVisibility];
};

export default useModal;
