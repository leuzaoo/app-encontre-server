import { Request, Response, NextFunction } from "express";
import { decodeToken } from "@/utils/auth";

export function authMiddleware(
  request: Partial<Request>,
  response: Partial<Response>,
  next: NextFunction
): void {
  const authorization = request.headers?.["authorization"];
  const token = authorization?.split(" ")?.[1];
  try {
    const claims = decodeToken(token || "");
    request.context = { userId: claims.sub as string };
    next();
  } catch (error) {
    if (error instanceof Error) {
      response.status?.(401).send({ error: error.message });
    } else {
      response.status?.(401).send({ error: "Unknown auth error" });
    }
  }
}
