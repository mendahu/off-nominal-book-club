import { Button } from "@material-ui/core";
import { shallow } from "enzyme";
import SearchResults, { SearchResultsProps } from "../";
import Message from "../../../../components/Utility/Message";
import { useBookClubUser } from "../../../../hooks/useBookClubUser/useBookClubUser";
import { ApiBook } from "../../../../types/api/apiTypes";
import { BookType } from "../../../../types/common.d";
import SearchResult from "../SearchResult";
import SearchResultsSkeleton from "../skeletons/SearchResultsSkeleton";

jest.mock("../../../../hooks/useBookClubUser/useBookClubUser");
useBookClubUser.mockResolvedValue({ loading: false, user: { onbc_id: 1 } });

const mockTagClickHandler = jest.fn();

const book1: ApiBook = {
  id: 5,
  title: "a book",
  description: "a short description of a book",
  year: "2001",
  google_id: "1234abcd",
  type: BookType.fiction,
  reads: 7,
  wishlist: 5,
  favourites: 3,
  rating: 3.8,
  authors_string: "Author 1, Author 2",
  tags: [
    {
      id: 5,
      count: 6,
      label: "mars",
    },
  ],
};

const book2: ApiBook = {
  id: 3,
  title: "a different book",
  description:
    "a long description of a book. it is much longer than the other one.",
  year: "2009",
  google_id: "1234abcd",
  type: BookType.nonFiction,
  reads: 2,
  wishlist: 2,
  favourites: 1,
  rating: 3.1,
  authors_string: "Author 3",
  tags: [
    {
      id: 1,
      count: 3,
      label: "space",
    },
    {
      id: 3,
      count: 4,
      label: "pluto",
    },
  ],
};

describe("SearchResults", () => {
  const defaultProps: SearchResultsProps = {
    results: [],
    loading: false,
    tagClickHandler: mockTagClickHandler,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading state when loading", () => {
    const wrapper = shallow(<SearchResults {...defaultProps} loading={true} />);

    expect(wrapper.find(SearchResultsSkeleton)).toHaveLength(1);
    expect(wrapper.find(SearchResult)).toHaveLength(0);
    expect(wrapper.find(Message)).toHaveLength(0);
  });

  it("should render warning message when no results found", () => {
    const wrapper = shallow(<SearchResults {...defaultProps} />);

    expect(wrapper.find(SearchResultsSkeleton)).toHaveLength(0);
    expect(wrapper.find(SearchResult)).toHaveLength(0);
    expect(wrapper.find(Message)).toHaveLength(1);
  });

  it("should render book results up to limit. Limit should be expandable.", () => {
    const largeResults = [
      book1,
      book2,
      book1,
      book2,
      book1,
      book2,
      book1,
      book2,
      book1,
      book2,
      book1,
      book2,
      book1,
      book2,
      book1,
      book2,
      book1,
      book2,
      book1,
      book2,
    ];

    const wrapper = shallow(
      <SearchResults {...defaultProps} results={largeResults} />
    );

    expect(wrapper.find(SearchResultsSkeleton)).toHaveLength(0);
    expect(wrapper.find(SearchResult)).toHaveLength(15);
    expect(wrapper.find(Message)).toHaveLength(0);

    wrapper.find(Button).simulate("click");

    expect(wrapper.find(SearchResult)).toHaveLength(largeResults.length);
  });
});
