import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import movies_routes from './handlers/movies';
import users_routes from './handlers/users';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

const corsOptions = {
    origin: 'http://localhost:3000/',
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.get('/test-cors', cors(corsOptions),  function (req: Request, res: Response) {
    res.json({msg: 'This is CORS with a middle ware'})
})

users_routes(app);
movies_routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
