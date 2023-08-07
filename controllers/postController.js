const Post = require("../Model/postModel");

// const Post = require("../postModel");
let posts =[];

const PostCreate = (req,res)=>{
    const {title, more} = req.body; 
    const {filename} = req.file ; 
    posts.push = ({title, more, imagePath: filename});  
    Post.create({title, more, imagePath: filename},(err,message)=>{
        if (err) {
            res.status(500).json({
            success:false,
            message:"An error occured"
            })
            console.log(err);
        } else{
        res.json({
            success: true,
            data: message,
            message: "Successful"
        })
        }
    })             
}

const delPost = (req,res) =>{
    const{_id} = req.params;

    Post.deleteOne({_id}, (error, message)=>{
        if (error){
            console.log(error)
            res.send("An error occured")
        }else{
            res.redirect("/contact");
        }
    })
}

const allPost =(req, res)=>{
     
    data11 = new Date().toLocaleTimeString("en");
    Post.find().then((Posts)=>{
        res.render("contact", { Posts, data11});
    })
    .catch((error)=>{
        console.log(error);
    })
}

const homePost =(req, res)=>{
    const myName = "Olawale";
    const user = {
        school : "Lautech",
        Dept : "Software Enginnering"
    };
    const numbers = [0,1,2,3,4,5,6,7,8,9];
    res.render("home", {name: myName, user, numbers} );
}

const viewPost = (req,res) =>{
    const {_id} = req.params;
    data11 = new Date().toLocaleTimeString("en");
    Post.findById(_id,(error,message)=>{
        if (error) {
            console.log(error);
            res.send("There is a error")
        } else if(message){
            res.render("viewmore",  {post:message, data11})
        }else{
            res.redirect("/contact")
        }
    })
}

const aboutPost = (req, res)=>{
    res.render("about")
}

const ediPost = (req,res) =>{
    const {_id} = req.params;
    Post.findById(_id,(error,message)=>{
        if (error) {
            console.log(error);
            res.send("There is a error")
        } else if(message){
            res.render("editpost",  {post:message})
        }else{
            res.redirect("/contact")
        }
    })

    // let post = posts.find((item,ind )=> ind == index )
    // res.render("editpost",{post, _id})
}

const editPost =  (req,res) =>{
    const {_id} = req.params;
    const {title, more} = req.body;
    Post.findByIdAndUpdate(_id, {title, more}, (err, message)=>{
        if (err) {
            console.log(err);
            res.send("this is error")
        } else {
            res.redirect("/contact");
        }
    })
//    posts.splice(index, 1, req.body);
}
const profilePost = (req, res)=>{
    const {username} = req.params;
    const {school, dept, age} = req.query;
    
    res.send(`Here is the route  ${username}, ${school}, ${dept}, ${age}`);
}

const newPostt = (req, res)=>{
    res.render('newpost', {posts});
}

module.exports = {PostCreate, delPost, allPost, homePost, aboutPost, viewPost, ediPost, editPost, profilePost, newPostt}