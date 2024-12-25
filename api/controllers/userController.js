import User from "../models/UserModel.js"
import bcryptjs from 'bcryptjs'

export const test = (req, res) => {
  res.send('test success!')
}

export const updateUser = async (req, res, next) => {
  // console.log(req.user , req.params)
  if (req.user.id !== req.params.id) { return next(errorHandler(401, 'You can only update your account!!')) }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }
    const updatedUser = await User.findOneAndUpdate({_id : req.params.id}, {
      $set: {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        avatar: req.body.avatar
      }
    }, { new: true })

    const { password, ...rest } = updatedUser._doc
    res.status(200).json(rest)
  }
  catch (err) {
    next(err)
  }
}   