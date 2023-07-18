import jwt from 'jsonwebtoken'
import { query, validationResult } from 'express-validator'

export const userValidation = async (req, res, next) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  const phoneRegex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\\.]{0,1}[0-9]{3}[-\s\\.]{0,1}[0-9]{4}$/

  const {
    body: { firstName, lastName, phoneNumber, password, email, role },
  } = req

  // check name validation
  if (!firstName || !lastName) {
    return res.status(400).json({ error: 'firstName and lastName is Required' })
  } else if (firstName.length <= 2) {
    return res.status(400).json({ error: 'firstName is too short ' })
  } else if (lastName.length >= 15) {
    return res.status(400).json({ error: 'lastName is too large ' })
  }

  // check email validation
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email is Invalid' })
  }

  // check phone number validation
  if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
    return res.status(400).json({ error: 'Phone number is Invalid' })
  }

  if (!password) {
    return res.status(400).json({ error: 'Password is Required' })
  } else if (password.length <= 6) {
    return res.status(400).json({ error: 'Password is too short ' })
  }

  if (role === 'superAdmin') {
    return res.status(400).json({ error: 'Invalid role' })
  }

  next()
}
