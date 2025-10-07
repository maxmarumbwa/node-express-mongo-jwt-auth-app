const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const authRoutes = require('./routes/authRoutes');

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser()); // must come before routes
app.set('view engine', 'ejs');




// Build MongoDB connection string from environment variables
const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}`;

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start server only after DB connection is successful
    app.listen(process.env.PORT || 3001, () => {
      console.log(`Server running on port ${process.env.PORT || 3001}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
  // routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

