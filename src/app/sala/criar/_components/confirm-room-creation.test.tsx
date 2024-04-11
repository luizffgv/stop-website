import { act, render, screen } from "@testing-library/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import unimplemented from "@/lib/unimplemented";
import { CurrentScreenContext } from "../_contexts/current-screen";
import ConfirmRoomCreation from "./confirm-room-creation";

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: () =>
    ({
      back: unimplemented,
      forward: unimplemented,
      refresh: unimplemented,
      push: unimplemented,
      replace: unimplemented,
      prefetch: unimplemented,
    }) satisfies AppRouterInstance,
}));

describe("ConfirmRoomCreation", () => {
  it("Displays buttons", () => {
    act(() =>
      render(
        <CurrentScreenContext.Provider
          value={{
            screen: "confirm",
            setScreen: unimplemented,
            nextScreen: unimplemented,
          }}
        >
          <ConfirmRoomCreation />
        </CurrentScreenContext.Provider>,
      ),
    );

    expect(document.querySelectorAll("button")).toHaveLength(5);
  });

  it("Changes screen to the correct value on button click", () => {
    const setScreen = jest.fn();
    act(() =>
      render(
        <CurrentScreenContext.Provider
          value={{
            screen: "confirm",
            setScreen,
            nextScreen: unimplemented,
          }}
        >
          <ConfirmRoomCreation />
        </CurrentScreenContext.Provider>,
      ),
    );

    setScreen.mockClear();
    act(() => screen.getByText("Seu apelido").click());
    expect(setScreen).toHaveBeenCalledWith("nickname");

    setScreen.mockClear();
    act(() => screen.getByText("Senha da sala").click());
    expect(setScreen).toHaveBeenCalledWith("password");

    setScreen.mockClear();
    act(() => screen.getByText("Temas").click());
    expect(setScreen).toHaveBeenCalledWith("themes");

    setScreen.mockClear();
    act(() => screen.getByText("Letras").click());
    expect(setScreen).toHaveBeenCalledWith("letters");
  });
});
