import express from 'express'
import { config } from "dotenv";
import mongoose from 'mongoose'
import userRouter from './routers/userRouter.js'
import authRouter from './routers/authRouter.js'
import crypto from 'crypto'
import cookieParser from 'cookie-parser';
import listingRouter from './routers/listingRouter.js'
import cors from 'cors'

const app = express()
config()
const port = process.env.PORT
const url = process.env.MONGO_URL

app.use(express.json())
app.use(cookieParser())
app.use(cors())

try{
      mongoose.connect(url)
      console.log('connected to mongodb!')
}
catch(err){
      throw err
}

app.use('/api/users' , userRouter)
app.use('/api/auth' , authRouter)
app.use('/api/listing' , listingRouter)

app.use((err , req , res , next) => {
      const statusCode = err.statusCode || 500
      const message = err.message || 'Internal Server Error!!'
      return res.status(statusCode).json({
            success: false,
            statusCode,
            message,
      })
})

// console.log(crypto.randomBytes(64).toString('hex'))

app.listen(port , () => {
      console.log(`Server running in port ${port}!`) 
})



//password = NOtVvWKD5LX3pNOF