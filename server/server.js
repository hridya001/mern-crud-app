require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());  // To parse JSON request bodies

// MongoDB URI and connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Define a Schema for data (e.g., for personal details)
const dataSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

const Data = mongoose.model('Data', dataSchema);

// Routes

// Get all data
app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

// Create new data
app.post('/api/data', async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const newData = new Data({ name, email, phone });
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ message: 'Error creating data', error });
  }
});

// Update existing data by ID
app.put('/api/data/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const updatedData = await Data.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true }
    );
    res.json(updatedData);
  } catch (error) {
    res.status(400).json({ message: 'Error updating data', error });
  }
});

// Delete data by ID
app.delete('/api/data/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Data.findByIdAndDelete(id);
    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting data', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
