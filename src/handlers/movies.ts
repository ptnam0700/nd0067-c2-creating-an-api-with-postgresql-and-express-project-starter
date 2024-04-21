import express, { Request, Response } from "express";
import { MythicalWeaponStore } from "../models/mythical_weapons";
import { Movie, MovieStore } from "../models/movies";
import { verifyAuthToken } from "../middlewares/auth";

const store = new MovieStore();

const index = async (_req: Request, res: Response) => {
  const weapons = await store.index()
  res.json(weapons);
}

const create = async (req: Request, res: Response) => {
  try {
      const movie: Movie = {
          id: 0, 
          title: req.body.title,
          genre: req.body.genre,
          movie_length: req.body.movie_length,
          created_by: req.body.user.username
      }

      const newArticle = await store.create(movie)
      res.json(newArticle)
  } catch(err) {
      res.status(400)
      res.json(err)
  }
}

const movies_routes = (app: express.Application) => {
  app.get('/movies', index);
  app.post('/movies', verifyAuthToken, create)
}

export default movies_routes;