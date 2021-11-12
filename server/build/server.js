"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const Cors = require('cors');
//const routes = require('/');//api
const app = (0, express_1.default)();
const multer = require('multer');
app.use(express_1.default.json());
app.use(Cors());
//upload multer
//const upload = multer({storage:multer.memoryStorage()});
var upload = multer({
    dest: 'uploads/',
    storage: multer.memoryStorage()
});
//create db & link datas to db
const db = mysql_1.default.createConnection({
    user: "root",
    host: "localhost",
    password: process.env.DATABASEPASSWORD,
    database: process.env.DATABASENAME
});
//saving data to db. image is the file name on frontend & file the type on client
app.post('/events', upload.single('image'), (req, res) => {
    const title = req.body.title;
    const host = req.body.host;
    const date = req.body.date;
    const location = req.body.location;
    const image = req.body.file.buffer.toString('base64');
    // const image: string = req.body.image;
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
/* app.get('/', (req:Request, res:Response): void =>{
  res.json({message: 'hi there'})
}) */
//const PORT = process.env.PORT || 3001;
//app.listen(PORT, console.log(`Server runs on port: ${PORT}`));
const PORT = process.env.PORT || 3001;
app.listen('3001', () => {
    console.log(`server is running on port ${PORT}`);
});
