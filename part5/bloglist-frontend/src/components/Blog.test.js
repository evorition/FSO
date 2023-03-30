import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  title: "New blog",
  author: "Albert Einstein",
  url: "www.google.com",
  likes: 0,
  user: {
    username: "aein",
    name: "Albert Einstein",
  },
};

describe("Blog component", () => {
  test("renders title and user and doesn't render url and likes by default", () => {
    const { container } = render(<Blog blog={blog} />);

    const compactElement = container.querySelector(".compact-blog");
    const expandedElement = container.querySelector(".expanded-blog");
    expect(compactElement).toBeVisible();
    expect(expandedElement).not.toBeVisible();
  });

  test("shows url and number of likes after button click", async () => {
    const { container } = render(<Blog blog={blog} />);

    const user = userEvent.setup();
    const button = screen.getByText("show");
    await user.click(button);

    const expandedElement = container.querySelector(".expanded-blog");

    expect(expandedElement).toBeVisible();
  });
});
