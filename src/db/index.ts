import { Pool, QueryResult } from 'pg';

const pool = new Pool({
  host: '127.0.0.1',
  port: 5432,
  database: 'test1',
  user: 'postgres',
  password: 'admin'
});

export const query = (text: string, params: any, callback: (err: Error, result: QueryResult<any>)=> void) => {
  return pool.query(text, params, callback);
}
