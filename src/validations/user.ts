import * as yup from "yup";
import { Request, Response, NextFunction } from "express";
import { validate } from "@/utils/validate";

export const UserValidations = {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      await validate(request, {
        email: yup.string().required().email().label("Email"),
        password: yup.string().required().min(6).label("Password"),
        name: yup.string().required().label("Name"),
        lastName: yup.string().required().label("Last name"),
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
  async authenticate(request: Request, response: Response, next: NextFunction) {
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
  async recoverPassword(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      await validate(request, {
        email: yup.string().required().email().label("Email"),
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
  async resetPassword(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      await validate(request, {
        token: yup.string().required().label("Token"),
        password: yup.string().required().min(6).label("Password"),
        confirm: yup.string().required().min(6).label("Password confirmation"),
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
