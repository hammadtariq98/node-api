const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 8080 
const album = require('./routes/albumRoutes');
const user = require('./routes/userRoutes');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path')
const Chat = require("./models/chat");

// const cloudinary = require('cloudinary')

// app.use(cloudinary.config({ 
//     cloud_name: 'tkhf', 
//     api_key: '355474978769313', 
//     api_secret: '37OXkC9lAt3cZyCO6kUaeYtE86c' 
//   }))

require('./config/passport')(passport);
require('./config');

app.use(passport.initialize());

require('dotenv').config()

mongoose 
 .connect("mongodb+srv://hammd:hammad89@cluster0.jxfdx.mongodb.net/test?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true  })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));



app.use(bodyParser.json()) 
app.use('/api/', album.albumRoutes);
app.use('/api/user', user.userRoutes);

app.use(express.static(__dirname + '/client'));
app.get('*', (req, res) => res.sendFile(path.normalize(__dirname + '/client/index.html')));


let server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:8080",
    },
  });



io.on('connection', async (socket) => {
    console.log("socket id", socket.id)
    const chats = await Chat.find()
    io.emit('chat_list', chats);

    socket.on('chat message',async msg => {
        let msgCreated =  new Chat({ msg })
        await msgCreated.save()
      io.emit('chat message', msgCreated);
    });
  });


server.listen(PORT, ()=>{
    console.log(`Server started at: http://localhost:${PORT}`);
})


