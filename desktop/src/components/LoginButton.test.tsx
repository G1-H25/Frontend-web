import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginButton from "./LoginButton";

describe("LoginButton", () => {
  it("should render a button with the text 'Logga in'", () => {
    render(<LoginButton />);
    const button = screen.getByText("Logga in");
    expect(button).toBeInTheDocument();
  });
});