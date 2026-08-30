import mongoose from 'mongoose';

const clickSchema = new mongoose.Schema({
  urlId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Url',
    required: true,
    index: true,
  },
  referrer: {
    type: String,
    default: null,
  },
  clickedAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

export default mongoose.model('Click', clickSchema);