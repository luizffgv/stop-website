import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import Section from "./section";

describe("Section", () => {
  it("Renders a <section>", () => {
    act(() => render(<Section title="Section" />));

    const section = document.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("Uses the proper heading tag for each level", () => {
    act(() =>
      render(
        <Section title="1">
          <Section title="2">
            <Section title="3">
              <Section title="4">
                <Section title="5">
                  <Section title="6" />
                </Section>
              </Section>
            </Section>
          </Section>
        </Section>,
      ),
    );

    let level = 0;
    let section = document.querySelector("section");
    while (++level <= 6) {
      expect(section).toBeInTheDocument();

      const heading = section!.querySelector(`h${level}`);
      expect(heading).toBeInTheDocument();

      section = section!.querySelector("section");
    }
  });

  it("Renders children", () => {
    act(() =>
      render(
        <Section title="Section">
          <div id="child"></div>
        </Section>,
      ),
    );

    const section = document.querySelector("section");
    expect(section).toBeInTheDocument();

    const child = section!.querySelector("#child");
    expect(child).toBeInTheDocument();
  });

  it("Applies className", () => {
    act(() => render(<Section title="Section" className="class"></Section>));

    const section = document.querySelector("section");
    expect(section).toHaveClass("class");
  });

  it("Applies contentClassName", () => {
    act(() =>
      render(
        <Section title="Section" contentClassName="class">
          <div></div>
        </Section>,
      ),
    );

    const section = document.querySelector("section");
    expect(section).toBeInTheDocument();

    const content = section!.querySelector("h1 ~ *");
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass("class");
  });
});
