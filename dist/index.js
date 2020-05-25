"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const routes_1 = require("./routes");
const SECRET = 'secret';
const app = express_1.default();
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
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: false
}));
app.use('/login', routes_1.routerLogin);
app.get('/', (req, res) => {
    const token = jsonwebtoken_1.default.sign({ foo: 'bar' }, SECRET);
    res.json({ token });
});
app.get('/protected', (req, res) => {
    const token = req.headers.authorization;
    console.log(token);
    const decoded = jsonwebtoken_1.default.verify(token, SECRET);
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
    res.status(200).sendFile(filename, options);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//# sourceMappingURL=index.js.map