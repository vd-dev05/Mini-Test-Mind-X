import dotenv from 'dotenv'
dotenv.config({path : '.env'})
// dotenv.config({path : '.env.test'})
import express from 'express'
import connectDB from './db/Mongodb/connect.js'
import cors from "cors";
import bodyParser from 'body-parser'
import UsersController from './controller/users.js'
import UsersMiddleware from './middleware/users.js';
import PostMiddleware from './middleware/post.js';
import PostController from './controller/post.js';

const app = express()
app.use(express.json())

const port = process.env.PORT || 3000;
app.post('/', (req,res) => {
  res.send('Hello World!')
})
app.post('/users/register',UsersMiddleware.userAuthCreate, UsersController.createUsers)
app.post('/users/login',UsersMiddleware.checkAuth,UsersController.loginUser)
app.post('/posts',PostMiddleware.checkAuthPost,PostController.postUsers)
app.put('/posts/:id' ,PostMiddleware.checkAuthPost,PostController.postUpdate)
app.listen(port, () => {
    connectDB()
  console.log(`Server is running on port ${port}`)
})