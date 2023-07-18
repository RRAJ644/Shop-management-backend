import { Schema, model } from 'mongoose'
const Users = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  userName: {
    type: String,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: Number,
    required: true,
  },

  jobTitle: {
    type: String,
    required: true,
  },

  address: {
    type: String,
  },

  role: {
    type: String,
    enum: ['SuperAdmin', 'StoreAdmin', 'SalesRep', 'StoreManager'],
  },

  storeId: {
    type: String,
  },
})

const User = new model('User', Users)

export default User
