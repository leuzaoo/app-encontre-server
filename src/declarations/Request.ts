import { Request } from "express";

export interface RequestBody<BodyParams> extends Request {
  body: BodyParams;
}
