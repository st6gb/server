import express from 'express';
import { query } from '../db';
export const routerLogin = express.Router();

interface IReqBodyLogin {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
}

routerLogin.get('/', (req, res, next) => {
  query('SELECT * FROM users', [], (err, response) => {
    if (err) {
      return next(err)
    }
    res.send(response.rows[0])
  });
})

routerLogin.post('/addUser', (req, res, next) => {
  const { FirstName, LastName, Email, Password }: IReqBodyLogin = req.body;
  let user;
  query(`SELECT Email FROM users WHERE Email='${Email}'`, [], (err, response) => {
    if (err) {
      return next(err)
    }
    user = response.rows[0];
    if(user) {
      return res.status(403).send({ Error: 'User exist'});
    }
  });

  query(
    `INSERT INTO users (FirstName, LastName, Email, Password) VALUES ('${FirstName}', '${LastName}', '${Email}', '${Password}')`, [],
    (err, response) => {
    if (err) {
      return next(err)
    }
    res.send(response.rows[0])
  });
})
