"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const pg_1 = require("pg");
const app = express_1.default();
let port = process.env.PORT;
if (!port) {
    port = '8000';
}
const pool = new pg_1.Pool({
    host: '127.0.0.1',
    port: 5432,
    database: 'test1',
    user: 'postgres',
    password: 'admin'
});
const sql = `SELECT * FROM users`;
pool.query(sql, [], (err, res) => {
    console.dir({ res });
    console.table(res.fields);
    console.table(res.rows);
    pool.end();
});
app.all('*', function (req, res, next) {
    const origin = req.get('origin');
    res.header('Access-Control-Allow-Origin', origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: false
}));
app.get('/', (req, res) => {
    res.json({ 'lala': 'Hello World!' });
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
    res.status(200).sendFile(filename, options);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//# sourceMappingURL=index.js.map