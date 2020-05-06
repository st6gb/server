import express from 'express';
import { query } from '../db';
export const routerLogin = express.Router();

routerLogin.get('/', (req, res) => {
  console.log('login');
  res.sendStatus(200);
})
