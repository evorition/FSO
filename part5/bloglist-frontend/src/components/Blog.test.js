import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
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
});
