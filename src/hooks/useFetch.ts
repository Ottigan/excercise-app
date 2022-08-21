import { useCallback, useEffect, useState } from 'react';

interface UseFetchOptions {
  url: RequestInfo | URL,
  options?: RequestInit
  onSucess?: () => void
}

interface Controller<T> {
  isLoading: boolean,
  data: T | null,
  exec: (options: UseFetchOptions) => void,
}

const useFetch = <T>(initialOptions?: UseFetchOptions): Controller<T> => {
  const [isInitialExec, setIsInitialExec] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const exec = useCallback(async (execOptions: UseFetchOptions) => {
    setIsLoading(true);

    const controller = new AbortController();
    const { signal } = controller;

    const { url, options = {}, onSucess = () => {} } = execOptions;

    fetch(url, { ...options, signal })
      .then((res) => res.json())
      .then((res: T) => {
        if (onSucess) onSucess();

        setData(res);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (initialOptions && !isInitialExec) {
      setIsInitialExec(true);
      exec(initialOptions);
    }
  }, [exec, initialOptions, isInitialExec]);

  return { isLoading, data, exec };
};

export default useFetch;
