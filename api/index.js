const express = require('express')
const dotenv = require('dotenv').config()


app = express()
port = process.env.port


app.listen(port , () => {
    console.log(`server running in port ${port}`)
})