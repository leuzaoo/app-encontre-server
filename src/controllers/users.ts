import { Response } from "express";
import { Controller, Post } from "@overnightjs/core";
import { RequestBody } from "@/declarations/Request";
import { User } from "@/entities/user";
import { hashPassword, comparePasswords, generateToken } from "@/utils/auth";

interface CreateBody {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

interface AuthenticateBody {
  email: string;
  password: string;
}

@Controller("v1/users")
export class UsersController {
  @Post("")
  async create(
    request: RequestBody<CreateBody>,
    response: Response
  ): Promise<Response> {
    const existingUser = await User.findOneBy({ email: request.body.email });
    if (existingUser) {
      return response.status(401).send({ error: "Email already used" });
    }

    const password = await hashPassword(request.body.password);
    const user = await User.create({ ...request.body, password }).save();
    const token = generateToken(user.id);

    return response.send({ token });
  }

  @Post("authenticate")
  async authenticate(
    request: RequestBody<AuthenticateBody>,
    response: Response
  ): Promise<Response> {
    const user = await User.findOneBy({ email: request.body.email });
    if (!user) return response.status(401).send({ error: "Invalid user" });

    const isValidPwd = await comparePasswords(
      request.body.password,
      user.password
    );
    if (!isValidPwd) {
      return response.status(401).send({ error: "Invalid user" });
    }

    return response.send({ token: generateToken(user.id) });
  }
}
