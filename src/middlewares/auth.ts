import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!process.env.TOKEN_SECRET) {
      throw new Error('TOKEN_SECRET must be defined');
    } 
    
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ message: 'No token provided.' });
    }

    console.log(authorizationHeader)

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization token not found" });
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    
    //@ts-ignore
    req.user = decoded;
    next();
  } catch (error) {
      res.status(401)
  }
}