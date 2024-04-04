import { HTMLInputTypeAttribute, ReactNode } from "react";

export interface TextInputProperties {
  /** Current value of the input. */
  value?: string | undefined;
  /** Type of the input. */
  type?: HTMLInputTypeAttribute | undefined;
  /** Callback when the value changes. */
  onChange: (value: string) => void;
  /** Label for the input. */
  children: ReactNode;
}

/**
 * A text input box component.
 * @param properties - Properties of the component.
 * @returns The text input component.
 */
export default function TextInput(properties: TextInputProperties) {
  return (
    <label className="flex flex-col items-center gap-2">
      <div>{properties.children}</div>
      <input
        className="rounded-md bg-blue-800 px-2 py-1 leading-none text-blue-50 outline outline-[3px] outline-blue-700"
        type={properties.type ?? "text"}
        value={properties.value}
        onChange={(event) => properties.onChange(event.target.value)}
      />
    </label>
  );
}
