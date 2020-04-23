import React from 'react'
import { render, cleanup } from "@testing-library/react";
import userProfileValidator from '../userProfileValidator'

describe("User Profile Validator", () => {

  const user_nometa = {
    sub: 'auth0|123456',
    email: 'test@test.test'
  }
  const user_noid = {
    sub: 'auth0|123456',
    email: 'test@test.test',
    app_metadata: {
      patreon: "skipped"
    }
  }
  const user_nopat = {
    sub: 'auth0|123456',
    email: 'test@test.test',
    app_metadata: {
      onbc_id: 10
    }
  }

  it("detects if the app_metadata attribute is missing from a user", () => {
    const { getByText } = render(userProfileValidator(user_nometa));
    expect(getByText(/No app metadata container/i)).toBeTruthy();
  });

  it("detects if the onbc attribute is missing from a user", () => {
    const { getByText } = render(userProfileValidator(user_noid));
    expect(getByText(/No Book Club ID associated/i)).toBeTruthy();
  });

  it("detects if the patreon attribute is missing from a user", () => {
    const { getByText } = render(userProfileValidator(user_nopat));
    expect(getByText(/No Premium/i)).toBeTruthy();
  });

  it("returns false if no user passed in", () => {
    expect(userProfileValidator()).toBeFalsy();
  });

});
