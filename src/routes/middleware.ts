import { verfiyJWT } from "../utils/utils";
import { NextFunction, Request, Response } from "express";

// verfying jwt before any DB queries or transactions
export const jwtVerfier = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const jwt = req.headers.authorization as string;
    verfiyJWT(jwt);
    next();
  } catch (err) {
    res.status(401).json(err);
  }
};

export const logger = (req: Request, _: Response, next: NextFunction): void => {
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  console.log("\n");
  console.group("\x1b[33m%s\x1b[0m", "Time of Request: " + time);
  console.log("*************************************************************");
  console.log("\x1b[36m%s\x1b[0m", "Request Received To: " + req.originalUrl);
  console.log("\x1b[33m%s\x1b[0m", "Request Body: ", req.body);
  console.log("*************************************************************");
  console.groupEnd();
  next();
};
