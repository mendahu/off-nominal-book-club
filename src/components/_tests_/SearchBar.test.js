import React from 'react'
import { render } from "@testing-library/react";
import SearchBar from "../SearchBar";

it("renders without crashing", () => {
  render(<SearchBar />);
});
