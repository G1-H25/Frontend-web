import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import LoginButton from "./LoginButton";
import loginReducer from "../features/login/loginSlice";

// Minimal typ för preloadedState
interface LoginState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

describe("LoginButton", () => {
  it("should render a button with the text 'Logga in'", () => {
    // Minimal Redux store med tom token
    const store = configureStore({
      reducer: { login: loginReducer },
      preloadedState: {
        login: { token: null, loading: false, error: null } as LoginState,
      },
    });

    render(
      <Provider store={store}>
        <LoginButton />
      </Provider>
    );

    const button = screen.getByText("Logga in");
    expect(button).toBeInTheDocument();
  });
});
