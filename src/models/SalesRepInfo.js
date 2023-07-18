import { Schema, model } from 'mongoose'
const SalesRep = new Schema({
  userId: {
    type: String,
  },

  StoreId: {
    type: String,
  },

  region: {
    type: String,
  },

  quota: {
    type: Number,
  },

  hireDate: {
    type: Date,
  },

  employmentStatus: {
    type: String,
    enum: ['full-time', 'part-time', 'commission-based', 'other'],
    required: true
  },

  commissionStructure: {
    type: String,
  },
})

const SalesRepInfo = new model('SalesRepInfo', SalesRep)

export default SalesRepInfo
