const express = require('express');
require('dotenv').config();

const {sequelize, Scout, Coach, ShortList,Player} = require('./models');
const playerRoutes = require('./routes/playerRoute');
const coachRoutes = require('./routes/coachRoute');
const scoutRoutes = require('./routes/scoutRoute');

// Initialize express
const app = express();
app.use(express.json());


// Register routes
const playerController = require('./controller/playerController');
const coachController = require('./controller/coachController');
const scoutController = require('./controller/scoutController');

app.use('/api/player', playerRoutes(playerController));
app.use('/api/coach', coachRoutes(coachController));
app.use('/api/scout', scoutRoutes(scoutController));
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