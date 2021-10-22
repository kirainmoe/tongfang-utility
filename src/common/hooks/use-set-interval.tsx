import { useEffect, useRef } from 'react';

export default function useSetInterval(
  callback: (...args: any[]) => void,
  interval: number
) {
  const savedCallback = useRef<(...args: any[]) => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!savedCallback.current) {
      return;
    }

    const timer = setInterval(savedCallback.current, interval);
    savedCallback.current();

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [savedCallback, interval]);
}
