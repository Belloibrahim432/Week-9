import { config } from "dotenv";
import jwt from "jsonwebtoken";
import expess, { Request, Response, NextFunction } from "express";
import User from "./models/userModel";

config();

export interface UserPayload {
  userId: string;
  iat: number;
  exp: number;
}
export function createToken(id: string) {
  const token = jwt.sign(
    { userId: id },
    process.env.SECRET as string,
    {
      expiresIn: "2h",
    }
  );
  return token;
}

export async function verifyToken(req: Request){
  const token = req.header("Authorization") || req.cookies.token;
  if (!token) {
    return false;
  }
  const decoded = jwt.verify(token, process.env.SECRET as string) as UserPayload;
  if(!decoded){
    return false;
  }
  return decoded;
}
