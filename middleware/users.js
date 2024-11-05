import * as Yup from "yup"
import { UsersModel } from "../models/users.js"
import bcrypt from "bcrypt"
import { key } from "../lib/createApiKey.js"
const UsersMiddleware= {
    userAuthCreate :async (req,res,next) => {
        try {
            const {userName,email,password} = req.body
                const validEmail = await UsersModel.findOne({ email: email})
                if (validEmail) throw new Error("Email already exists in the system")

            const yupSchema = Yup.object().shape({
                email: Yup.string()
                .email("Invalid email format @example.com ")
                .matches(/^\S+@\S+\.\S+$/, "Email can not space characters")
                .required("Required email"),

                userName: Yup.string()
                .required("Required  name")
                .min(4, "Name must be 4 characters or more"), 

                password: Yup.string()
                .required("Required password")
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                    "Password must be 7-19 characters and contain at least one letter, one number and a special character"
                  )
        
            });
            await yupSchema.validate({ email,userName, password});

            
            return next();
        } catch (error) {
            
           res.status(403).json({
            data : null,
            message: error.message}); 
        }
    },

    checkAuth : async (req,res,next) => {
        try {
            const user = await UsersModel.findOne({email : req.body.email})
            if (!user) {
                throw new Error("Invalid email address provided !")
            }
            const validPassword =  bcrypt.compareSync(req.body.password, user.password)
            if (!validPassword) {
                throw new Error("Invalid password provided !")
            }
           
            const apiKey = await key(user._id,req.body.email)
            
            if (apiKey) {
                req.apiKey = apiKey
                return next();
            } else {
                throw new Error('Invalid API key')
            }
           
        } catch (error) {
            res.status(403).json({message: error.message});
        }
    }
}

export default UsersMiddleware