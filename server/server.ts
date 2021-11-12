const dotenv = require("dotenv");
dotenv.config();
import express from 'express';
import {Request, Response} from 'express';
import mySql from 'mysql';
//var fs = require("fs");
const Cors = require('cors');
//const routes = require('/');//api
const app = express();
const multer = require('multer');

app.use(express.json());
app.use(Cors());

//upload multer
const upload = multer({storage:multer.memoryStorage()});
//corrected
//var upload = multer({ dest: 'uploads/' })

/* var upload = multer({
  dest: 'uploads/',
  storage: multer.memoryStorage()
});  */

//create db & link datas to db
const db = mySql.createConnection({
  user: "root",
  host: "localhost",
  password: process.env.DATABASEPASSWORD,
  database: process.env.DATABASENAME
}) 
//saving data to db. image is the file name on frontend & file the type on client
app.post('/events', upload.single('image'), (req:Request, res:Response):void=>{
  /* var raw = new Buffer (req.body.file.buffer.toString(), 'base64');
  fs.writeFile('./uploads/upload.png', raw, function (err) {
    if (err) {
      console.log('Error');
      return next(err);
    }
    res.end('Success!');
  });  */


  const title: string = req.body.title;
  const host: string = req.body.host;
  const date: string = req.body.date;
  const location: string = req.body.location;
  const image: any = req.body.file.buffer.toString('base64');//to be adjested with frontend
 // const image: string = req.body.image;
  const content: string = req.body.content

db.query("INSERT INTO CreateEvents (title, host, date, location, image, content)VALUES(?,?,?,?,?,?)",
[title, host, date, location, image, content],
(err, data)=>{
  if(err){
    console.log(err)
  } else{
    res.send({'message': 'Data submitted!'})
  }
}
)
}) 


/* app.get('/', (req:Request, res:Response): void =>{
  res.json({message: 'hi there'})
}) */



//const PORT = process.env.PORT || 3001;

//app.listen(PORT, console.log(`Server runs on port: ${PORT}`));

const PORT = process.env.PORT || 3001;
app.listen('3001', ():void=>{
  console.log(`server is running on port ${PORT}`)
}) 