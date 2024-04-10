import { act } from "react-dom/test-utils";
import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import TextInput from "./text-input";

describe("TextInput", () => {
  it("Renders a textbox", () => {
    act(() => render(<TextInput onChange={() => {}}>Label</TextInput>));

    const input = screen.queryByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("Renders a correctly-applied label", () => {
    act(() => render(<TextInput onChange={() => {}}>Label</TextInput>));

    const input = screen.getByLabelText("Label");
    expect(input).toBeInTheDocument();
  });

  it("Calls onChange", async () => {
    const onChange = jest.fn();

    act(() => render(<TextInput onChange={onChange}>Label</TextInput>));

    const input = (() => {
      const input = screen.getByLabelText("Label");
      expect(input).toBeInTheDocument();
      expect(input).toBeInstanceOf(HTMLInputElement);
      return input as HTMLInputElement;
    })();

    const testString = "Test";

    const user = UserEvent.setup();
    await user.click(input);
    await user.type(input, testString);

    expect(onChange).toHaveBeenCalledTimes(testString.length);
  });

  it("Forwards the type property", () => {
    act(() =>
      render(
        <TextInput type="password" onChange={() => {}}>
          Label
        </TextInput>,
      ),
    );

    const input = screen.getByLabelText("Label");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "password");
  });

  it("Has the provided value", () => {
    const testValue = "Test";

    act(() =>
      render(
        <TextInput value={testValue} onChange={() => {}}>
          Label
        </TextInput>,
      ),
    );

    const input = screen.getByLabelText("Label");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(testValue);
  });
});
