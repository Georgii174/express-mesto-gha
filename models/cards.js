const mongoose = required('mongoose');

const cardSchema = new mongoose.Scheme({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },

  like: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Scheme.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  likes: [{
    type: mongoose.Scheme.Types.ObjectId,
    ref: 'user',
    required: true,
    default: [],
  }],

  createAt: {
    type: Date,
    default: Date.now,
  },
});

export const Card = mongoose.model('card', cardSchema);