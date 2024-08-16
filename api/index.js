const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const userRouter = require('./routes/userRoutes.js')
const authRouter = require('./routes/authRoutes.js')

try{
mongoose.connect(process.env.MONGO)
console.log('connected to database')
}
catch(err){
    throw err
}


app = express()
port = process.env.port


app.use(express.json())

app.use('/api/user' , userRouter)
app.use('/api/auth' , authRouter )

app.use((err , req , res , next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})


app.listen(port , () => {
    console.log(`server running in port ${port}`)
})

//username = real_estate
//pwd = zecfYA9oAzx4Y50v