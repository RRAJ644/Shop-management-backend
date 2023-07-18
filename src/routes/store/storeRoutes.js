import express from 'express'
import { createStore } from '../../controller/store'
import { authMiddleware } from '../../middleware/superAdminMiddleware'
import {
  emailValidation,
  paymentMethodsValidation,
  storeTypeValidation,
} from '../../middleware/userMiddleware'
import { validate } from '../../middleware'
const storeRouter = express.Router()

storeRouter.post(
  '/create-store',
  emailValidation,
  validate,
  storeTypeValidation,
  validate,
  paymentMethodsValidation,
  validate,
  authMiddleware,
  createStore
)

export default storeRouter
