import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Pagination } from "../pagination";

describe("Pagination", () => {
  it("displays page numbers and navigation", () => {
    render(<Pagination currentPage={3} totalPages={5} search="" />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getAllByText("Previous")).toHaveLength(2); // Mobile + desktop
    expect(screen.getAllByText("Next")).toHaveLength(2);
  });

  it("includes search parameter in navigation links", () => {
    render(<Pagination currentPage={2} totalPages={5} search="therapist" />);

    const page3Link = screen.getByText("3").closest("a");
    expect(page3Link).toHaveAttribute(
      "href",
      "?search=therapist&page=3#results"
    );

    const nextLinks = screen.getAllByText("Next");
    expect(nextLinks[0].closest("a")).toHaveAttribute(
      "href",
      "?search=therapist&page=3#results"
    );
  });
});
