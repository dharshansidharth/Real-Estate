import express from 'express'
import { config } from "dotenv";
import mongoose from 'mongoose'
import userRouter from './routers/userRouter.js'
import authRouter from './routers/authRouter.js'

const app = express()
config()
const port = process.env.PORT
const url = process.env.MONGO_URL

app.use(express.json())

try{
      mongoose.connect(url)
      console.log('connected to mongodb!')
}
catch(err){
      throw err
}

app.use('/api/users' , userRouter)
app.use('/api/auth' , authRouter)

app.use((err , req , res , next) => {
      const statusCode = err.statusCode || 500
      const message = err.message || 'Internal Server Error!!'
      return res.status(statusCode).json({
            success: false,
            statusCode,
            message,
      })
})

app.listen(port , () => {
      console.log(`Server running in port ${port}!`) 
})



//password = cPWIKEnVr7PFVYRz