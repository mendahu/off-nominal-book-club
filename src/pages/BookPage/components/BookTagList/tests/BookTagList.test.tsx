import { shallow } from "enzyme";
import { BookTagList } from "../..";
import { BookTagListProps } from "../BookTagList";
import { Chip } from "@material-ui/core";
import { useSnackbarContext } from "../../../../../contexts/SnackbarContext";
import { JoinedTag } from "../../../../../types/common";
import BookTagInput from "../BookTagInput/BookTagInput";
import { useBookClubUser } from "../../../../../hooks/useBookClubUser/useBookClubUser";

jest.mock("../../../../../hooks/useBookClubUser/useBookClubUser");
jest.mock("../../../../../contexts/SnackbarContext");

const test_maxUserTags: JoinedTag[] = [
  { loading: false, tag_id: 1, tag_name: "tag1", count: 2, tagRelId: 3 },
  { loading: false, tag_id: 2, tag_name: "tag2", count: 1, tagRelId: 1 },
  { loading: false, tag_id: 3, tag_name: "tag3", count: 3, tagRelId: 2 },
  { loading: false, tag_id: 4, tag_name: "tag4", count: 2, tagRelId: 7 },
  { loading: false, tag_id: 5, tag_name: "tag5", count: 6, tagRelId: 8 },
];

const test_someUserTags: JoinedTag[] = [
  { loading: false, tag_id: 1, tag_name: "tag1", count: 4 },
  { loading: false, tag_id: 2, tag_name: "tag2", count: 5, tagRelId: 1 },
  { loading: false, tag_id: 3, tag_name: "tag3", count: 6, tagRelId: 2 },
];

const test_oneNonUserTag: JoinedTag = {
  loading: false,
  tag_id: 1,
  tag_name: "tag1",
  count: 4,
};

const mockTriggerSnackbar = jest.fn();

const defaultProps: BookTagListProps = {
  bookId: 5,
  tags: test_someUserTags,
};

describe("BookTagList", () => {
  beforeEach(() => {
    mockTriggerSnackbar.mockClear();

    useBookClubUser.mockImplementation(() => ({
      user: { onbc_id: 1, isPatron: true },
      loading: false,
      resetUserPatreonState: jest.fn(),
    }));

    useSnackbarContext.mockImplementation(() => mockTriggerSnackbar);
  });

  it("should render correct amount and colors of tags", () => {
    const wrapper = shallow(<BookTagList {...defaultProps} />);
    const tags = wrapper.find(Chip);
    expect(tags).toHaveLength(3);

    const colors = tags.map((node) => node.prop("color"));
    expect(colors.filter((color) => color === "primary")).toHaveLength(2);

    expect(wrapper.find(BookTagInput)).toHaveLength(1);
  });

  it("Should not display any tags if tags prop is empty", () => {
    const wrapper = shallow(<BookTagList {...defaultProps} tags={[]} />);
    expect(wrapper.find(Chip)).toHaveLength(0);
    expect(wrapper.find(BookTagInput)).toHaveLength(1);
  });

  it("Should trigger snackbar if user not logged in and tag clicked", () => {
    useBookClubUser.mockImplementationOnce(() => ({
      user: null,
      loading: false,
      resetUserPatreonState: jest.fn(),
    }));

    const wrapper = shallow(<BookTagList {...defaultProps} />);
    wrapper.find(Chip).at(0).simulate("click");
    expect(mockTriggerSnackbar).toHaveBeenCalledTimes(1);
  });

  it("Should trigger snackbar if user increments when already has five tags", () => {
    const wrapper = shallow(
      <BookTagList
        {...defaultProps}
        tags={[test_oneNonUserTag, ...test_maxUserTags]}
      />
    );
    wrapper.find(Chip).at(0).simulate("click");
    expect(mockTriggerSnackbar).toHaveBeenCalledTimes(1);
  });
});
