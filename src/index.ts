import express from 'express';
import bodyParser from 'body-parser';
import { Pool } from 'pg';

const app = express();
let port = process.env.PORT;
if (!port) {
  port = '8000';
}

const pool = new Pool({
  host: '127.0.0.1',
  port: 5432,
  database: 'test1',
  user: 'postgres',
  password: 'admin'
});

const sql = `SELECT * FROM users`;
pool.query(sql, [], (err, res) => {
  console.dir({ res });
  console.table( res.fields );
  console.table( res.rows );
  pool.end();
});

app.all('*', function(req, res, next) {
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

app.get('/', (req, res) => {
  res.json({'lala':'Hello World!'})
  }
)

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