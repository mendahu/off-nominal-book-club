import { NextApiRequest } from "next";
import { updateMarketingUser } from "../../../../../pages/api/marketing/users/update";
import { MailchimpSubscriberStatus } from "../../../../types/api/apiTypes.d";
import { getAuth0User } from "../../../../helpers/auth0/auth0User";
import md5 from "md5";
import { getSession } from "@auth0/nextjs-auth0";
const mailchimp = require("@mailchimp/mailchimp_marketing");
jest.mock("../../../../helpers/auth0/auth0User");
jest.spyOn(mailchimp.lists, "setListMember");
jest.spyOn(mailchimp.lists, "updateListMemberTags");

describe("api/marketing/users/update", () => {
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
      const response = await updateMarketingUser(
        generateMockReqWithMethod("DELETE"),
        mockRes()
      );
      expect(response.status).toEqual(405);
    });

    it("should return 405 if PUT method used", async () => {
      const response = await updateMarketingUser(
        generateMockReqWithMethod("PUT"),
        mockRes()
      );
      expect(response.status).toEqual(405);
    });

    it("should return 405 if GET method used", async () => {
      const response = await updateMarketingUser(
        generateMockReqWithMethod("GET"),
        mockRes()
      );
      expect(response.status).toEqual(405);
    });

    it("should return 405 if POST method used", async () => {
      const response = await updateMarketingUser(
        generateMockReqWithMethod("POST"),
        mockRes()
      );
      expect(response.status).toEqual(405);
    });
  });

  describe("Data validation", () => {
    it("should return 400 if missing body", async () => {
      const mockReq = {
        method: "PATCH",
      } as NextApiRequest;

      const response = await updateMarketingUser(mockReq, mockRes());
      expect(response.status).toEqual(400);
    });

    it("should return 400 if missing body parameter 1", async () => {
      const mockReq = {
        method: "PATCH",
        body: {
          newStatus: MailchimpSubscriberStatus.subscribed,
        },
      } as NextApiRequest;

      const response = await updateMarketingUser(mockReq, mockRes());
      expect(response.status).toEqual(400);
    });

    it("should return 400 if missing body parameter 2", async () => {
      const mockReq = {
        method: "PATCH",
        body: {
          subscriberStatus: MailchimpSubscriberStatus.unsubscribed,
        },
      } as NextApiRequest;

      const response = await updateMarketingUser(mockReq, mockRes());
      expect(response.status).toEqual(400);
    });

    it("should return 422 if email returned is not a string", async () => {
      const mockReq = {
        method: "PATCH",
        body: {
          newStatus: MailchimpSubscriberStatus.subscribed,
          subscriberStatus: MailchimpSubscriberStatus.unsubscribed,
        },
      } as NextApiRequest;
      getSession.mockResolvedValueOnce({
        user: { sub: "usersubstring" },
      });
      getAuth0User.mockResolvedValueOnce({ email: false });

      const response = await updateMarketingUser(mockReq, mockRes());
      expect(response.status).toEqual(422);
    });
  });

  describe("User fetching errors", () => {
    const mockReq = {
      method: "PATCH",
      body: {
        subscriberStatus: MailchimpSubscriberStatus.unsubscribed,
        newStatus: MailchimpSubscriberStatus.subscribed,
      },
    } as NextApiRequest;

    it("should return 500 if session fetch fails", async () => {
      getSession.mockRejectedValueOnce("womp");
      const response = await updateMarketingUser(mockReq, mockRes());
      expect(response.status).toEqual(500);
    });

    it("should return 500 if user fetch fails", async () => {
      getSession.mockResolvedValueOnce({
        user: { sub: "usersubstring" },
      });
      getAuth0User.mockRejectedValueOnce("womp");
      const response = await updateMarketingUser(mockReq, mockRes());
      expect(response.status).toEqual(500);
    });
  });

  describe("marketing API calls", () => {
    const mockReq = {
      method: "PATCH",
      body: {
        subscriberStatus: MailchimpSubscriberStatus.unsubscribed,
        newStatus: MailchimpSubscriberStatus.subscribed,
      },
    } as NextApiRequest;

    beforeEach(() => {
      getSession.mockResolvedValueOnce({
        user: { sub: "usersubstring" },
      });
      getAuth0User.mockResolvedValueOnce({ email: "email@email.com" });
    });

    it("should return status 200 and called the marketing api", async () => {
      mailchimp.lists.setListMember.mockResolvedValueOnce("woo");
      mailchimp.lists.updateListMemberTags.mockResolvedValueOnce("woo");

      const response = await updateMarketingUser(mockReq, mockRes());

      expect(response.status).toEqual(200);
      expect(mailchimp.lists.setListMember).toHaveBeenCalledWith(
        "mockMailChimpListId",
        md5("email@email.com"),
        {
          email_address: "email@email.com",
          status_if_new: MailchimpSubscriberStatus.subscribed,
          status: MailchimpSubscriberStatus.subscribed,
        }
      );
      expect(mailchimp.lists.updateListMemberTags).toHaveBeenCalledWith(
        "mockMailChimpListId",
        md5("email@email.com"),
        {
          body: {
            tags: [
              {
                name: "Book Club",
                status: "active",
              },
            ],
          },
        }
      );
    });

    it("should return 500 if mailchimp update tags api fails", async () => {
      mailchimp.lists.setListMember.mockResolvedValueOnce("woo");
      mailchimp.lists.updateListMemberTags.mockRejectedValueOnce("womp");

      const response = await updateMarketingUser(mockReq, mockRes());

      expect(response.status).toEqual(500);
      expect(mailchimp.lists.setListMember).toHaveBeenCalledWith(
        "mockMailChimpListId",
        md5("email@email.com"),
        {
          email_address: "email@email.com",
          status_if_new: MailchimpSubscriberStatus.subscribed,
          status: MailchimpSubscriberStatus.subscribed,
        }
      );
      expect(mailchimp.lists.updateListMemberTags).toHaveBeenCalledWith(
        "mockMailChimpListId",
        md5("email@email.com"),
        {
          body: {
            tags: [
              {
                name: "Book Club",
                status: "active",
              },
            ],
          },
        }
      );
    });

    it("should return 500 if mailchimp set user api fails", async () => {
      mailchimp.lists.setListMember.mockRejectedValueOnce("womp");

      const response = await updateMarketingUser(mockReq, mockRes());

      expect(response.status).toEqual(500);
      expect(mailchimp.lists.setListMember).toHaveBeenCalledWith(
        "mockMailChimpListId",
        md5("email@email.com"),
        {
          email_address: "email@email.com",
          status_if_new: MailchimpSubscriberStatus.subscribed,
          status: MailchimpSubscriberStatus.subscribed,
        }
      );
      expect(mailchimp.lists.updateListMemberTags).not.toHaveBeenCalled();
    });
  });
});
