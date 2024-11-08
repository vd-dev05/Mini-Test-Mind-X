import GlobalData from "../data.js";

const PostMiddleware = {
    checkAuthPost : async (req,res,next) => {
        try {
            const apiKey  = req.query.apiKey
            if (!apiKey) {
                throw new Error('Authentication is required')
            }
            const values = (apiKey.match(/\$(.*?)\$/g) || []).map(match => match.slice(1, -1));
            const keyToPass = `${values[0]}/${values[1]}`            
            if (!GlobalData[keyToPass]  === values[2]) {    
                throw new Error(`Cannot authent into`)
            }

            next()
        } catch (error) {
            res.status(403).json({
                message : error.message
            })
        }
    }
}
export default PostMiddleware