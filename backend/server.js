//library imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

//test
app.get('/ping', (req, res) => {
    res.send('pong');
  });
//test

app.use(cors());
app.use(express.json());

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

//for any URL /api/auth, use routes defined in authRoutes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

//URL for recommendations
const recRoutes = require('./routes/recommendations');
app.use('/api/recs', recRoutes);

//hello test
{/*app.get('/', (req, res) => {
  res.send('Hello from backend!');
});*/}

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
