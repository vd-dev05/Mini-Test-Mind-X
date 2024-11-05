import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path : '.env'})
// dotenv.config({path : '.env.test'})
const connectDB = async () => {
    try {
       await  mongoose.connect(`mongodb+srv://${process.env.USERNAME_MONGODB}:${process.env.PASSWORD_MONGODB}@web.2rxwo.mongodb.net/${process.env.PATH_WEB}?retryWrites=true&w=majority&appName=web`)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error.message);}
}
export default  connectDB;