import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import BookFeedback from '../BookFeedback'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe("BookFeedback should render without crashing", () => {

  const testBook = {
    id: 1
  }

  //Default user Data
  const userData = {
    user_tags: [],
    read: false, 
    wishlist: false, 
    fav: false, 
    rating: null, 
    review: null,
    name: ""
  }

  it("Should render without crashing", () => {
    const wrapper = shallow(<BookFeedback book={testBook} userData={userData} />)
  });

});