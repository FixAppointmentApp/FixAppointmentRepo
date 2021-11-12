"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const Cors = require('cors');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(Cors());
//create db & link datas to db
const db = mysql_1.default.createConnection({
    user: "root",
    host: "localhost",
    password: "ashuMysql@21",
    database: "Project"
});
//saving data to db
app.post('/events', (req, res) => {
    const title = req.body.title;
    const host = req.body.host;
    const date = req.body.date;
    const location = req.body.location;
    const image = req.body.image;
    const content = req.body.content;
    db.query("INSERT INTO CreateEvents (title, host, date, location, image, content)VALUES(?,?,?,?,?,?)", [title, host, date, location, image, content], (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send({ 'message': 'Data submitted!' });
        }
    });
});
app.get('/', (req, res) => {
    res.json({ message: 'hi there' });
});
app.listen('3001', () => {
    console.log('server is running');
});
