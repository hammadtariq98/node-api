const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 8080 
const album = require('./routes/albumRoutes');
const user = require('./routes/userRoutes');
const mongoose = require('mongoose');
mongoose 
 .connect("mongodb+srv://hammd:hammad89@cluster0.jxfdx.mongodb.net/test?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true  })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

app.use(bodyParser.json()) 
app.use('/api/', album.albumRoutes);
app.use('/api/user', user.userRoutes);

let server = http.createServer(app);
server.listen(PORT, ()=>{
    console.log(`Server started at: http://localhost:${PORT}`);
})

