import { act, render, fireEvent } from '@testing-library/react';
import BookRating from '../BookRating';
import * as SnackbarContext from '../../../../../../contexts/SnackbarContext';

const mockRateBook = jest.fn();
const mockTriggerSnackbar = jest.fn();
jest
  .spyOn(SnackbarContext, 'useSnackbarContext')
  .mockImplementation(() => mockTriggerSnackbar);

describe('Book Rating', () => {
  beforeEach(() => {
    mockRateBook.mockClear();
  });

  it('Should call the rateBook function when clicked', async () => {
    const promise = Promise.resolve();

    const { getByLabelText } = render(
      <BookRating rating={3} rateBook={mockRateBook} />
    );
    fireEvent(
      getByLabelText('4 Stars'),
      new MouseEvent('click', { bubbles: true })
    );

    expect(mockRateBook.mock.calls.length).toBe(1);
    await act(() => promise);
  });
});
