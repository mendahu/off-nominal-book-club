import { shallow } from "enzyme";
import DrawerContents, { DrawerContentsProps } from "../DrawerContents";
import DrawerItem from "../DrawerItem";
import { Avatar, Typography } from "@material-ui/core";
import { useBookClubUser } from "../../../../../lib/bookClubUser";
jest.mock("../../../../../lib/bookClubUser");

const testToggle = jest.fn();

const defaultProps: DrawerContentsProps = {
  toggleDrawer: testToggle,
  logInUrl: "/",
  logOutUrl: "/",
};

const defaultUser = {
  onbc_id: 1,
  avatar: "www.avatar.com",
  name: "Jake",
  reads: [],
  favourites: [],
  wishlist: [],
  isPatron: false,
};

describe("Drawer Contents", () => {
  beforeEach(() => {
    testToggle.mockClear();
  });

  it("should not render an avatar for unauthenticated users", () => {
    useBookClubUser.mockImplementationOnce(() => ({
      user: undefined,
      loading: false,
    }));
    const wrapper = shallow(<DrawerContents {...defaultProps} />);
    expect(wrapper.find(Avatar)).toHaveLength(0);
  });

  it("should not render user text for unauthenticated users", () => {
    useBookClubUser.mockImplementationOnce(() => ({
      user: undefined,
      loading: false,
    }));
    const wrapper = shallow(<DrawerContents {...defaultProps} />);
    expect(wrapper.find(Typography)).toHaveLength(0);
  });

  it("should render a profile image for an authenticated user", () => {
    useBookClubUser.mockImplementationOnce(() => ({
      user: defaultUser,
      loading: false,
    }));
    const wrapper = shallow(<DrawerContents {...defaultProps} />);
    expect(wrapper.find(Avatar)).toHaveLength(1);
  });

  it("should render user text for authenticated users", () => {
    useBookClubUser.mockImplementationOnce(() => ({
      user: defaultUser,
      loading: false,
    }));
    const wrapper = shallow(<DrawerContents {...defaultProps} />);
    const text = wrapper.find(Typography);
    expect(text).toHaveLength(4);
    expect(text.at(0).text()).toEqual("Jake");
  });
});
