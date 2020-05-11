import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Bookview, { getServerSideProps } from '../../../../pages/books/[id]'
import Message from '../../Utility/Message'
import userProfileFetcher from '../../../helpers/userProfileFetcher'

Enzyme.configure({ adapter: new EnzymeAdapter() })

//Default userData from serverSideProps
let userData = {
  user_tags: [],
  read: false, 
  wishlist: false, 
  fav: false, 
  rating: null, 
  review: null,
  name: ""
}

//default book data from serverSideProps
let book = null;

describe("Bookview", () => {
  
    it("Should render error message if book data is null", () => {
      const wrapper = shallow(<Bookview book={null} />)
      expect(wrapper.find(Message)).toHaveLength(1)
    });

    it("Should not render error message if book does exist", () => {

      const testBook = {
        id: 1,
        description: "a test book about books"
      }

      const wrapper = shallow(<Bookview book={testBook} userData={userData} />)
      expect(wrapper.find(Message)).toHaveLength(0)
    });

})

describe('Bookview ServerSide Props', () => {

    it('should pass slug and null data for a non-existant url', async () => {
      const context = {
        params: {
          id: 'wrong-url-slug'
        },
        req: {}
      }

      const { props } = await getServerSideProps(context)

      expect(props).toEqual({
        slug: 'wrong-url-slug',
        book,
        userData
      })
    })

    // it('should pass book data for an unauthenticated user', () => {
    //   const context = {
    //     params: {
    //       id: '1-author-title'
    //     },
    //     req: {}
    //   }

      
    //   jest.mock('../../../helpers/userProfileFetcher', () => ({
    //     userProfileFetcher: (req) => ({
    //       app_metadata: { onbc_id: 1 }
    //     })
    //   }))

    //   import userProfileFetcher, { Response } from '../../../helpers/userProfileFetcher'
    //   userProfileFetcher.mockReturnValue(Promise.resolve(new Response(undefined)))

    //   // jest.mock('../../../../db/queries/books', () => ({
    //   //   bookQueries: {
    //   //     books: {
    //   //       fetch: (bookId, userId) => [ bookId ]
    //   //     }
    //   //   }
    //   // }))
      
    //   // jest.mock('../../../../db/queries/books', () => ({
    //   //   userQueries: {
    //   //     users: {
    //   //       fetch: (userId, bookId) => [ userId ]
    //   //     }
    //   //   }
    //   // }));

    //   const { props } = getServerSideProps(context);

    //   expect(props).toEqual({
    //     slug: '1-author-title',
    //     book: 1,
    //     userData: 1
    //   })

    // })
  
});
