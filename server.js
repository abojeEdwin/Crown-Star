const express = require('express');
require('dotenv').config();

const {sequelize, User, Scout, Coach, ShortList,Player} = require('./models');
const userRoutes = require('./routes/userRoute');
const playerRoutes = require('./routes/playerRoute');

// Initialize express
const app = express();
app.use(express.json());


// Register routes
const userController = require('./controller/authController');
const playerController = require('./controller/playerController');

app.use('/api/users', userRoutes(userController));
app.use('/api/players', playerRoutes(playerController));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (_req, res) => res.send('🚀 Task Manager API is running...'));

// Start server and DB
const PORT = process.env.PORT
sequelize.authenticate()
    .then(() => {
        console.log('✅ Connected to Mysql server');
        return sequelize.sync();
    })
    .then(() => {
        app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
    })
    .catch((err) => console.error('❌ DB connection failed:', err));