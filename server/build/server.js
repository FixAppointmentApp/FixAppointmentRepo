"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const mysql_1 = __importDefault(require("mysql"));
const Cors = require('cors');
//const multer = require('multer');1
//to hash password the below 2 lines
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();
app.use(express.json());
app.use(Cors());
//upload multer
//const upload = multer({storage:multer.memoryStorage()});1
//corrected
//var upload = multer({ dest: 'uploads/' })
/* var upload = multer({
  dest: 'uploads/',
  storage: multer.memoryStorage()
});  */
//create db & link datas to db
const db = mysql_1.default.createConnection({
    user: "root",
    host: "localhost",
    password: process.env.DATABASEPASSWORD,
    database: process.env.DATABASENAME
});
//saving event's data
app.post('/api/events', /* upload.single('image'), 1*/ (req, res) => {
    const title = req.body.title;
    const host = req.body.host;
    const date = req.body.date;
    const location = req.body.location;
    const image = req.body.image;
    //const image: any = req.body.file.buffer.toString('base64');
    const content = req.body.content;
    db.query("INSERT INTO Events (title,host,date,location,image,content )VALUES(?,?,?,?,?,?)", [title, host, date, location, image, content], (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send({ 'message': 'Data submitted!' });
        }
    });
});
//saving register data
app.post('/api/signUp', (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    //hash password
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (name !== '' && email !== '' && password !== '') {
            db.query('INSERT INTO Register(name, email, password) VALUES (?,?,?)', [name, email, hash], (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send({ 'message': 'Data Registered!' });
                    //res.redirect('/login')
                }
            });
        }
    });
    //
});
//get route
app.get('/', (req, res) => {
    res.json({ message: 'Hello There!' });
});
const PORT = process.env.PORT || 3001;
app.listen('3001', () => {
    console.log(`server is running on port ${PORT}`);
});
