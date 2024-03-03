const mongoose = require('mongoose');

const DogImageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('DogImage', DogImageSchema);
