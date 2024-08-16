const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

try{
mongoose.connect(process.env.MONGO)
console.log('connected to database')
}
catch(err){
    throw err
}


app = express()
port = process.env.port


app.listen(port , () => {
    console.log(`server running in port ${port}`)
})

//username = real_estate
//pwd = zecfYA9oAzx4Y50v