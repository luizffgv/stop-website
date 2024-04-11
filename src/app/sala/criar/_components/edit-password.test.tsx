import { act, render, screen } from "@testing-library/react";
import unimplemented from "@/lib/unimplemented";
import { CurrentScreenContext } from "../_contexts/current-screen";
import EditPassword from "./edit-password";
import {
  CreationParametersContext,
  CreationParametersContextDefaultValue,
} from "../_contexts/creation-parameters";
import userEvent from "@testing-library/user-event";

describe("EditPassword", () => {
  it("Changes screen to the correct value on button click", async () => {
    const nextScreen = jest.fn();

    act(() =>
      render(
        <CreationParametersContext.Provider
          value={{
            ...CreationParametersContextDefaultValue,
            password: "",
            setPassword: () => {},
          }}
        >
          <CurrentScreenContext.Provider
            value={{
              screen: "password",
              setScreen: unimplemented,
              nextScreen,
            }}
          >
            <EditPassword />
          </CurrentScreenContext.Provider>
        </CreationParametersContext.Provider>,
      ),
    );

    const user = userEvent.setup();
    const inputBox = document.querySelector("input[type='password']");
    expect(inputBox).toBeInTheDocument();
    await user.type(inputBox!, "password");

    nextScreen.mockClear();
    act(() => screen.getByText("Continuar").click());
    expect(nextScreen).toHaveBeenCalledTimes(1);
  });
});
