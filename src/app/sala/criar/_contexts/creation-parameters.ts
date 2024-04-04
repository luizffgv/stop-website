import { Letter } from "@/lib/letters";
import unimplemented from "@/lib/unimplemented";
import { createContext } from "react";

/** Context type for parameters for creating a room. */
export interface CreationParametersContext {
  /** Nickname of the player creating the room. */
  readonly nickname?: string | undefined;
  /** Password to join the room. */
  readonly password?: string | undefined;
  /** Letters available in the room. */
  readonly letters?: ReadonlySet<Letter> | undefined;
  /** Themes to answer in the room. */
  readonly themes?: ReadonlySet<string> | undefined;

  /** Sets the nickname of the player creating the room. */
  setNickname(nickname: string): void;

  /**
   * Sets the password to join the room.
   * @param password New password to set.
   */
  setPassword(password: string): void;

  /**
   * Sets the presence of a letter in the room.
   * @param letter Letter to set.
   * @param present Whether the letter should be present in the room.
   */
  setLetter(letter: Letter, present: boolean): void;

  /**
   * Sets the letters available in the room.
   * @param letters Set of available letters.
   */
  setLetters(letters: Set<Letter>): void;

  /**
   * Adds a theme to the room.
   * @param theme Theme to add.
   */
  addTheme(theme: string): void;

  /**
   * Removes a theme from the room.
   * @param theme Theme to remove.
   */
  removeTheme(theme: string): void;

  /**
   * Sets the themes in the room.
   * @param themes Themes to set.
   */
  setThemes(themes: Set<string>): void;
}

/** Context for parameters for creating a room. */
export const CreationParametersContext =
  createContext<CreationParametersContext>({
    setNickname: unimplemented,
    setPassword: unimplemented,
    setLetter: unimplemented,
    setLetters: unimplemented,
    addTheme: unimplemented,
    removeTheme: unimplemented,
    setThemes: unimplemented,
  });
