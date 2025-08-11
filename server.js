const express = require('express');
require('dotenv').config();
const{Server} = require('socket.io');
const http = require('http');

const {sequelize, Scout, Coach, ShortList,Player,Message} = require('./models');
const playerRoutes = require('./routes/playerRoute');
const coachRoutes = require('./routes/coachRoute');
const scoutRoutes = require('./routes/scoutRoute');

// Register routes
const playerController = require('./controller/playerController');
const coachController = require('./controller/coachController');
const scoutController = require('./controller/scoutController');

app.use('/api/player', playerRoutes(playerController));
app.use('/api/coach', coachRoutes(coachController));
app.use('/api/scout', scoutRoutes(scoutController));
app.use(express.urlencoded({ extended: true }));


// Initialize express
const app = express();
const server=http.createServer(app);

app.use(express.json());

// Socket.IO setup
const io = new Server(server, {
    cors: {
        origin: "*", // or your frontend URL
        methods: ["GET", "POST"]
    }
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
const PORT = process.env.PORT || 3000;
sequelize.authenticate()
    .then(() => {
        console.log('✅ Connected to Mysql server');
        return sequelize.sync();
    })
    .then(() => {
        app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
    })
    .catch((err) => console.error('❌ DB connection failed:', err));