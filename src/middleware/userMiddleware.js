import { check } from 'express-validator'

export const emailValidation = [
  check('email')
    .isString()
    .isEmail()
    .notEmpty()
    .withMessage('email must be valid'),
]

export const saleRepEmploymentStatusValidation = [
  check('employmentStatus')
    .isString()
    .isIn(['full-time', 'part-time', 'commission-based', 'other']),
]

export const storeTypeValidation = [
  check('storeType')
    .isString()
    .isIn(['Retail', 'Warehouse', 'Distribution center']),
]

export const paymentMethodsValidation = [
  check('paymentMethods')
    .isString()
    .isIn(['Cash', 'UPI', 'Credit card', 'Debit card']),
]
