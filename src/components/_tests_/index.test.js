import React from 'react'
import { render } from "@testing-library/react";
import App from "../../../pages/index";

afterEach(cleanup)

desccribe("App"), () => {

  it("renders without crashing", () => {
    render(<App />);
  });

}
