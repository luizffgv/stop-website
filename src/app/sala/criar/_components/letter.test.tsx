import { act, render, screen } from "@testing-library/react";
import Letter from "./letter";
import {
  CreationParametersContext,
  CreationParametersContextDefaultValue,
} from "../_contexts/creation-parameters";
import { Letter as LetterType } from "@/lib/letters";

describe("Letter", () => {
  it("Shows the letter", () => {
    act(() =>
      render(
        <CreationParametersContext.Provider
          value={{
            ...CreationParametersContextDefaultValue,
            letters: new Set(["A"]),
          }}
        >
          <Letter letter="A" />
          <Letter letter="B" />
        </CreationParametersContext.Provider>,
      ),
    );

    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("Sets the letter on click", () => {
    const contextValue = {
      ...CreationParametersContextDefaultValue,
      letters: new Set<LetterType>(),
      setLetter: jest.fn(),
    };

    act(() =>
      render(
        <CreationParametersContext.Provider value={contextValue}>
          <Letter letter="A" />
          <Letter letter="B" />
        </CreationParametersContext.Provider>,
      ),
    );

    act(() => screen.getByText("A").click());
    act(() => screen.getByText("B").click());

    expect(contextValue.setLetter).toHaveBeenCalledTimes(2);
    expect(contextValue.setLetter).toHaveBeenNthCalledWith(1, "A", true);
    expect(contextValue.setLetter).toHaveBeenNthCalledWith(2, "B", true);
  });

  it("Unsets the letter on click", () => {
    const contextValue = {
      ...CreationParametersContextDefaultValue,
      letters: new Set<LetterType>(["A", "B"]),
      setLetter: jest.fn(),
    };

    act(() =>
      render(
        <CreationParametersContext.Provider value={contextValue}>
          <Letter letter="A" />
          <Letter letter="B" />
        </CreationParametersContext.Provider>,
      ),
    );

    act(() => screen.getByText("A").click());
    act(() => screen.getByText("B").click());

    expect(contextValue.setLetter).toHaveBeenCalledTimes(2);
    expect(contextValue.setLetter).toHaveBeenNthCalledWith(1, "A", false);
    expect(contextValue.setLetter).toHaveBeenNthCalledWith(2, "B", false);
  });
});
