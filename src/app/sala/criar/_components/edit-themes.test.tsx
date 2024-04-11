import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import EditThemes from "./edit-themes";
import {
  CreationParametersContext,
  CreationParametersContextDefaultValue,
} from "../_contexts/creation-parameters";
import { CurrentScreenContext } from "../_contexts/current-screen";
import unimplemented from "@/lib/unimplemented";
import userEvent from "@testing-library/user-event";

describe("EditThemes", () => {
  it("Displays themes", () => {
    act(() =>
      render(
        <CreationParametersContext.Provider
          value={{
            ...CreationParametersContextDefaultValue,
            themes: new Set(["Theme A", "Theme B", "Theme C"]),
          }}
        >
          <EditThemes />
        </CreationParametersContext.Provider>,
      ),
    );

    expect(screen.getByText("Theme A")).toBeInTheDocument();
    expect(screen.getByText("Theme B")).toBeInTheDocument();
    expect(screen.getByText("Theme C")).toBeInTheDocument();
  });

  it("Changes screen to the correct value on button click", () => {
    const nextScreen = jest.fn();

    act(() =>
      render(
        <CreationParametersContext.Provider
          value={{
            ...CreationParametersContextDefaultValue,
            themes: new Set<string>(["Theme A", "Theme B", "Theme C"]),
            setThemes: () => {},
          }}
        >
          <CurrentScreenContext.Provider
            value={{
              screen: "themes",
              setScreen: unimplemented,
              nextScreen,
            }}
          >
            <EditThemes />
          </CurrentScreenContext.Provider>
        </CreationParametersContext.Provider>,
      ),
    );

    nextScreen.mockClear();
    act(() => screen.getByText("Continuar").click());
    expect(nextScreen).toHaveBeenCalledTimes(1);
  });

  it("Allows themes to be added to draft", async () => {
    act(() =>
      render(
        <CreationParametersContext.Provider
          value={{
            ...CreationParametersContextDefaultValue,
            themes: new Set<string>(),
            setThemes: () => {},
          }}
        >
          <CurrentScreenContext.Provider
            value={{
              screen: "themes",
              setScreen: unimplemented,
              nextScreen: () => {},
            }}
          >
            <EditThemes />
          </CurrentScreenContext.Provider>
        </CreationParametersContext.Provider>,
      ),
    );

    const user = userEvent.setup();
    const input = screen.getByLabelText("Adicione um tema");

    await act(async () => {
      await user.type(input, "Theme A");
    });
    act(() => screen.getByText("Adicionar tema").click());

    await act(async () => {
      await user.type(input, "Theme C");
    });
    act(() => screen.getByText("Adicionar tema").click());

    expect(screen.getByText("Theme A")).toBeInTheDocument();
    expect(screen.getByText("Theme C")).toBeInTheDocument();
  });
});
