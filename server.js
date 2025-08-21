const express = require('express');
require('dotenv').config();
const{Server} = require('socket.io');
const http = require('http');
const cors = require('cors');

const {sequelize, Scout, Coach, ShortList,Player,Message} = require('./models');
const playerRoutes = require('./routes/playerRoute');
const coachRoutes = require('./routes/coachRoute');
const scoutRoutes = require('./routes/scoutRoute');


// Initialize express
const app = express();
const server=http.createServer(app);

// --- Middleware Setup ---
// IMPORTANT: CORS must be applied BEFORE routes to be effective.
const allowedOrigins = [
    process.env.FRONTEND_URL, // Your deployed frontend URL from Render
    'https://crown-star-frontend.vercel.app',
    'http://localhost:5174'  // Including both common dev ports
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
};

app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Register Routes ---
const playerController = require('./controller/playerController');
const coachController = require('./controller/coachController');
const scoutController = require('./controller/scoutController');

app.use('/api/player', playerRoutes(playerController));
app.use('/api/coach', coachRoutes(coachController));
app.use('/api/scout', scoutRoutes(scoutController));

// Socket.IO setup
const io = new Server(server, {
    cors: corsOptions // Use the same CORS options for Socket.IO
});
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    socket.on('sendMessage',async (data)  => {
        try{
            const message = await Message.create({
                senderId: data.senderId,
                receiverId: data.receiverId,
                content: data.content,
                chatId: data.chatId,
                read: false,
            });
            io.emit('receiveMessage', message);
        }catch(err){
            console.error(err);
        }
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Health check
app.get('/', (_req, res) => res.send('🚀 Task Manager API is running...'));

// Start server and DB
const PORT = process.env.PORT || 26372;
sequelize.authenticate()
    .then(() => {
        console.log('✅ Connected to Mysql server');
        return sequelize.sync();
    })
    .then(() => {
        server.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
    })
    .catch((err) => console.error('❌ DB connection failed:', err));