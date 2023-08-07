
const express = require("express");
const router = express.Router();
const multer = require("multer")
const upload = multer({dest: 'assets/postimages'});

const { PostCreate, delPost, allPost, homePost, viewPost,
     ediPost, editPost, aboutPost, profilePost, newPostt } = require('./controllers/postController');


router.get("/", (req, res)=>{
    res.send("My name is Elijah")
})



router.get("/profile/:username", profilePost)


router.get("/newpost", newPostt)

router.post("/new-post", upload.single("picture"), PostCreate)


router.get("/contact", allPost)

router.get("/home", homePost)

router.get("/about", aboutPost  )

router.post("/delpost/:_id", delPost)

router.post("/view/:_id", viewPost)

router.post("/edit/:_id", ediPost)

router.post("/editmore/:_id",editPost)

module.exports = {router};