import mongoose from "mongoose";
import {genSalt,hash} from "bcrypt"

const userSchema =new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    firstName:{
        type:String,
        required:false,
    },
    lastName:{
        type:String,
        required:false,
    },
    image:{
        type:String,
        required:false,
    },
    color:{
        type:String,
        required:false,
    },
    profileSetup:{
        type:Boolean,
        default:false,
    },
});

userSchema.pre("save",async function(){
     // 🔒 only hash if password actually changed
    if (!this.isModified("password")) return;
    const salt=await genSalt();
    this.password=await hash(this.password,salt);
    //next();
});
// Why normal function, not arrow function?

// Because:
// this refers to the current document (user)
// Arrow functions ❌ do NOT have their own this
// 👉 Here, this = the user object being saved

const User=mongoose.model("Users",userSchema);

export default User;