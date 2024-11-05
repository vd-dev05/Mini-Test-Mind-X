import { PostModel } from "../models/post.js";

const PostController = {
    postUsers : async (req,res) => {
        try {
            const post = await PostModel.create(req.body)
            if (!post) {
                throw new Error('Could not create post')
            }

            res.status(201).json({
                message : "Post created successfully",
                post : post
            });
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    postUpdate : async (req,res) => {
        try {
            const userId = req.params.id
            const checkPost = await PostModel.findOne({userId })
            if (!checkPost) {
                throw new Error('Post not found')
            }
            
            const data = {
                content : req.body.content,
                updatedAt : new Date
            }
            const updatedPost = await PostModel.findByIdAndUpdate(checkPost._id, data, {new: true})
            
            res.status(200).json({
                message : "Post updated successfully",
                updatedPost :updatedPost
            })
        } catch (error) {
            res.status(401).json({message: error.message});
        }
    }
}
export default PostController