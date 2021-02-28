import { shallow } from "enzyme";
import Navbar, { keyDownGate } from "../Navbar";
import { Button, Box } from "@material-ui/core";
import DrawerContents from "../Drawer/DrawerContents";
import { useBookClubUser } from "../../../../lib/bookClubUser";
jest.mock("../../../../lib/bookClubUser");

useBookClubUser.mockImplementation(() => ({ user: undefined, loading: false }));

describe("Navbar", () => {
  beforeEach(() => {
    useBookClubUser.mockClear();
  });

  it("should render one button, Box and Drawer Contents for unauthenticated user", () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Box)).toHaveLength(1);
    expect(wrapper.find(DrawerContents)).toHaveLength(1);
  });

  it("should render an add Book button for Patrons", () => {
    useBookClubUser.mockImplementationOnce(() => ({
      user: {
        isPatron: true,
      },
      loading: false,
    }));

    const wrapper = shallow(<Navbar />);
    const buttons = wrapper.find(Button);
    expect(buttons).toHaveLength(2);
    expect(buttons.at(1).text()).toEqual("Add a Book");
  });
});

describe("keyDownGate", () => {
  const mockDrawerToggle = jest.fn();

  beforeEach(() => {
    mockDrawerToggle.mockClear();
  });

  it("should fire callback if a click", () => {
    keyDownGate(mockDrawerToggle)(true)({ type: "click" });
    expect(mockDrawerToggle).toHaveBeenCalledTimes(1);
  });

  it("should fire callback if an enter keystroke", () => {
    keyDownGate(mockDrawerToggle)(true)({ type: "keydown", key: "Enter" });
    expect(mockDrawerToggle).toHaveBeenCalledTimes(1);
  });

  it("should fire callback if a space keystroke", () => {
    keyDownGate(mockDrawerToggle)(true)({ type: "keydown", key: " " });
    expect(mockDrawerToggle).toHaveBeenCalledTimes(1);
  });

  it("should not fire callback if a tab keystroke", () => {
    keyDownGate(mockDrawerToggle)(true)({ type: "keydown", key: "Tab" });
    expect(mockDrawerToggle).toHaveBeenCalledTimes(0);
  });

  it("should not fire callback if a shift keystroke", () => {
    keyDownGate(mockDrawerToggle)(true)({ type: "keydown", key: "Shift" });
    expect(mockDrawerToggle).toHaveBeenCalledTimes(0);
  });
});
