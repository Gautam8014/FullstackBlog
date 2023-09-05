//router 


const express= require("express");

const router= express.Router();
const moviemodel= require("../models/User.model")

router.get("/", async(req,res)=>{

    try {

        const movie= await moviemodel.find();
        return res.status(200).send(movie)
    } catch (error) {
       console.log(error) 
    }
})

router.post("/", async(req,res)=>{
    const payload = req.body
    console.log(payload)

    const new_user = new UserModel(payload)
    await new_user.save()

    res.send({msg : "Signup successfully", new_user})
})





module.exports=router