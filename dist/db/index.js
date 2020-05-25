"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: 'ec2-46-137-156-205.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'der6trtc5dgrl6',
    user: 'rfdlqbuavwyjnf',
    password: '4b5753c27fa32999220ec14cae131f21c60256adda2a4086ebed2aa0f85b5a5a',
    ssl: true,
});
exports.query = (text, params, callback) => {
    return pool.query(text, params, callback);
};
//# sourceMappingURL=index.js.map