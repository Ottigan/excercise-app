import { useCallback, useState } from 'react';

interface UseFetchOptions {
  url: RequestInfo | URL,
  options: RequestInit
  onSucess?: () => void
}

interface Controller<T> {
  isLoading: boolean,
  data: T | null,
  exec: (options: UseFetchOptions) => void,
}

const useFetch = <T>(): Controller<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const exec = useCallback(async ({ url, options, onSucess }: UseFetchOptions) => {
    setIsLoading(true);

    const controller = new AbortController();
    const { signal } = controller;

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

  return { isLoading, data, exec };
};

export default useFetch;
