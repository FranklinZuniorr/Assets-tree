let debounceTimer: number = 0;
export const debounce = (fn: () => void, time?: number): void => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    fn();
  }, time || 500);
};