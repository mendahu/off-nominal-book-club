import React from 'react'
import { act, render, fireEvent } from "@testing-library/react";
import BookRating from '../BookRating'

describe("Book Rating", () => {

  it("Should call the rateBook function and pass in the correct value", () => {

    const mockRateBook = jest.fn(e => e)
    
    act(() => {
      const { getByLabelText } = render(<BookRating rating={3} rateBook={mockRateBook}/>)
      fireEvent(getByLabelText('4 Stars'), new MouseEvent('click', { bubbles: true }))
    })

    expect(mockRateBook.mock.calls[0][0]).toBe("4")
    expect(mockRateBook.mock.calls.length).toBe(1)
  });

});
