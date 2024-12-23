import express from 'express'
import { config } from "dotenv";
import mongoose from 'mongoose'
import userRouter from './routers/userRouter.js'

const app = express()
config()
const port = process.env.PORT
const url = process.env.MONGO_URL

try{
      mongoose.connect(url)
      console.log('connected to mongodb!')
}
catch(err){
      throw err
}

app.use('/api/users' , userRouter)

app.listen(port , () => {
      console.log(`Server running in port ${port}!`) 
})



//password = cPWIKEnVr7PFVYRz