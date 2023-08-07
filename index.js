const {urlencoded} = require('express');
const express = require("express");
const cors = require("cors");
const dotenv = require ("dotenv");
dotenv.config();

const  mongoose  = require('mongoose');

const app = express();
const path = require ('path');

const {router} = require('./router');
const PORT = process.env.PORT || 5000;
app.use(cors());
mongoose.set('strictQuery', true)
mongoose.connect(process.env.URI, (error) =>{
 if (error) {
    console.log("Error ti wa 0");
 } else {
    console.log("Oya so wipe oti lo");
 }   
});


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.use("/", router)


app.listen(PORT, ()=>{
    console.log("My server is running")
})