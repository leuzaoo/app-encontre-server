import { Response } from "express";
import { Controller, Post } from "@overnightjs/core";
import { RequestBody } from "@/declarations/Request";
import { User } from "@/entities/user";
import { hashPassword, generateToken } from "@/utils/auth";

interface CreateBody {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

@Controller("v1/users")
export class UsersController {
  @Post("")
  async create(
    request: RequestBody<CreateBody>,
    response: Response
  ): Promise<void> {
    const password = await hashPassword(request.body.password);
    const user = await User.create({ ...request.body, password }).save();
    const token = generateToken(user.id);

    response.send({ token });
  }
}
