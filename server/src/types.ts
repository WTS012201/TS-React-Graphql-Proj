import { Request, Response } from "express";
import { Session } from "express-session";
import { Redis } from "ioredis";

export type MyContext = {
  req: Request & { session: Session & { userId: number } }; //  req.session.userId
  res: Response;
  redisClient: Redis;
};
