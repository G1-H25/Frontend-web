import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginButton from "./LoginButton";

describe("LoginButton", () => {
  it("should render a button with the text 'Logga in'", () => {
    render(
      <MemoryRouter>
        <LoginButton />
      </MemoryRouter>
    );

    const button = screen.getByText("Logga in");
    expect(button).toBeInTheDocument();
  });
});
