import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginButton from "./LoginButton";
import { TextEncoder, TextDecoder } from "util";
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

describe("LoginButton", () => {
  it("should render a button with the text 'Logga in'", () => {
    render(<LoginButton />);
    const button = screen.getByText("Logga in");
    expect(button).toBeInTheDocument();
  });
});