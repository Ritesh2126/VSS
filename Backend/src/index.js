let express = require('express');
let bodyparser  = require('body-parser');
// let mysql = require('mysql2');
// let upload = require('./multer');
let pool= require("./Database/pool")
let userRouter=require("./controller/user/index")
let UserModel = require("./Models/usermodels")
const userModel = new UserModel(pool);
const cors = require('cors');
const path = require('path');
const dotenv = require("dotenv")

dotenv.config();

const app=express();
app.use(bodyparser.json());
app.use(cors());

pool.getConnection((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
}); 

app.use('/images', express.static(path.join(__dirname, 'public')));


// app.use('/', function(req, res, next) {
//     res.render('index', { title: 'Express' });
//   });

app.use("/api/users", userRouter);
app.use(cors({
    origin: 'http://127.0.0.1:5173', // Replace with your frontend origin
  }));

const port=process.env.MAIN_PORT
// Starting the server
app.listen(process.env.MAIN_PORT,function(req,res){
    console.log("server is run ",port)
})
