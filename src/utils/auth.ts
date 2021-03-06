import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "@/config";

export function hashPassword(password: string) {
  const salt = config.auth.salt;
  return bcrypt.hash(password, salt);
}

export function comparePasswords(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(sub: string, secret?: string): string {
  return jwt.sign({ sub }, secret || config.auth.secret);
}

export function decodeToken(token: string): string | JwtPayload {
  return jwt.verify(token, config.auth.secret);
}
