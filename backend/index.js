const express= require("express");
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()



 const {connection}= require("./config/db")

const{UserModel}= require("./models/User.model")

const app = express();
let port=8000;


app.use(express.json())


app.get("/",(req, res)=>{
   res.send("base Api endpoint")
})


//signup

app.post("/signup", async (req, res)=>{
   const{name, email, password,age,phone_number}=req.body;
   bcrypt.hash(password, 3, async function(err, hash) {
     
      const new_user= new UserModel({
         name,
         email,
         password : hash,
         age,
         phone_number
      })
      try {
         await new_user.save();
      
         res.send("signup successfull")
      } catch (error) {
         console.log(error);
         res.status(500).send("something went wrong , please try again latter")
      }
  });


//login
  app.post("/login",async(req, res)=>{
   const{email,password}=req.body;
   const user= await UserModel.findOne({email})
 

   if(!user){
      res.send("sign up first")
   }else{
      const hashed_password= user.password
      bcrypt.compare(password, hashed_password, function(err, result) {
         // result == true

         if(result){
            let token = jwt.sign({ user_id : user._id  }, process.env.Secret_key);
            res.send({msg : "login successful", token:token})
         }else{
            res.send("login failed,invalid credential")
         }
     });
   }
  })
})







app.listen(port,async()=>{

   try {
   await connection();
    console.log("connected to db successfully")
   } catch (error) {
      console.log("error while connecting to db")
    console.log(error);
   }
})