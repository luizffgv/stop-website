import { act, render, screen } from "@testing-library/react";
import unimplemented from "@/lib/unimplemented";
import { CurrentScreenContext } from "../_contexts/current-screen";
import EditLetters from "./edit-letters";
import {
  CreationParametersContext,
  CreationParametersContextDefaultValue,
} from "../_contexts/creation-parameters";
import { Letter } from "@/lib/letters";

describe("EditLetters", () => {
  it("Changes screen to the correct value on button click", () => {
    const nextScreen = jest.fn();

    act(() =>
      render(
        <CreationParametersContext.Provider
          value={{
            ...CreationParametersContextDefaultValue,
            letters: new Set(["A", "B", "C"]),
            setLetters: () => {},
          }}
        >
          <CurrentScreenContext.Provider
            value={{
              screen: "letters",
              setScreen: unimplemented,
              nextScreen,
            }}
          >
            <EditLetters />
          </CurrentScreenContext.Provider>
        </CreationParametersContext.Provider>,
      ),
    );

    nextScreen.mockClear();
    act(() => screen.getByText("Continuar").click());
    expect(nextScreen).toHaveBeenCalledTimes(1);
  });

  it("Sets letters on confirm", () => {
    const creationContextValue = {
      ...CreationParametersContextDefaultValue,
      letters: new Set<Letter>(),
      setLetters: (letters: Set<Letter>) => {
        creationContextValue.letters = letters;
      },
    };

    act(() =>
      render(
        <CreationParametersContext.Provider value={creationContextValue}>
          <CurrentScreenContext.Provider
            value={{
              screen: "letters",
              setScreen: unimplemented,
              nextScreen: () => {},
            }}
          >
            <EditLetters />
          </CurrentScreenContext.Provider>
        </CreationParametersContext.Provider>,
      ),
    );

    act(() => screen.getByText("A").click());
    act(() => screen.getByText("B").click());
    act(() => screen.getByText("B").click());
    act(() => screen.getByText("C").click());
    act(() => screen.getByText("Continuar").click());

    expect(creationContextValue.letters.size).toBe(2);
    expect(creationContextValue.letters.has("A")).toBe(true);
    expect(creationContextValue.letters.has("C")).toBe(true);
  });
});
