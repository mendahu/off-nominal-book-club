import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Bookview, { getServerSideProps } from '../../../../pages/books/[id]'
import Message from '../../Utility/Message'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe("Bookview", () => {
  
    it("Should render error message if book doesn't exist in database", () => {
      const wrapper = shallow(<Bookview />)
      expect(wrapper.find(Message)).toHaveLength(1)
    });

    it("Should not render error message if book does exist", () => {

      const testBook = {
        id: 1,
        description: "a test book about books"
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

      const wrapper = shallow(<Bookview book={testBook} userData={userData} />)
      expect(wrapper.find(Message)).toHaveLength(0)
    });

    it('should properly process server side props', () => {
      const context = {
        params: {
          id: '1-author-title'
        },
        req: {}
      }
      jest.mock('../../../helpers/userProfileFetcher', () => ({
        userProfileFetcher: (req) => ({
          app_metadata: { onbc_id: 1 }
        })
      }))

      jest.mock('../../../../db/queries/books', () => ({
        bookQueries: {
          books: {
            fetch: (bookId, userId) => [ bookId ]
          }
        }
      }))
      
      jest.mock('../../../../db/queries/books', () => ({
        userQueries: {
          users: {
            fetch: (userId, bookId) => [ userId ]
          }
        }
      }));

      const { props } = getServerSideProps(context);

      expect(props).toEqual({
        slug: '1-author-title',
        book: 1,
        userData: 1
      })

    })
  
});
