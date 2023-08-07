const express = require("express");
const cors = require("cors");
const dotenv = require ("dotenv");
dotenv.config();

const app = express();
const path = require ('path');
const  mongoose  = require('mongoose');
const { rout } = require("./routerBack");
const PORT = process.env.PORT || 5000;
app.use(cors());

// socket
const http = require("http");
const {  Server } = require("socket.io");
const server = http.createServer(app);

const io =  new Server(server, {
   cors:{
      origin: '*'
   }
})
   let users = [];

io.on('connection', (socket) =>{
   socket.on("join-socket", (_id)=>{
      const exist = users.find((each)=> each._id == id);
      if (exist) {
         users = users.map(each => each._id == _id ? {socketId: socket.id, ...each} : each);
      } else {
         users.push({_id, socketId: socket.id});
      }
   })
   console.log("User connected" + socket.id);
   socket.on("user-active", (message)=>{
      console.log(message);
   })

   socket.on("send-message", (message) => {
      socket.broadcast.emit("message-sent", message)
   })

   socket.on("join-group", (group) => {
      socket.join(group)
   })

   socket.on("send-msg-to-group", ({group, chat}) => {
      socket.to(group).emit( "send-msg-to-group",chat);
   })
})




mongoose.set('strictQuery', true)
// mongoose.connect(process.env.URI, (error) =>{
//  if (error) {
//     console.log("Error ti wa 0", error.message);
//  } else {
//     console.log("Oya so wipe oti lo");
//  }   
// });

mongoose.connect(process.env.URI).then(res =>{
   console.log("db connected");
}).catch(err =>{
   console.log( err , "An occurred while connecting to the db");
})


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,'/assets')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use("/",rout )

server.listen(PORT, ()=>{
    console.log("My server is running")
})