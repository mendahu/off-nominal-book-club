import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import tagJoiner from '../tagJoiner'

Enzyme.configure({ adapter: new EnzymeAdapter() })

//mock data
const testUserData = [
  { tag_id: 1, tag_rel_id: 1},
  { tag_id: 2, tag_rel_id: 2},
  { tag_id: 3, tag_rel_id: 3}
]

const testCommData = [
  { tag_id: 1, tag_name: 'tag1', count: 1},
  { tag_id: 2, tag_name: 'tag2', count: 2},
  { tag_id: 3, tag_name: 'tag3', count: 3},
  { tag_id: 4, tag_name: 'tag4', count: 4},
  { tag_id: 5, tag_name: 'tag5', count: 2}
]

describe("tagJoiner", () => {
  
    it("Should return commTags if commTags is empty", () => {
      const joinedTags = tagJoiner([], testUserData)
      expect(joinedTags).toEqual([])
    });

    it("Should return commTags if userTags AND commTags is empty", () => {
      const joinedTags = tagJoiner([], [])
      expect(joinedTags).toEqual([])
    });

    it("Should return commTags if userTags is empty", () => {
      const joinedTags = tagJoiner(testCommData, [])
      expect(joinedTags).toEqual(testCommData)
    });

    it("Should return joined tags properly", () => {
      const joinedTags = tagJoiner(testCommData, testUserData)
      expect(joinedTags).toEqual([
        { tag_id: 1, tag_name: 'tag1', count: 1, tagRelId: 1},
        { tag_id: 2, tag_name: 'tag2', count: 2, tagRelId: 2},
        { tag_id: 3, tag_name: 'tag3', count: 3, tagRelId: 3},
        { tag_id: 4, tag_name: 'tag4', count: 4},
        { tag_id: 5, tag_name: 'tag5', count: 2}
      ])
    });
})
