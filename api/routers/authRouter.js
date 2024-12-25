import express from 'express'
import { signup , signin , googleSign , signout } from '../controllers/authController.js'


const router = express.Router()

router.post('/signup', signup)
router.post('/signin' , signin)
router.post('/google' , googleSign)
router.get('/signout' , signout)


export default router