import { validationResult } from 'express-validator'

export const validate = (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (
      req.body.email ||
      req.body.storeType ||
      req.body.employmentStatus ||
      req.body.paymentMethods
    ) {
      if (!errors.isEmpty()) {
        return res.status(400).send({
          message: errors.errors[0].msg + ' ' + errors.errors[0].path,
        })
      }
    }
    next()
  } catch (error) {
    return res.status(400).send(error)
  }
}
