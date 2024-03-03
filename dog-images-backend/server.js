require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require('./models/User');
const DogImage = require('./models/DogImage');

// User-related routes
app.post('/api/register', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

app.post('/api/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && user.password === req.body.password) {
    res.send(user);
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Dog image-related routes
app.post('/api/dog-images', upload.single('image'), async (req, res) => {
  const dogImage = new DogImage({
    title: req.body.title,
    url: `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
    user: req.user._id,
  });
  await dogImage.save();
  res.send(dogImage);
});

app.get('/api/dog-images', async (req, res) => {
  const images = await DogImage.find({ user: req.user._id });
  res.send(images);
});

app.delete('/api/dog-images/:id', async (req, res) => {
  const deletedImage = await DogImage.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  res.send(deletedImage);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
