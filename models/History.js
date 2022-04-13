import mongoose from 'mongoose'

const HistorySchema = mongoose.Schema({

  url: {
    type: String,
    required: true,
  },
  descripcion: String,
  expireAt: { type: Date, default: Date.now(), expires: 30 }
}, {
  timestamps: true,
})

export default mongoose.model("Historia", HistorySchema)