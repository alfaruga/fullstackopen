import Togglable from "./Togglable";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<Togglable />", () => {
  beforeEach(() => {
    render(
      <Togglable hideLabel={"Hide details"} label={"View details"}>
        props Children
      </Togglable>
    );
  });

  test("renders its children", async () => {
    await screen.findAllByText("View details");
    //screen.debug();
  });
  test("at start the children are not displayed", async () => {
    const div = document.querySelector("#togglable_tests");
    expect(div).toBeNull();

    //screen.debug();
  });

  test("after clicking the button, children are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("View details");
    await user.click(button);
    screen.debug();
    expect(screen.getByText("props Children")).toBeInTheDocument();
  });

  test("toggled content can be closed", async () => {
    const user = userEvent.setup();
    const openButton = screen.getByText("View details");
    await user.click(openButton);
    screen.debug();

    const closeButton = screen.getByText("Hide details");
    await user.click(closeButton);
    const div = document.querySelector("#togglable_tests");
    screen.debug();
    expect(div).toBeNull();
  });
});
