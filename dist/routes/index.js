"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
exports.routerLogin = express_1.default.Router();
exports.routerLogin.get('/', (req, res, next) => {
    db_1.query('SELECT * FROM users', [], (err, response) => {
        if (err) {
            return next(err);
        }
        console.log(response);
        res.send(response.rows[0]);
    });
    // res.sendStatus(200);
});
exports.routerLogin.post('/addUser', (req, res, next) => {
    db_1.query("INSERT INTO users (FirstName, Email, Password) VALUES ('Tom', 'user@user.ru', '123123')", [], (err, response) => {
        if (err) {
            return next(err);
        }
        console.log(response);
        res.send(response.rows[0]);
    });
    // res.sendStatus(200);
});
//# sourceMappingURL=index.js.map