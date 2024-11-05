import bcrypt from 'bcrypt';
import { UsersModel } from '../models/users.js';
import GlobalData from '../data.js';
const UsersController = {
    createUsers : async (req,res) => {
       try {
        
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const newUsers = await UsersModel.create({
            ...req.body,
             password : hashedPassword
        })
        res.status(201).json({
            data : newUsers,
            message : 'User created successfully',
        })
       } catch (error) {
        res.status(401).json({
            data : null ,
            error: error.message
        })
       }
    },
    loginUser : async (req, res) => {
        try {
            const apiKey = req.apiKey
            const values = (apiKey.match(/\$(.*?)\$/g) || []).map(match => match.slice(1, -1));
            const GlobalKey = `${values[0]}/${values[1]}`
            GlobalData[GlobalKey] = values[2]

            res.status(200).json({
                apiKey :  apiKey,
                message : 'User logged in successfully',
            })
        } catch (error) {
            res.status(401).json({
                data : null ,
                error: error.message
            })
        }
    },
}
export default UsersController