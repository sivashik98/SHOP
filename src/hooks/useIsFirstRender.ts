import { useRef } from 'react';

export default () => {
  const ref = useRef<boolean>(true);
  const isFirstRender = ref.current;
  ref.current = false;
  return isFirstRender;
};
