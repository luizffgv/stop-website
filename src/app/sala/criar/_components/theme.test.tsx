import { act, render, screen } from "@testing-library/react";
import Theme from "./theme";
import {
  CreationParametersContext,
  CreationParametersContextDefaultValue,
} from "../_contexts/creation-parameters";

describe("Theme", () => {
  it("Displays the theme name", () => {
    act(() => render(<Theme name="Theme A" />));

    expect(screen.getByText("Theme A")).toBeInTheDocument();
  });

  it("Removes the theme on remove button click", () => {
    const removeTheme = jest.fn();

    act(() =>
      render(
        <CreationParametersContext.Provider
          value={{
            ...CreationParametersContextDefaultValue,
            removeTheme,
          }}
        >
          <Theme name="Theme A" />
        </CreationParametersContext.Provider>,
      ),
    );

    act(() => screen.getByLabelText("Remover tema").click());

    expect(removeTheme).toHaveBeenCalledTimes(1);
    expect(removeTheme).toHaveBeenCalledWith("Theme A");
  });
});
