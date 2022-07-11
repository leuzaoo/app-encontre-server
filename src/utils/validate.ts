import { Request } from "express";
import { ObjectShape } from "yup/lib/object";
import * as yup from "yup";

export function validate(request: Request, value: ObjectShape) {
  const schema = yup.object({ body: yup.object(value) });
  return schema.validate({ body: request.body }, { abortEarly: false });
}
