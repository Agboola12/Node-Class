const Post = require("../Model/backModel");

const createPost = (req,res)=>{
    // console.log(req.file)
    const {title, more} = req.body;  
    // let filename = ' ';
    // if( req.filename){
    //     filename = req.filename.filename
    // }
    const {filename, path} = req.file ;   
    Post.create({title, more, imagePath: filename, imagePath: filename},(err,message)=>{
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

const getPost = (req, res) =>{
    Post.find((err, data)=>{
        if (err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
}

const deletePost = (req,res) =>{
    const{_id} = req.params;

    Post.deleteOne({_id}, (err, data)=>{
        if (  err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
}

const editPost = ((req, res) => {
      const {_id} = req.params;
    const {title, more} = req.body;
    Post.findByIdAndUpdate(_id, {title, more}, (err, message)=>{
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
  });

module.exports = {createPost, getPost, deletePost, editPost }