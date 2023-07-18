import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import models from './models/index'
import bcrypt from 'bcryptjs'
import userRouter from '../src/routes/user/userRoutes.js'
import User from './models/User'
import storeRouter from './routes/store/storeRoutes.js'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

// CORS options
const corsOptions = {
  credentials: true,
  origin: true,
}

// cors
app.use(cors(corsOptions))

import('./dbConnection')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.context = {
    models,
  }
  next()
})

const createSuperAdmin = async () => {
  const findSuperAdmin = await User.find({ role: 'SuperAdmin' })

  if (findSuperAdmin?.length === 0) {
    const user = await User.create({
      firstName: 'Super',
      lastName: 'Admin',
      userName: 'superAdmin12345',
      email: 'super@admin.com',
      password: await bcrypt.hash('qwerty123', 10),
      phoneNumber: 9773768954,
      jobTitle: 'Owner',
      address: 'SMT House',
      role: 'SuperAdmin',
    })
  }
}

createSuperAdmin()

const options = {
	swaggerOptions: {
		filter: true,
		authAction: {
			JWT: {
				name: 'JWT',
				schema: { type: 'apiKey', in: 'header', name: 'Authorization', description: '' },
				value: '<JWT>'
			}
		}
	}
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

app.use('/user', userRouter)
app.use('/store', storeRouter)

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'URL NOT FOUND',
  })
})

app.listen(port, () => {
  console.log(`Server listen port : ${port}`)
})
