import { useEffect, useState } from 'react';

export default (value: string, delay: number) => {
  const [debounced, setDebounced] = useState<string>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debounced;
};
