const express = require('express');
require('dotenv').config();

const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoute');

// Initialize models
const User = require('./models/User');

// Initialize express
const app = express();
app.use(express.json());


// Register routes
const userController = require('./controller/authController');

app.use('/api/users', userRoutes(userController));

// Health check
app.get('/', (_req, res) => res.send('🚀 Task Manager API is running...'));

// Start server and DB
const PORT = process.env.PORT
sequelize.authenticate()
    .then(() => {
        console.log('✅ Connected to PostgresSQL server');
        return sequelize.sync();
    })
    .then(() => {
        app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
    })
    .catch((err) => console.error('❌ DB connection failed:', err));