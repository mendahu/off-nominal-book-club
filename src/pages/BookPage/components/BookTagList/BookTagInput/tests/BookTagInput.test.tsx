import { ButtonBase } from "@material-ui/core";
import { shallow } from "enzyme";
import BookTagInput, { BookTagInputProps } from "../BookTagInput";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DoneIcon from "@material-ui/icons/Done";
import { useSnackbarContext } from "../../../../../../contexts/SnackbarContext";
import { useBookClubUser } from "../../../../../../hooks/useBookClubUser/useBookClubUser";

jest.mock("../../../../../../hooks/useBookClubUser/useBookClubUser");
jest.mock("../../../../../../contexts/SnackbarContext");

const mockAddTag = jest.fn();
const mockTriggerSnackbar = jest.fn();

describe("BookTagInput", () => {
  const defaultProps: BookTagInputProps = {
    addTag: mockAddTag,
    loading: false,
    tagList: [
      {
        id: 1,
        label: "space",
        count: 2,
      },
      {
        id: 3,
        label: "mars",
        count: 4,
      },
    ],
  };

  beforeEach(() => {
    useBookClubUser.mockImplementation(() => ({
      user: { onbc_id: 1, isPatron: true },
      loading: false,
      resetUserPatreonState: jest.fn(),
    }));

    useSnackbarContext.mockImplementation(() => mockTriggerSnackbar);
  });

  it("should render initially with addMode = false and loading = false", () => {
    const wrapper = shallow(<BookTagInput {...defaultProps} />);
    expect(wrapper.find(ButtonBase)).toHaveLength(1);
    expect(wrapper.find(AddCircleIcon)).toHaveLength(1);
  });

  it("should toggle to addMode when clicked and user is a Patron", () => {
    const wrapper = shallow(<BookTagInput {...defaultProps} />);
    wrapper.simulate("click");
    expect(wrapper.find(DoneIcon)).toHaveLength(1);
  });

  it("should trigger snackbar when clicked and user is not a Patron", () => {
    useBookClubUser.mockImplementationOnce(() => ({
      user: { onbc_id: 1, isPatron: false },
    }));
    const wrapper = shallow(<BookTagInput {...defaultProps} />);
    wrapper.simulate("click");
    expect(wrapper.find(AddCircleIcon)).toHaveLength(1);
    expect(mockTriggerSnackbar).toHaveBeenCalledTimes(1);
  });
});
