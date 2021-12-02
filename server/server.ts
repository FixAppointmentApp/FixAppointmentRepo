const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
//const router = express.Router();
import {Request, Response} from 'express';
import mySql from 'mysql';
const Cors = require('cors');

//to hash password the below 2 lines
const bcrypt = require('bcrypt');
const saltRounds = 10; 
const app = express();

//
const userUpload = require("../routes/index");

app.use(express.json());
app.use(Cors());


//create db & link datas to db
const db = mySql.createConnection({
  user: "root",
  host: "localhost",
  password: process.env.DATABASEPASSWORD,
  database: process.env.DATABASENAME
})
db.connect(function(error){
  if(error)console.log('error')
  else console.log('mySql db is successfully connected!')
})

//saving event's data
app.post('/api/events',/* upload.single('image'), 1*/ (req:Request, res:Response):void=>{
 const title: string = req.body.title;
 const host: string = req.body.host;
  const date: string = req.body.date;
  const location: string = req.body.location;
  const image: string = req.body.image;
  //const image: any = req.body.file.buffer.toString('base64');
  const content: string = req.body.content 

db.query("INSERT INTO Events (title,host,date,location,image,content )VALUES(?,?,?,?,?,?)",
[title, host, date, location, image, content],
(err, data)=>{
  if(err){
    console.log(err)
 } else{
    res.send({'message': 'Data submitted!'})
  }
})
}) 


//signUp route
app.post('/api/signUp', (req:Request, res:Response):void => {
  const {name, email, password} = req.body
  console.log(req.body)

//hash password
bcrypt.hash(password, saltRounds, (err: any, hash:any)=>{  

  if(name !== '' && email !== '' && password !== ''){
  db.query('INSERT INTO Register(name, email, password) VALUES (?,?,?)',
  [name, email, hash], 
  (err, data)=>{
    if(err){
    console.log(err)
   } else{
     res.send({'message': 'Data Registered!'})
     //res.redirect('/login')
    }
  })
}
})
})  

//login route
app.post("/api/logIn", (req:Request, res:Response):void=>{
 //const username: string = req.body.username;
 const email: string = req.body.email;
 const password : string = req.body.password

//for hash func'n we ll delete password from db.query & put it on if function
   db.query(
     "SELECT * FROM Register WHERE email = ?;",
     //[email, password], replaced with z below after hash function
     email,
     (err, result) => {
       if (err) {
         res.send({err: err})
       }  else {
             if(result.length > 0) {
               //res.send(result) replace with the below to compare incripted pass
               bcrypt.compare(password, result[0].password, (error:any, answer:any)=>{
                 if(answer){
//after installing session & cookies we will do the below function
                   req.body.user = result;
                   //req.session.user = result;
                   //console.log(req.session.user)
                   res.send(result)
                 } else {
                   res.send({message: 'wrong pass/email combination!'})//wrong pass
                 }
               })
             } else{
               res.send({message: 'User does not exist!'})//wrong email address
             }
       }
     }
   )
})
//filter result with id
//show all datas for db
app.get("/api/showData/:id", (req: Request, res: Response): void => {
  const id = req.params.id;
  db.query("SELECT * FROM Project.Events WHERE id=?",id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});


//get route
app.get('/', (req:Request, res:Response): void =>{
  res.json({message: 'Hello There!'})
}) 
//to upload images: localhost:3001/user/upload
//app.use('/api', userUpload);
app.use("/user", userUpload);


const PORT = process.env.PORT || 3001;
app.listen('3001', ():void=>{
  console.log(`server is running on port ${PORT}`)
})
 

 