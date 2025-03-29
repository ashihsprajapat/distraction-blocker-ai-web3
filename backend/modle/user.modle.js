

import mongoose,{Schema, model} from "mongoose";
import Week from "./week.model.js";

const userSchema= new Schema({
    email:{type:String, required:true, unique:true},
    fullName:{type:String, required:true,},
    password:{type:String, required:true, minlength:6 },
    profilePic:{
        type:String,
        default:""
    },
    week:{
        type: Schema.Types.ObjectId,
        ref:'Week',
    }

})

const User= model("User", userSchema);

export default User;
