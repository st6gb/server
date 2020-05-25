import jwtExpress from 'express-jwt';
import express from 'express';
import bodyParser from 'body-parser';

import guard from 'express-jwt-permissions';
import jwt from 'jsonwebtoken';

import { routerLogin } from './routes';
const SECRET = 'secret';


const app = express();
let port = process.env.PORT;
if (!port) {
  port = '8000';
}

app.all('*', (req, res, next) => {
  const origin = req.get('origin');
  res.header('Access-Control-Allow-Origin', origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/login', routerLogin)

app.get('/', (req, res) => {
  const token = jwt.sign({ foo: 'bar' }, SECRET);
  res.json({token})
  }
)

app.get('/protected',
  (req, res) => {
    const token = req.headers.authorization;
    console.log(token)
    const decoded = jwt.verify(token, SECRET);
    console.log(decoded);
    res.sendStatus(200);
  });

app.get('/file/:name', (req, res) => {
  const options = {
    root: __dirname + '/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  const filename = req.params.name;
  res.status(200).sendFile(filename, options)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))