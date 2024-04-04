import Link from "next/link";
import { ReactNode } from "react";

export type ButtonProperties = {
  children: ReactNode;
  /** The function to call on click. */
  onClick?: (() => void) | undefined;
  /** The URL to navigate to on click. */
  href?: string | undefined;
  /** Whether the button is disabled. */
  disabled?: boolean | undefined;
  /** Whether the button should be unstyled. */
  unstyled?: boolean | undefined;
  /** Whether the button should have `type="submit"`. */
  submit?: boolean | undefined;
  /** The `aria-label` attribute of the button. */
  "aria-label"?: string | undefined;
} & (
  | { onClick: () => void; href?: undefined }
  | { onClick?: undefined; href: string; submit?: undefined }
  | { href?: undefined; submit: true }
);

/**
 * A button that can either navigate to a URL or call a function on click.
 * @param properties - Properties of the button.
 * @returns The button component.
 */
export default function Button(properties: ButtonProperties) {
  const className = properties.unstyled
    ? "flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
    : "flex items-center gap-1 justify-center bg-blue-500 text-blue-50 px-4 py-2 rounded-xl leading-none disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed glow disabled:glow-none";

  return (
    <>
      {properties.disabled || properties.href == undefined ? (
        <button
          className={className}
          type={properties.submit ? "submit" : "button"}
          onClick={properties.onClick}
          disabled={properties.disabled}
          aria-label={properties["aria-label"]}
        >
          {properties.children}
        </button>
      ) : (
        <Link
          className={className}
          href={properties.href}
          aria-label={properties["aria-label"]}
        >
          {properties.children}
        </Link>
      )}
    </>
  );
}
