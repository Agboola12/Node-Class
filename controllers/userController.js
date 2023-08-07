const { compare } = require("bcrypt")
const User = require("../Model/userModel")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { sendMail } = require("../mail");


const register = (req, res) =>{
    const {firstname, lastname, email, password} = req.body;
    console.log(req.body);
    User.create({firstname, lastname, email, password}, async (err, message) =>{
        if (err){
            res.status(400).json({
                success: false,
                message : "An error"
            })
            console.log(err);
        }else{
        //    await sendMail(email)
        try {
           await sendMail({
            to: email,
            subject: "succesful",
            html:`
                <div>
                    <h3>welcome ${firstname}  ${lastname}</h3>
                </div>
            `
           })
            
        } catch (error) {
            log.console("An error occureed while sending mail")
        }
            res.json({
                success: true,
                message: "User registration successful",
                // data: message,
                message: "Successful"
            })
        }
    })
}
// const login = async(req, res)=>{
//     const {email, password} = req.body;
//     try {
//         User.findOne({email: email},async(err,check)=>{
//             if(check){
//                 let isTrue=  await compare(password,check.password )
//                 if(isTrue){
//                     res.json({
//                         status:true,
//                         message:"sign succesful"
//                     })
//                 }else{
//                     res.json({
//                         status:false,
//                         message:"wrong password"
//                     })
//                 }
//             }else{
//                 res.json({
//                     message:"Email not exist",
//                     status:false
//                 })
//             }
//         })
//     } catch (e) {
//         res.json("not exist")
//     } .select("+password").exec(
// }
const login = (req, res)=>{
    const {email, password} = req.body;
    // console.log(req.body);
    User.findOne({email}).select("+password").exec(async(err, data)=>{
        if(err){
            res.status(500).json({
               success: false,
               message : err
            })
            console.log(err);
        }else{
            if (data){
                console.log(data)
                try{
                    const validPassword = await compare(password, data.password) 
                    if (validPassword){

                        // jsonwebtoken
                        const token = jwt.sign({
                            email: data.email,
                            _id: data._id },
                            process.env.JWT_SECRET,
                            {expiresIn: 120}
                        )




                        data.password = "";
                        res.json({
                            token,
                            success: true,
                            message: " login successful",
                            data: {email:req.body.email}
                        })
                    } 
                    else{
                        res.status(400).json({
                            success: false,
                            message : "email does not rubbish "
                         })
                    }  
                }
                catch (error){
                    res.send(error)
                    console.log(error);
                }   
            }
            else{
                
                res.status(400).json({
               success: false,
               message : "email does not match "
            })
            // res.send(data)
        }
    }
})
}

const getUser = (req,res)=>{
    // res.send("profile is here");
    User.findOne(req.user._id, (err, data) =>{
        if(err){
            res.status(500).json({
                success: false,
                message: "An error occurres when fetching user profile"
            })
        }else{
            res.json({
                success: true,
                // data,
                message: "User profile fetched"
            })
        }
    })
}

const userProfile = (req, res)=>{
    const {email} = req.query;
    User.findOne({email}).then((user)=>{
        if(user){
            res.status(200).send({
                success: true,
                message: "successful",
                user
            })
        }
        else{
            res.send({
                success: false,
                message: "not successful",
                
            })
        }
    })
}

module.exports = {register, login, getUser, userProfile}