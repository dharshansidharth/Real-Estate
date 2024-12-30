import User from "../models/UserModel.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import Listing from '../models/listingModel.js'

export const test = (req, res) => {
  res.send('test success!')
}

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) { return next(errorHandler(401, 'You can only update your account!!')) }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }
    const updatedUser = await User.findOneAndUpdate({ _id: req.params.id }, {
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

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) { next(errorHandler(401, 'You can only delete your account!')) }
  try {
    await User.deleteOne({ _id: req.user.id })
    res.clearCookie('access_token')
    res.status(200).send('user deleted successfully!')
  }
  catch (err) {
    next(err)
  }
}

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listing = await Listing.find({ userRef: req.params.id })
      res.status(200).json(listing)
    }

    catch (err) {
      next(err)
    }
  }
  else {
    next(errorHandler(401, 'You can only view your listings!!'))
  }
}

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) { next(errorHandler(401, 'No user Found!')) }
    const { password: pass, ...rest } = user._doc
    res.status(200).json(rest)
  }
  catch (err) {
    next(errorHandled(err))
  }
}