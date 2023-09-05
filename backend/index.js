const express= require("express");
const bcrypt= require("bcrypt")




 const {connection}= require("./config/db")
// const moviecontroller= require("./controller/movie.controller")
const{UserModel}= require("./models/User.model")

const app = express();
let port=8000;


app.use(express.json())
// app.use("/movie",moviecontroller )  //http://localhost:8000/movie

app.get("/",(req, res)=>{
   res.send("base Api endpoint")
})


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