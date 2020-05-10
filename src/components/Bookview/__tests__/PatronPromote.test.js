import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import PatronPromote from '../PatronPromote'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe("PatronPromote should render without crashing", () => {

  it("Should render error message if book doesn't exist in database", () => {
    const wrapper = shallow(<PatronPromote />)
  });

});