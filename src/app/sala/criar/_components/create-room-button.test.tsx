import { act, render, screen } from "@testing-library/react";
import CreateRoomButton from "./create-room-button";
import unimplemented from "@/lib/unimplemented";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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

describe("CreateRoomButton", () => {
  it("Renders children", () => {
    act(() => render(<CreateRoomButton>Children</CreateRoomButton>));

    expect(screen.getByText("Children")).toBeInTheDocument();
  });

  it("Forwards the disabled property", () => {
    act(() => render(<CreateRoomButton disabled>Children</CreateRoomButton>));

    expect(screen.getByRole("button")).toHaveAttribute("disabled");
  });
});
