const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// ✅ FIX: Removed deprecated options
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected Successfully! 🚀"))
.catch((err) => console.error("MongoDB Connection Failed:", err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🏃‍♂️`);
});

module.exports = app;