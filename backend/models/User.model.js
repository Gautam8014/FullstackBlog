//blueprint


const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    name: {type:String, require: true},
    email :{type:String, require:true},
    password:{type:String, require:true},
    age:{type:Number, require:true},
    phone_number:{type:String, require:true}

})


const UserModel= mongoose.model('user', userSchema);


module.exports= {UserModel};