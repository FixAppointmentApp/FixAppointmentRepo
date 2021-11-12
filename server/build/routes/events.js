"use strict";
/* const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const router = express.Router();

import {Request, Response} from 'express';
import mySql from 'mysql';
const Cors = require('cors');

const app = express();

app.use(express.json());
app.use(Cors());

//create db & link datas to db
const db = mySql.createConnection({
  user: "root",
  host: "localhost",
  password: "ashuMysql@21",//process.env.DATABASEPASSWORD,
  database: "Project"
})

//saving data to db
router.post('/events', (req:Request, res:Response):void=>{
  const title: string = req.body.title;
  const host: string = req.body.host;
  const date: string = req.body.date;
  const location: string = req.body.location;
  const image: string = req.body.image;
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

const PORT = process.env.PORT || 3001;
app.listen('3001', ():void=>{
  console.log(`server is running on port ${PORT}`)
})
 */
//module.exports = router;
