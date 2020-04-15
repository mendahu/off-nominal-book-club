import React from 'react'
import { render, cleanup } from "@testing-library/react";
import Register from './register'

afterEach(cleanup)

describe("Registration", () => {

  it("Renders without crashing", () => {
    render(<Register />)
  });

});
