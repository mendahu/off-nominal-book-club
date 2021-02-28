import { shallow } from "enzyme";
import DrawerContents, { DrawerContentsProps } from "../DrawerContents";
import DrawerItem from "../DrawerItem";
import { Avatar, Typography } from "@material-ui/core";
import { useBookClubUser } from "../../../../../lib/bookClubUser";
jest.mock("../../../../hooks/useBookClubUser/useBookClubUser");

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

  it("should render a home page link, an about page link and a log out link for unauthenticated users", () => {
    useBookClubUser.mockImplementationOnce(() => ({
      user: undefined,
      loading: false,
    }));
    const wrapper = shallow(<DrawerContents {...defaultProps} />);
    expect(wrapper.find(DrawerItem)).toHaveLength(3);
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
    expect(text.at(1).text()).toEqual("READS: 0");
    expect(text.at(2).text()).toEqual("FAVOURITES: 0");
    expect(text.at(3).text()).toEqual("WISHLIST: 0");
  });

  it("should render an add book icon for patrons", () => {
    useBookClubUser.mockImplementationOnce(() => ({
      user: { ...defaultUser, isPatron: true },
      loading: false,
    }));
    const wrapper = shallow(<DrawerContents {...defaultProps} />);
    expect(wrapper.find(DrawerItem)).toHaveLength(4);
  });
});
