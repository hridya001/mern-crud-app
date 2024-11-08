require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

// Middleware to allow cross-origin requests
const corsMiddleware = cors();

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

// Define API routes as serverless functions
module.exports = (req, res) => {
  corsMiddleware(req, res, async () => {
    // Handle different HTTP methods
    if (req.method === 'GET') {
      try {
        const data = await Data.find();
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error });
      }
    } else if (req.method === 'POST') {
      const { name, email, phone } = req.body;
      try {
        const newData = new Data({ name, email, phone });
        await newData.save();
        res.status(201).json(newData);
      } catch (error) {
        res.status(400).json({ message: 'Error creating data', error });
      }
    } else if (req.method === 'PUT') {
      const { id } = req.query; // For example, use query params for id
      const { name, email, phone } = req.body;
      try {
        const updatedData = await Data.findByIdAndUpdate(
          id,
          { name, email, phone },
          { new: true }
        );
        res.status(200).json(updatedData);
      } catch (error) {
        res.status(400).json({ message: 'Error updating data', error });
      }
    } else if (req.method === 'DELETE') {
      const { id } = req.query; // Use query params for deletion
      try {
        await Data.findByIdAndDelete(id);
        res.status(200).json({ message: 'Data deleted successfully' });
      } catch (error) {
        res.status(400).json({ message: 'Error deleting data', error });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  });
};

