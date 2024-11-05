import mongoose from "mongoose";    
import Collections from "../db/collection.js";
const schema = new mongoose.Schema({
   userName :  {
    type : String,
    required : true,
   },
   email : {
    type : String,
    required : true,
    unique : true,
   },
   password : {
    type : String,
    required : true,
   }

})
export const UsersModel = mongoose.model(Collections.USERS,schema)
