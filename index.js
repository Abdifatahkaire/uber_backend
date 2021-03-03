const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const cors=require('cors');
const port = 4001;

const router=require('./routes/route');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var http = require('http').createServer(app);
var io = require("socket.io")(http,{
    cors: {
        origin:"http://localhost:3000/map"
    }
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());



let interval = [];

io.on("connection", (socket) => {
  console.log("New client connected"+socket.id);
  if (interval[socket.id]) {
    clearInterval(interval[socket.id]);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected"+socket.id);
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/user', {useNewUrlParser: true, useUnifiedTopology: true});




app.use('/',router); 



http.listen(port,()=>{
    console.log(`server listen at port ${port}`);
})