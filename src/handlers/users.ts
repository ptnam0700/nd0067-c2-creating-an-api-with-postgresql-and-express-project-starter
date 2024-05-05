import dotenv from 'dotenv';
import express, { Request, Response } from "express";
import { UserInput, UserStore } from "../models/users";
import { sign } from "jsonwebtoken";
import { verifyAuthToken } from '../middlewares/auth';

dotenv.config();
const tokenSecret = process.env.TOKEN_SECRET as string;

export const user_routes = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", create);
  app.post("/users/login", login);
};

const store = new UserStore();

const index = async (_: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(parseInt(req.params.id));
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: UserInput = {
      firstname: req.body.firstname as string,
      lastname: req.body.lastname as string,
      password: req.body.password as string,
    };

    const newUser = await store.create(user);

    res.json(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const userInput: UserInput = {
      firstname: req.body.firstname as string,
      lastname: req.body.lastname as string,
      password: req.body.password as string,
    };

    const user = await store.login(userInput);

    if(!user) throw new Error("User not found");

    if(!tokenSecret) {
      throw new Error('TOKEN_SECRET must be defined');
    } 

    const token = sign({ user: user }, tokenSecret);
    res.json(token);
  } catch (error) {
    res.status(500).send(error);
  }
};
