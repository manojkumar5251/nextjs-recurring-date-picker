import { useState } from "react";

interface UseUncontrolledInput<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T, ...payload: any[]) => void;
}

export function useUncontrolled<T>({
  value,
  defaultValue,
  onChange = () => {},
}: UseUncontrolledInput<T>): [
  T,
  (value: T, ...payload: any[]) => void,
  boolean
] {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const handleUncontrolledChange = (val: T, ...payload: any[]) => {
    setUncontrolledValue(val);
    onChange?.(val, ...payload);
  };

  if (value !== undefined) {
    return [value as T, onChange, true];
  }

  return [uncontrolledValue as T, handleUncontrolledChange, false];
}
