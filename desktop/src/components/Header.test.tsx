// src/components/Header.test.tsx
import { render, screen } from "@testing-library/react";
import Header from "./Header";

// Mocka beroenden som vi inte vill testa
jest.mock("./Navbar", () => () => <nav data-testid="navbar" />);
jest.mock("./LoginButton", () => () => <button>Logga in</button>);
jest.mock("../assets/logo-T.png", () => "logo.png");

describe("Header component", () => {
  it("renders an h1 element with the title", () => {
    render(<Header />);
    
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("rackApp");
  });
});
