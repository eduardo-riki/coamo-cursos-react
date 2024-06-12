import { useCallback, useRef } from "react";

export const UseDebounce = (delay = 500, notDelayInFirstTime = true) => {
  const firstTime = useRef(notDelayInFirstTime);
  const debouncing = useRef<NodeJS.Timeout>();

  const debounce = useCallback(
    (func: () => void) => {
      if (firstTime.current) {
        firstTime.current = false;
      } else {
        if (debouncing.current) {
          clearTimeout(debouncing.current);
        }

        debouncing.current = setTimeout(() => {
          func();
        }, delay);
      }
    },
    [delay]
  );

  return { debounce };
};
