import { useRef, useEffect, useCallback } from 'react';
import { throttle } from 'lodash';

export const useThrottle = <T extends (...args: unknown[]) => void>(cb: T, delayDuration: number) => {
  const options = { leading: true, trailing: false };

  const cbRef = useRef<T>(cb); // ✅ cbRef is a ref to the function

  useEffect(() => {
    cbRef.current = cb;
  });

  return useCallback(
    throttle((...args: Parameters<T>) => cbRef.current(...args), delayDuration, options),
    [delayDuration]
  );
};
