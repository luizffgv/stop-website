"use client";

import { ReactNode, useState } from "react";
import { CreationParametersContext } from "./_contexts/creation-parameters";
import { Letter } from "@/lib/letters";
import { CurrentScreenContext, Screen } from "./_contexts/current-screen";

/**
 * The layout for the room creation pages.
 * @param properties - Properties of the layout.
 * @param properties.children - The children of the layout.
 * @returns The layout.
 */
export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [nickname, setNickname] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [letters, setLetters] = useState<Set<Letter>>();
  const [themes, setThemes] = useState<Set<string>>();

  const [screen, setScreen] = useState<Screen>("nickname");

  return (
    <CreationParametersContext.Provider
      value={{
        nickname,
        password,
        letters,
        themes,
        setNickname,
        setPassword,
        setLetter: (letter, present) => {
          if (present) setLetters(new Set([...(letters ?? []), letter]));
          else {
            letters?.delete(letter);
            setLetters(new Set(letters));
          }
        },
        setLetters,
        addTheme: (category) => {
          setThemes(new Set([...(themes ?? []), category]));
        },

        removeTheme: (category) => {
          themes?.delete(category);
          setThemes(new Set(themes));
        },
        setThemes,
      }}
    >
      <CurrentScreenContext.Provider
        value={{
          screen,
          setScreen,
          nextScreen: () => {
            if (screen !== "nickname" && nickname == undefined)
              setScreen("nickname");
            else if (screen !== "themes" && themes == undefined)
              setScreen("themes");
            else if (screen !== "letters" && letters == undefined)
              setScreen("letters");
            else if (screen !== "password" && password == undefined)
              setScreen("password");
            else setScreen("confirm");
          },
        }}
      >
        {children}
      </CurrentScreenContext.Provider>
    </CreationParametersContext.Provider>
  );
}
