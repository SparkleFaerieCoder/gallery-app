import { useState, useCallback } from 'react';

export type useToggleStateReturnType = {
  isEnabled: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
};

export const useToggleState = (initialValue = false): useToggleStateReturnType => {
  const [isEnabled, setIsEnabled] = useState(initialValue);
  const show = useCallback(() => setIsEnabled(true), []);
  const hide = useCallback(() => setIsEnabled(false), []);

  const toggle = useCallback(() => setIsEnabled((currentValue) => !currentValue), []);

  return {
    isEnabled: isEnabled,
    show,
    hide,
    toggle,
  };
};

export default useToggleState;
