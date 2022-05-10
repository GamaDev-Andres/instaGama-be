import mongoose from 'mongoose'

const HistorySchema = mongoose.Schema({
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  },
  url: {
    type: String,
    required: true,
  },
  descripcion: String,
  createdAt: { type: Date, expires: "24h", default: Date.now }
}, {
  timestamps: true,
  expireAfterSeconds: 0
})

export default mongoose.model("Historia", HistorySchema)