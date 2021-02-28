import { shallow } from "enzyme";
import ProfileData from "../ProfileData";
import { Button } from "@material-ui/core";
import axios, { AxiosResponse } from "axios";
import sendPasswordReset from "../../../../helpers/sendPasswordReset";
import * as SnackbarContext from "../../../../contexts/SnackbarContext";
import { useBookClubUser } from "../../../../../lib/bookClubUser";
jest.mock("../../../../../lib/bookClubUser");
jest.mock("axios");
jest.mock("../../../../helpers/sendPasswordReset");

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockTriggerSnackbar = jest.fn();
jest
  .spyOn(SnackbarContext, "useSnackbarContext")
  .mockImplementation(() => mockTriggerSnackbar);

const tick = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
};

const getUser = (isAuthenticated: boolean, isPatron: boolean = false) => {
  const userObj = {
    isPatron,
    patreon: {
      state: isPatron ? "connected" : "skipped",
    },
  };

  return {
    user: isAuthenticated ? userObj : null,
    resetUserPatreonState: jest.fn(),
  };
};

describe("ProfileData", () => {
  beforeEach(() => {
    mockTriggerSnackbar.mockClear();
  });

  it("Should show connect button if Patreon is not connected", () => {
    useBookClubUser.mockReturnValueOnce(getUser(true, false));
    const wrapper = shallow(<ProfileData />);
    expect(wrapper.find(Button).first().text()).toEqual("Connect");
  });

  it("Should show disconnect button if Patreon is connected", () => {
    useBookClubUser.mockReturnValueOnce(getUser(true, true));
    const wrapper = shallow(<ProfileData />);
    expect(wrapper.find(Button).first().text()).toEqual("Disconnect");
  });

  it("should trigger successful snackbar when Patreon disconnect is clicked and API succeeds", async () => {
    mockedAxios.post.mockClear();
    useBookClubUser.mockReturnValueOnce(getUser(true, true));

    const wrapper = shallow(<ProfileData />);

    mockedAxios.post.mockResolvedValueOnce({});
    wrapper.find(Button).first().simulate("click");
    await tick();

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockTriggerSnackbar).toHaveBeenCalledTimes(1);
    expect(mockTriggerSnackbar).toHaveBeenCalledWith({
      active: true,
      message: "Patreon Account Disconnected!",
      severity: "success",
    });
  });

  it("should trigger unsuccessful snackbar when Patreon disconnect is clicked and API fails", async () => {
    mockedAxios.post.mockClear();
    useBookClubUser.mockReturnValueOnce(getUser(true, true));

    const wrapper = shallow(<ProfileData />);

    mockedAxios.post.mockRejectedValueOnce({});
    wrapper.find(Button).first().simulate("click");
    await tick();

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockTriggerSnackbar).toHaveBeenCalledTimes(1);
    expect(mockTriggerSnackbar).toHaveBeenCalledWith({
      active: true,
      message: "Something went wrong!",
      severity: "error",
    });
  });

  it("should trigger successful snackbar when password reset button is clicked and API succeeds", async () => {
    useBookClubUser.mockReturnValueOnce(getUser(true, true));
    const wrapper = shallow(<ProfileData />);

    const mockResponse: AxiosResponse = {
      data: {},
      status: 200,
      statusText: "success",
      headers: {},
      config: {},
    };

    sendPasswordReset.mockResolvedValueOnce();
    wrapper.find(Button).at(1).simulate("click");
    await tick();

    expect(mockTriggerSnackbar).toHaveBeenCalledTimes(1);
    expect(mockTriggerSnackbar).toHaveBeenCalledWith({
      active: true,
      message: "Password Reset Email Sent!",
      severity: "success",
    });
  });

  it("should trigger unsuccessful snackbar when password reset button is clicked and API fails", async () => {
    useBookClubUser.mockReturnValueOnce(getUser(true, true));
    const wrapper = shallow(<ProfileData />);

    const mockResponse: AxiosResponse = {
      data: {},
      status: 500,
      statusText: "error",
      headers: {},
      config: {},
    };

    sendPasswordReset.mockRejectedValueOnce();
    wrapper.find(Button).at(1).simulate("click");
    await tick();

    expect(mockTriggerSnackbar).toHaveBeenCalledTimes(1);
    expect(mockTriggerSnackbar).toHaveBeenCalledWith({
      active: true,
      message: "Something went wrong!",
      severity: "error",
    });
  });

  // it('Should not have checkbox checked if getsMail is false', () => {
  //   useBookClubUser.mockReturnValueOnce(getUser(true, true, false));
  //   const wrapper = shallow(<ProfileData />);
  //   expect(wrapper.find(Checkbox).props().checked).toBe(false);
  // });

  // it('Should have checkbox checked if getsMail is true', () => {
  //   useBookClubUser.mockReturnValueOnce(getUser(true, true, true));
  //   const wrapper = shallow(<ProfileData />);
  //   expect(wrapper.find(Checkbox).props().checked).toBe(true);
  // });

  // it('should trigger success snackbar on email preference update', async () => {
  //   useBookClubUser.mockReturnValueOnce(getUser(true, true, false));
  //   //useBookClubUser.mockReturnValueOnce(getUser(true, true, true));
  //   const wrapper = shallow(<ProfileData />);

  //   wrapper.find(Checkbox).simulate('change', { target: { checked: true } });
  //   await tick();

  //   expect(mockTriggerSnackbar).toHaveBeenCalledTimes(1);
  // });
});
