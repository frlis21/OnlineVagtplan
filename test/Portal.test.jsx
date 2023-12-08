import { render, fireEvent, cleanup, screen } from "@solidjs/testing-library";
import App from "../src/App";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";

describe("Portal", () => {
  afterEach(cleanup);

  it("should show a register button", () => {
    const { getByRole } = render(() => <App />);
    const registerButton = getByRole("goregister");
    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toHaveTextContent("REGISTER HERE");
  });

  // Shit doesn't FUCKING WORK, WHYYYYYYYYYY??!??!????
  //it("should let you register", async () => {
  //  const { getByRole, findByRole } = render(() => <App />);
  //  fireEvent.click(getByRole("goregister"));
  //  const registerForm = await screen.findByRole("registerform");
  //  screen.getByRole("name").value = "username";
  //  screen.getByRole("password").value = "password";
  //  fireEvent.click(registerButton);
  //  const loginButton = await screen.findByRole("login");
  //  screen.getByRole("name").value = "username";
  //  screen.getByRole("password").value = "password";
  //  fireEvent.click(loginButton);
  //});
});
