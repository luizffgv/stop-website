import { act, render, screen } from "@testing-library/react";
import unimplemented from "@/lib/unimplemented";
import { CurrentScreenContext } from "../_contexts/current-screen";
import EditNickname from "./edit-nickname";
import {
  CreationParametersContext,
  CreationParametersContextDefaultValue,
} from "../_contexts/creation-parameters";

describe("EditNickname", () => {
  it("Changes screen to the correct value on button click", () => {
    const nextScreen = jest.fn();

    act(() =>
      render(
        <CreationParametersContext.Provider
          value={{
            ...CreationParametersContextDefaultValue,
            nickname: "nickname",
            setNickname: () => {},
          }}
        >
          <CurrentScreenContext.Provider
            value={{
              screen: "letters",
              setScreen: unimplemented,
              nextScreen,
            }}
          >
            <EditNickname />
          </CurrentScreenContext.Provider>
        </CreationParametersContext.Provider>,
      ),
    );

    nextScreen.mockClear();
    act(() => screen.getByText("Continuar").click());
    expect(nextScreen).toHaveBeenCalledTimes(1);
  });
});
