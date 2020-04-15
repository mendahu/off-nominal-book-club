import React from 'react'
import { render, cleanup } from "@testing-library/react";
import App from "../../../pages/index";

afterEach(cleanup)

describe("App", () => {

  it("renders without crashing", () => {
    render(<App />);
  });

});
