import { Response } from "express";
import { Controller, Middleware, Post } from "@overnightjs/core";
import { config } from "@/config";
import { Admin } from "@/entities/admin";
import { RequestBody } from "@/declarations/Request";
import { AdminValidations } from "@/validations/admin";
import { comparePasswords, generateToken } from "@/utils/auth";

interface LoginBody {
  email: string;
  password: string;
}

@Controller("v1/admin")
export class AdminController {
  @Post("login")
  @Middleware(AdminValidations.login)
  async login(
    request: RequestBody<LoginBody>,
    response: Response
  ): Promise<Response> {
    const user = await Admin.findOneBy({ email: request.body.email || "" });
    if (!user) return response.status(401).send({ error: "Invalid user" });

    const isValidPwd = await comparePasswords(
      request.body.password,
      user.password
    );
    if (!isValidPwd) {
      return response.status(401).send({ error: "Invalid user" });
    }

    return response.send({
      token: generateToken(user.id, config.auth.adminSecret),
    });
  }
}
