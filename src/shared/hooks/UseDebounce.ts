import { useCallback, useRef } from "react";

export const UseDebounce = (delay = 300, notDelayInFirstTime = true) => {
  const debouncing = useRef<NodeJS.Timeout>();
  const firstTime = useRef(notDelayInFirstTime);

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
