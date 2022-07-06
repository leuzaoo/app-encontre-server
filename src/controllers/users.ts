import { Request, Response } from "express";
import { Controller, Get, Post, Middleware } from "@overnightjs/core";
import { hashPassword, comparePasswords, generateToken } from "@/utils/auth";
import { sendEmail } from "@/utils/email";
import { RequestBody } from "@/declarations/Request";
import { authMiddleware } from "@/middlewares/auth";
import { User } from "@/entities/user";
import { config } from "@/config";

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
    const user = await User.findOneBy({ id: request.context.userId || "" });
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
    const existingUser = await User.findOneBy({
      email: request.body.email || "",
    });
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
    const user = await User.findOneBy({ email: request.body.email || "" });
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

  @Post("recover-password")
  async recoverPassword(
    request: RequestBody<{ email: string }>,
    response: Response
  ): Promise<Response> {
    try {
      const user = await User.findOneBy({
        email: request.body.email || "",
      });
      if (!user) return response.status(400).send({ error: "Email not found" });

      const token = generateToken(user.id);
      const url = `${config.client}/reset-password?token=${token}`;
      await sendEmail({
        to: request.body.email,
        content: `<a href="${url}">${url}</a>`,
        subject: "App Encontre: Reset de senha",
      });
      return response.send(true);
    } catch (error) {
      return response.status(400).send(false);
    }
  }
}
