import React from 'react'
import { render, cleanup } from "@testing-library/react";
import Message from "../Utility/Message";

afterEach(cleanup)

describe("Message", () => {

  it("Displays the right message text when renderedd", () => {
    const { getByText } = render(
      <Message message="Hello World"/>
    );

    expect(getByText(/Hello World/i)).toBeInTheDocument();
  });

});
