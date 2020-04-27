import React from 'react'
import { render, fireEvent } from "@testing-library/react";
import BookTitleBarMetaFlag from '../BookTitleBarMetaFlag'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

describe("", () => {

  const userBook = {
    bookId: 100,
    userId: 538,
  }

  const userFlags = [
    {
      type: "reads", 
      count: 5,
      status: 33,
      icon_active: <CheckCircleIcon />, 
      icon_inactive: <CheckCircleOutlineIcon />,
      error: "You must be logged in to mark books as read."
    },
    {
      type: "wishlist", 
      count: 3,
      status: null,
      icon_active: <BookmarkIcon />, 
      icon_inactive: <BookmarkBorderIcon />,
      error: "You must be logged in to add books to your wishlist."
    },
    {
      type: "favourites", 
      count: 6,
      status: 89,
      icon_active: <FavoriteIcon />, 
      icon_inactive: <FavoriteBorderIcon />,
      error: "You must be logged in to mark books favourites."
    }
  ]

  it("Should display correct count after incrementing", () => {

    const { getByText } = render(
      <BookTitleBarMetaFlag 
        userBook={userBook}
        flag={userFlags[0]}
        loggedIn={538}
        />)
    
    expect(getByText(/5/i)).toBeTruthy();
  });
  
});
