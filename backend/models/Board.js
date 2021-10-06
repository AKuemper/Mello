import mongoose from 'mongoose';

const BoardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter a title'],
    trim: true,
    maxLength: [50, 'Title can not be more than 50 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxLength: [500, 'Description can not be more than 500'],
  },
  backgroundImage: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model('Board', BoardSchema);
