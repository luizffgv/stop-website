import { act } from "react-dom/test-utils";
import { render, screen } from "@testing-library/react";
import SilentForm from "./silent-form";

describe("SilentForm", () => {
  it("Renders a <form>", () => {
    act(() => render(<SilentForm />));

    const form = document.querySelector("form");
    expect(form).toBeInTheDocument();
  });

  it("Renders children", () => {
    act(() =>
      render(
        <SilentForm>
          <div id="child"></div>
        </SilentForm>,
      ),
    );

    const child = document.querySelector("#child");
    expect(child).toBeInTheDocument();
  });

  it("Applies className", () => {
    act(() => render(<SilentForm className="class"></SilentForm>));

    const form = document.querySelector("form");
    expect(form).toBeInTheDocument();
    expect(form).toHaveClass("class");
  });

  it("Calls onSubmit", () => {
    const onSubmit = jest.fn();

    act(() =>
      render(
        <SilentForm onSubmit={onSubmit}>
          <button>Submit</button>
        </SilentForm>,
      ),
    );

    const button = screen.queryByRole("button");
    expect(button).toBeInTheDocument();

    for (let click = 0; click < 5; click++) button!.click();

    expect(onSubmit).toHaveBeenCalledTimes(5);
  });
});
