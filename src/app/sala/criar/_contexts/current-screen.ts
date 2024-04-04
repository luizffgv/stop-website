import { createContext } from "react";
import unimplemented from "@/lib/unimplemented";

export type Screen = "nickname" | "password" | "letters" | "themes" | "confirm";

/** Context type for the current screen that the user is filling.  */
export interface CurrentScreenContext {
  /** Current screen that the user is filling. */
  readonly screen: Screen;

  /**
   * Sets the current screen that the user is filling.
   * @param screen Screen to set.
   */
  setScreen(screen: Screen): void;

  /**
   * Sets {@link screen} to a screen that the user hasn't yet filled, then
   * settles on the `confirm` screen.
   */
  nextScreen(): void;
}

/** Context type for the current screen that the user is filling. */
export const CurrentScreenContext = createContext<CurrentScreenContext>({
  screen: "nickname",
  setScreen: unimplemented,
  nextScreen: unimplemented,
});
