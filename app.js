const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = 3000;

// MongoDB connection string (replace with your own)
const mongoURI = 'mongodb+srv://rakhib4888:Rakhib123@cluster0.1dvuaj1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// User schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

// User model
const User = mongoose.model('User', userSchema);
app.use(cors());

// API routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});