import { render, screen } from "@testing-library/react";
import WeeklyPlanning from "../WeeklyPlanning";
import React from "react";
describe("WeeklyPlanning page", () => {
  it("renders the heading", () => {
    render(<WeeklyPlanning />);
    expect(screen.getByRole("heading", { name: /Weekly Planning Flow/i })).toBeInTheDocument();
  });
}); 