import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/**
 * An object that accesses the current value and setter of a {@link useState}
 * state.
 */
export interface ReferenceState<T> {
  /** The current value of the state. */
  get value(): T;
  /** Sets the value of the state. */
  set(value: T): void;
}

/**
 * A hook that wraps {@link useState}. The object returned by this hook can
 * be used in callbacks and in other code that is independent of the render
 * cycle, as it will maintain a reference to the current state and state setter
 * objects.
 *
 * This should be used instead of {@link useState} when the state is accessed
 * from code that is independent of the React render cycle and isn't updated
 * at every render cycle, such as WebSocket callbacks defined in
 * {@link useEffect}.
 *
 * This hook uses {@link useMemo} internally to always return the same object.
 * @param initialState The initial state or a function that returns it.
 * @returns An object containing a reference to the state and a function to
 * update it.
 */
export function useReferenceState<T>(
  initialState: T | (() => T),
): ReferenceState<T> {
  const [state, setState] = useState<T>(initialState);

  const reference = useRef<[T, Dispatch<SetStateAction<T>>]>([state, setState]);
  reference.current = [state, setState];

  return useMemo(
    () => ({
      get value() {
        return reference.current[0];
      },

      set(value: T) {
        reference.current[1](value);
      },
    }),
    [],
  );
}

export default useReferenceState;
