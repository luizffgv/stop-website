import { act, screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import Button from "./button";

describe("Button", () => {
  it("Shows contents", () => {
    act(() =>
      render(
        <>
          <Button onClick={() => {}}>Button with onClick</Button>
          <Button href="https://example.com">Button with href</Button>
          <Button submit>Button with submit</Button>
        </>,
      ),
    );

    expect(screen.queryByText("Button with onClick")).toBeInTheDocument();
    expect(screen.queryByText("Button with href")).toBeInTheDocument();
    expect(screen.queryByText("Button with submit")).toBeInTheDocument();
  });

  it("Calls onClick", () => {
    const onClick = jest.fn();

    act(() => render(<Button onClick={onClick}>Click me!</Button>));

    const button = screen.getByRole("button");
    for (let click = 0; click < 5; click++) button.click();

    expect(onClick).toHaveBeenCalledTimes(5);
  });

  it("Properly sets href", () => {
    const href = "https://example.com";

    act(() => render(<Button href={href}>Click me!</Button>));

    const button = screen.getByText("Click me!");
    expect(button).toHaveAttribute("href", href);
  });
});
