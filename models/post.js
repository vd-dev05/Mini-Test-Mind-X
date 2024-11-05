import mongoose from "mongoose";    
import Collections from "../db/collection.js";
const schema = new mongoose.Schema({
userId : {
    type : String ,
     required: true
},
content : {
    type : String,
    required: true
},
createAt : {
    type : Date,
    default : Date.now,
},
updatedAt : Date 

})
export const PostModel = mongoose.model(Collections.profile,schema)