import { FormEvent, ReactNode } from "react";

/** Properties for the {@link SilentForm} component. */
export interface SilentFormProperties {
  /** Function to be called on form submit. */
  onSubmit?: ((event: FormEvent) => void) | undefined;
  /** ClassName for the form, `"contents"` by default. */
  className?: string | undefined;
  children?: ReactNode | undefined;
}

/**
 * A form that does no requests on submit, just calls a function.
 *
 * This component has `display: contents` and no other styling.
 * @param properties - Properties of the form.
 * @returns The form component.
 */
export default function SilentForm(properties: SilentFormProperties) {
  return (
    <form
      className={properties.className ?? "contents"}
      onSubmit={(event) => {
        event.preventDefault();
        properties.onSubmit?.(event);
      }}
    >
      {properties.children}
    </form>
  );
}
