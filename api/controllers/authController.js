import User from "../models/UserModel.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"

export const signup = async (req, res , next) => {
      const { username, email, password } = req.body
      const hashedPassword = bcryptjs.hashSync(password , 10)
      const newUser = new User({ username, email, password : hashedPassword })

      await newUser.save().then(() => { 
            res.status(201).json(newUser)
      }).catch(err => {
            next(err)
      })

      // res.status(404).send('Unexpected error occured!!')  
}