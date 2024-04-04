import { ReactNode } from "react";

export interface LoadingProperties {
  children: ReactNode;
}

/**
 * Displays a loading screen with a message.
 * @param properties - Properties of the component.
 * @param properties.children - Message to display in the loading screen.
 * @returns The loading component.
 */
export default function Loading({ children }: LoadingProperties) {
  return (
    <>
      <div>{children}</div>
      <svg
        viewBox="0 0 1 1"
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24 animate-spin stroke-blue-500"
      >
        <circle
          cx="0.5"
          cy="0.5"
          fill="none"
          r="0.25"
          strokeWidth="0.1"
          strokeDasharray="1"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
}
