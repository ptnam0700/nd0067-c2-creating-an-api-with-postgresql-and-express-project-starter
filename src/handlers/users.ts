import express, { Request, Response } from "express";
import { User, UserStore } from "../models/users";
import jwt from 'jsonwebtoken';

const store = new UserStore();

const create = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

      const user: User = {
          id: "",
          username: username,
          password: password,
          password_digest: "",
      }

      const newUser = await store.create(user)

      if(!process.env.TOKEN_SECRET) {
        throw new Error('TOKEN_SECRET must be defined');
      } 

      const token = jwt.sign(newUser , process.env.TOKEN_SECRET);
      res.json(token)

  } catch(err) {
      res.status(400)
      res.json(err)
  }
}

const authenticate = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await store.authenticate(username, password);

    if(!process.env.TOKEN_SECRET) {
      throw new Error('TOKEN_SECRET must be defined');
    } 

    var token = jwt.sign({ user: user }, process.env.TOKEN_SECRET);
    res.json(token);

  } catch (error) {
    res.status(401)
    res.json(error)
  }
}

const users_routes = (app: express.Application) => {
  app.post('/users', create)
  app.post('/users/authenticate', authenticate)
}

export default users_routes;