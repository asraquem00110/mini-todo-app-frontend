import { useRef, useEffect, useCallback } from 'react';
import { throttle } from 'lodash';

export const useThrottle = <T extends (...args: unknown[]) => unknown>(cb: T, delayDuration: number) => {
  const options = { leading: true, trailing: false }; // add custom lodash options
  const cbRef = useRef<T>(cb);

  // use mutable ref to make useCallback/throttle not depend on `cb` dep
  useEffect(() => {
    cbRef.current = cb;
  });
  return useCallback(
    throttle((...args: Parameters<T>) => cbRef.current(...args), delayDuration, options),
    [delayDuration]
  );
};
