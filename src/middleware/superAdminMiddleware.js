import jwt from 'jsonwebtoken'

const validateToken = async (authToken) => {
  const token = authToken.slice(7, authToken.length)
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
      if (err) {
        reject(err)
      }
      return resolve(decoded)
    })
  })
}

export const authMiddleware = async (req, res, next) => {
  try {
    const {
      context: {
        models: { User },
      },
    } = req

    const token = req.headers.authorization

    if (token) {
      let userData
      if (!token.startsWith('Bearer ')) {
        res.status(404).send({ message: 'Invalid Token' })
        return false
      }

      userData = await validateToken(token)

      const user = await User.findOne({
        _id: userData.getUser._id,
      })

      if (!user) {
        res.status(404).send({ message: `User doesn't exist` })

        return false
      }

      req.user = user
      next()
    } else {
      res.status(400).send({ message: 'Unauthorized' })
    }
  } catch (err) {
    res.status(400).send(err)
  }
}
