
const express = require('express');
const rout = express.Router();
const multer = require("multer")
const {storage} = require("./upload.js")
// const upload = multer({dest: 'assets/postimages'});
const upload = multer({storage});

const { createPost, getPost, deletePost, editPost } = require("./controllers/backController");
const { register, login, userProfile, getUser } = require('./controllers/userController');
const { verifyUser } = require('./middlewares/authMiddleware.js');


rout.post("/new-post", upload.single("picture"), createPost )
rout.get("/get-post", getPost );
rout.delete("/delpost/:_id", deletePost)
rout.get("/edit-post/:_id", editPost)
rout.post("/register", register)
rout.post("/login", login)
rout.get("/userProfile", userProfile)
rout.get("/getUser",verifyUser, getUser)

module.exports = {rout}