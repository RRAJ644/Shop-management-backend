import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserMessages } from '../constants/user'
import { generateUserName } from '../utils/userName'

export const createStoreAdmin = async (req, res) => {
  try {
    const {
      context: {
        models: { User },
      },
      user,
    } = req
    let { body } = req

    if (user?.role !== 'SuperAdmin') {
      return res
        .status(404)
        .send({ message: `You don't have rights to create store admin` })
    }

    const isExist = await User.findOne({
      email: body.email,
    })

    if (isExist) {
      return res.json({ message: 'Email exist' })
    }

    const getUser = await User.findOne({
      userName: body.userName,
    })

    if (getUser) {
      return res.json({ message: 'User exist' })
    }

    body = {
      ...body,
      password: await bcrypt.hash(body.password, 10),
      role: 'StoreAdmin',
      userName: await generateUserName(body.firstName),
    }

    const userData = await User.create(body)

    res.status(200).send(userData)
  } catch (err) {
    return res.json({ message: UserMessages.INVALID_INPUT })
  }
}

export const createStoreManager = async (req, res) => {
  try {
    const {
      context: {
        models: { User },
      },
      user,
    } = req

    let { body } = req

    if (user?.role !== 'StoreAdmin') {
      return res
        .status(404)
        .send({ message: `You don't have rights to create store manager` })
    }

    const isExist = await User.findOne({
      email: body.email,
    })

    if (isExist) {
      return res.json({ message: 'Email exist' })
    }

    const getUser = await User.findOne({
      userName: body.userName,
    })

    if (getUser) {
      return res.json({ message: 'User exist' })
    }

    body = {
      ...body,
      password: await bcrypt.hash(body.password, 10),
      role: 'StoreManager',
      userName: await generateUserName(body.firstName),
      storeId: user?.storeId,
    }

    const manager = await User.create(body)
    res.status(200).send(manager)
  } catch (error) {
    return res.json({ message: UserMessages.INVALID_INPUT })
  }
}

export const createStoreSalesRep = async (req, res) => {
  try {
    const {
      context: {
        models: { User, SalesRepInfo },
      },
      user,
    } = req

    if (user?.role !== 'StoreAdmin') {
      return res.status(404).send({
        message: `You don't have rights to create sales representatives`,
      })
    }

    let { body } = req

    const isExist = await User.findOne({
      email: body.email,
    })

    if (isExist) {
      return res.json({ message: 'Email exist' })
    }

    const getUser = await User.findOne({
      userName: body.userName,
    })

    if (getUser) {
      return res.json({ message: 'User exist' })
    }

    body = {
      ...body,
      password: await bcrypt.hash(body.password, 10),
      userName: await generateUserName(body.firstName),
      role: 'SalesRep',
    }

    const salesRepUser = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      userName: body.userName,
      password: body.password,
      phoneNumber: body.phoneNumber,
      jobTitle: body.jobTitle,
      address: body.address,
      role: body.role,
      storeId: user.storeId,
    })

    const salesRepUserInfo = await SalesRepInfo.create({
      userId: salesRepUser._id,
      StoreId: salesRepUser.storeId,
      region: body.region,
      quota: body.quota,
      hireDate: body.hireDate,
      employmentStatus: body.employmentStatus,
      commissionStructure: body.commissionStructure,
    })

    res.status(200).send(salesRepUser)
  } catch (error) {
    return res.json({ message: UserMessages.INVALID_INPUT })
  }
}

export const login = async (req, res) => {
  try {
    const {
      context: {
        models: { User },
      },
      body,
    } = req

    const isExist = await User.findOne({
      email: body.email,
    })

    if (isExist) {
      return res.json({ message: 'Email exist' })
    }

    const getUser = await User.findOne({
      userName: body.userName,
    })

    if (!getUser) {
      return res.json({ message: 'Please Sign Up' })
    }

    const confirmPassword = await bcrypt.compare(
      body.password,
      getUser.password
    )

    if (!confirmPassword) {
      return res.json({ message: 'Invalid Credentials' })
    }

    const token = jwt.sign({ getUser }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })
    return res.status(200).send({ token })
  } catch (error) {
    return res.json({ message: UserMessages.INVALID_INPUT })
  }
}
