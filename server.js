// Simple Backend for HopeHive Adoption Portal
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Connect to database (will create automatically)
mongoose.connect('mongodb://127.0.0.1:27017/hopehive')
  .then(() => console.log('✅ Connected to Database'))
  .catch(err => console.log('❌ Database Error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Child Model
const childSchema = new mongoose.Schema({
  name: String,
  age: Number,
  description: String,
  image: String,
  location: String
});
const Child = mongoose.model('Child', childSchema);

// Sample Data Loader (Runs automatically)
async function loadSampleData() {
  const count = await Child.countDocuments();
  if (count === 0) {
    await Child.insertMany([
      {
        name: "Karim",
        age: 5,
        description: "Loves drawing and dancing. Looking for a loving family in Kerala.",
        image: "https://im.indiatimes.in/content/2024/Apr/adoption-in-india-linkedin_660baf4db61ee.jpg",
        location: "Kerala"
      },
      {
        name: "Priya",
        age: 7,
        description: "Enjoys reading and outdoor games. Needs a caring family in Tamil Nadu.",
        image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb6",
        location: "Tamil Nadu"
      }
    ]);
    console.log('📊 Sample data loaded!');
  }
}
loadSampleData();

// Routes
app.get('/api/children', async (req, res) => {
  const children = await Child.find();
  res.json(children);
});

app.post('/api/inquiries', (req, res) => {
  console.log('📩 New Inquiry:', req.body);
  res.json({ message: 'Thank you! We received your inquiry.' });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));