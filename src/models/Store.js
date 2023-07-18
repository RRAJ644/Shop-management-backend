import { Schema, model } from 'mongoose'
const Stores = new Schema({
  storeAdminId: {
    type: String,
  },

  storeName: {
    type: String,
    required: true,
  },

  storeCode: {
    type: String,
    required: true,
  },

  storeType: {
    type: String,
    enum: ['Retail', 'Warehouse', 'Distribution center'],
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: Number,
    required: true,
  },

  operatingHours: {
    type: String,
  },

  address: {
    type: String,
  },

  TAN: {
    type: String,
  },

  currency: {
    type: String,
  },

  paymentMethods: {
    type: String,
    enum: ['Cash', 'UPI', 'Credit card', 'Debit card'],
    required: true,
  },
})

const Store = new model('Store', Stores)

export default Store
