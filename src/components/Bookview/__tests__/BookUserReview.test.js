import React from 'react'
import { render, fireEvent } from "@testing-library/react";
import BookUserReview from '../BookUserReview'

describe("Book Review", () => {

  it("Should call the update function when you click it", () => {

    const mockSubmit = jest.fn(e => e)
    const dummyFunc = jest.fn()

    const { getAllByText, getByRole } = render(
      <BookUserReview 
        review={{id: "1", summary: "A summary", user_review: "A review"}}
        isTooLong={false}
        errorOpen={false}
        closeError={dummyFunc}
        submitReview={e => mockSubmit()}
        setSummary={e => dummyFunc()}
        setReview={e => dummyFunc()} />)

    fireEvent(getByRole("button"), new MouseEvent('click', { bubbles: true }))
    fireEvent(getAllByText(/update/i)[1], new MouseEvent('click', { bubbles: true }))
    
    expect(mockSubmit.mock.calls.length).toBe(1)
  });
  
  it("Should display error if the summary is too long", () => {
    
    const dummyFunc = jest.fn()
    
    const { getAllByText, getByRole } = render(
      <BookUserReview 
      review={{id: "1", summary: "A very long summary. A very long summary. A very long summary. A very long summary. A very long summary. A very long summary. A very long summary. A very long summary. A very long summary. A very long summary. A very long summary. A very long summary. A very long summary.", user_review: "A review"}}
      isTooLong={true}
      errorOpen={false}
      closeError={dummyFunc}
      submitReview={e => dummyFunc()}
      setSummary={e => dummyFunc()}
      setReview={e => dummyFunc()} />)
      
    fireEvent(getByRole("button"), new MouseEvent('click', { bubbles: true }))
    expect(getAllByText(/255 characters/i)).toBeTruthy()
  });

  it("Should throw a snackbar if either field is empty", () => {
    //
  });

});
