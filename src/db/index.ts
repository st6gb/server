import { Pool, QueryResult } from 'pg';

const pool = new Pool({
  host: 'ec2-46-137-156-205.eu-west-1.compute.amazonaws.com',
  port: 5432,
  database: 'der6trtc5dgrl6',
  user: 'rfdlqbuavwyjnf',
  password: '4b5753c27fa32999220ec14cae131f21c60256adda2a4086ebed2aa0f85b5a5a',
  ssl: true,
});

export const query = (text: string, params: any, callback: (err: Error, result: QueryResult<any>)=> void) => {
  return pool.query(text, params, callback);
}
