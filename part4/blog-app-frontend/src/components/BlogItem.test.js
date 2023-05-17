import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogItem from "./BlogItem";

describe("<BlogItem/>", () => {
  let container;
  const mockHandler = jest.fn();

  beforeEach(() => {
    const blog = {
      title: "clever title",
      url: "URL",
      author: "Alexis",
      likes: 0,
      user: {
        username: "sssss",
      },
    };

    render(
      <BlogItem
        blog={blog}
        deleteBlogHandler={null}
        likesHandler={mockHandler}
        activeUser="sssss"
      />
    );
  });
  test("only shows title and author by default", async () => {
    const item = await screen.findAllByText("clever title by Alexis");
    expect(item[0]).not.toHaveTextContent("URL");
  });
  test("clicking button shows URL and likes", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("View details");
    await user.click(button);

    screen.debug();
    const item = await screen.findAllByText("clever title by Alexis");

    expect(item[0]).toHaveTextContent("URL");
    expect(item[0]).toHaveTextContent("Likes 0");
  });

  test("clicking like button twice", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("View details");
    await user.click(button);

    const likeButton = screen.getByText("Like");
    await user.click(likeButton);
    await user.click(likeButton);

    //  screen.debug();

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
