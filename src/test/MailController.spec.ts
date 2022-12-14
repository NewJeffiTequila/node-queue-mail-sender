import { Request, Response } from "express";
import MailController from "../controllers/MailController";

test("adds 1 + 2 to equal 3", () => {
  expect(MailController.sum(1, 2)).toBe(3);
});

test("return data user", () => {
  const res = { status: () => res, json: () => res };
  // res.status = () => res;
  // res.json = () => res;
  // return res;
  const mockResponse = {};

  const req = {
    body: {
      email: "jeffitequila.com",
      name: "Jefferson Queiroz Costa",
    },
  };

  // const req:Request =  ;

  expect(MailController.store(req, "")).toBe("");
});
