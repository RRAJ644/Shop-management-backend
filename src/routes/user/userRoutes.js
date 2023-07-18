import express from 'express'

import {
  updateUser,
  getUser,
  getUsers,
  deleteUser,
  login,
  createStoreAdmin,
  createStoreManager,
  createStoreSalesRep,
} from '../../controller/user.js'
import { validate } from '../../middleware'

import { userValidation } from '../../middleware/middleware.js'
import { authMiddleware } from '../../middleware/superAdminMiddleware.js'

import {
  emailValidation,
  saleRepEmploymentStatusValidation,
} from '../../middleware/userMiddleware.js'

const userRouter = express.Router()
userRouter.use(express.json())

userRouter.get('/', (req, res) => {
  res.send('Welcome to Express')
})

userRouter.post(
  '/create-store-admin',
  emailValidation,
  validate,
  userValidation,
  authMiddleware,
  createStoreAdmin
)

userRouter.post(
  '/create-store-manager',
  emailValidation,
  validate,
  userValidation,
  authMiddleware,
  createStoreManager
)

userRouter.post(
  '/create-store-sales-rep',
  saleRepEmploymentStatusValidation,
  validate,
  userValidation,
  authMiddleware,
  createStoreSalesRep
)

userRouter.post('/login', login)

export default userRouter
