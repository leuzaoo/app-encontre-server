import * as yup from "yup";
import { Request, Response, NextFunction } from "express";
import { validate } from "@/utils/validate";

export const AdminValidations = {
  async login(request: Request, response: Response, next: NextFunction) {
    try {
      await validate(request, {
        email: yup.string().required().email().label("Email"),
        password: yup.string().required().label("Password"),
      });
      return next();
    } catch (error) {
      const { name, message, inner } = error as yup.ValidationError;
      return response.status(400).json({
        type: name,
        message,
        errors: inner.map(({ errors }) => errors[0]),
      });
    }
  },
};
