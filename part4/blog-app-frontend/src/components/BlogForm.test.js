import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogFrom/ > updates parent state and calls onSubmit", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();
  const { container } = render(<BlogForm addBlogHandler={createBlog} />);
  screen.debug();

  const title = screen.getByPlaceholderText("Write in the blog's title");
  const url = screen.getByPlaceholderText("Type in the url");
  const author = screen.getByPlaceholderText("Enter the author's name");
  const sendButton = screen.getByText("Submit");

  await user.type(title, "Title From JS test");
  await user.type(url, "URL From JS test");
  await user.type(author, "Author From JS test");
  await user.click(sendButton);

  console.log("what's this?", createBlog.mock.calls);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toBe("Title From JS test");
  expect(createBlog.mock.calls[0][1]).toBe("URL From JS test");
  expect(createBlog.mock.calls[0][2]).toBe("Author From JS test");
});
