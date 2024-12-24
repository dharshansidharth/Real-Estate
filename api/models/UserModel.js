import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
      username: {
            type: String,
            unique: true,
            required: true,
      },

      email: {
            type: String,
            unique: true,
            required: true,
      },

      password: {
            type: String,
            required: true,
      },

      avatar : {
            type : String,
            default : 'https://tse2.mm.bing.net/th?id=OIP.lF8ztkPyzv_NrpD7V8YYVAHaHa&pid=Api&P=0&h=180'
      }
},
      { timestamps: true }
) 

const User = mongoose.model('User' , userSchema)

export default User