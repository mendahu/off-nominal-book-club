import { NextApiRequest } from "next";
import { newMarketingUser } from "../../../../../pages/api/marketing/users/new";
import { getAuth0User } from "../../../../helpers/auth0/auth0User";
import { getSession } from "@auth0/nextjs-auth0";
const mailchimp = require("@mailchimp/mailchimp_marketing");
jest.mock("../../../../helpers/auth0/auth0User");
jest.spyOn(mailchimp.lists, "addListMember");

describe("api/marketing/users/new", () => {
  const mockRes = () => {
    const res: any = {};
    res.status = (code) => {
      res.status = code;
      return res;
    };
    res.json = (response) => {
      res.response = response;
      return res;
    };
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Method Checks", () => {
    const generateMockReqWithMethod = (method: string): NextApiRequest => {
      return {
        method,
      } as NextApiRequest;
    };

    it("should return 405 if DELETE method used", async () => {
      const response = await newMarketingUser(
        generateMockReqWithMethod("DELETE"),
        mockRes()
      );
      expect(response.status).toEqual(405);
    });

    it("should return 405 if PUT method used", async () => {
      const response = await newMarketingUser(
        generateMockReqWithMethod("PUT"),
        mockRes()
      );
      expect(response.status).toEqual(405);
    });

    it("should return 405 if GET method used", async () => {
      const response = await newMarketingUser(
        generateMockReqWithMethod("GET"),
        mockRes()
      );
      expect(response.status).toEqual(405);
    });

    it("should return 405 if PATCH method used", async () => {
      const response = await newMarketingUser(
        generateMockReqWithMethod("PATCH"),
        mockRes()
      );
      expect(response.status).toEqual(405);
    });
  });

  describe("User fetching errors", () => {
    const mockReq = {
      method: "POST",
    } as NextApiRequest;

    it("should return 500 if session fetch fails", async () => {
      getSession.mockRejectedValueOnce("womp");
      const response = await newMarketingUser(mockReq, mockRes());
      expect(response.status).toEqual(500);
    });

    it("should return 500 if user fetch fails", async () => {
      getSession.mockResolvedValueOnce({
        user: { sub: "usersubstring" },
      });
      getAuth0User.mockRejectedValueOnce("womp");
      const response = await newMarketingUser(mockReq, mockRes());
      expect(response.status).toEqual(500);
    });
  });

  describe("marketing API calls", () => {
    const mockReq = {
      method: "POST",
    } as NextApiRequest;

    beforeEach(() => {
      getSession.mockResolvedValueOnce({
        user: { sub: "usersubstring" },
      });
      getAuth0User.mockResolvedValueOnce({ email: "email@email.com" });
    });

    it("should return status 200 and called the marketing api", async () => {
      mailchimp.lists.addListMember.mockResolvedValueOnce("woo");
      const response = await newMarketingUser(mockReq, mockRes());
      expect(response.status).toEqual(200);
      expect(mailchimp.lists.addListMember).toHaveBeenCalledWith(
        "mockMailChimpListId",
        {
          email_address: "email@email.com",
          status: "subscribed",
          tags: ["Book Club"],
        }
      );
    });

    it("should return 500 if mailchimp api fails", async () => {
      mailchimp.lists.addListMember.mockRejectedValueOnce("womp");
      const response = await newMarketingUser(mockReq, mockRes());
      expect(response.status).toEqual(500);
      expect(mailchimp.lists.addListMember).toHaveBeenCalledWith(
        "mockMailChimpListId",
        {
          email_address: "email@email.com",
          status: "subscribed",
          tags: ["Book Club"],
        }
      );
    });
  });
});
