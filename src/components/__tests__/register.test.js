import React from 'react'
import { render, cleanup } from "@testing-library/react";
import Register from '../../../pages/users/register'

describe("Registration", () => {

  it("Renders without crashing", () => {
    render(<Register />)
  });

});
