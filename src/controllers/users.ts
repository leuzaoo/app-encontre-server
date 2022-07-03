import { Request, Response } from "express";
import { Controller, Get, Post, Middleware } from "@overnightjs/core";
import { hashPassword, comparePasswords, generateToken } from "@/utils/auth";
import { RequestBody } from "@/declarations/Request";
import { authMiddleware } from "@/middlewares/auth";
import { User } from "@/entities/user";

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
  @Get("profile")
  @Middleware(authMiddleware)
  async profile(request: Request, response: Response): Promise<Response> {
    const user = await User.findOneBy({ id: request.context.userId });
    if (!user) {
      return response.status(401).send({ error: "User not found" });
    }
    return response.send({
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
    });
  }

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
