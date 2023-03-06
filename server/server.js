let PORT = process.env.PORT || 3000 ;

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const users = {};

var options = {
    root: path.join(__dirname , '../client/')
};


app.get('/' , (req , res)=>{
    var options = {
        root: path.join(__dirname , '../')
    };
    var fileName = 'index.html' ;
    res.sendFile( fileName , options)
})
app.get('/client/style.css' , (req , res)=>{
    var fileName = 'style.css' ;
    res.sendFile( fileName , options)
})
app.get('/client/script.js' , (req , res)=>{
    var fileName = 'script.js' ;
    res.sendFile( fileName , options)
})


io.on('connection', socket =>{
    
    socket.on('new-user' , name=>{
        
        users[socket.id] = name;
        socket.broadcast.emit( 'connected', name)
    })
    
    socket.on('sending-msg', data =>{
        
        socket.broadcast.emit('reciving-msg' , data)
    })

    socket.on('disconnect' , () =>{
        socket.broadcast.emit("i-kicked-out" , users[socket.id] )
    })
    
})

server.listen(PORT , ()=>{console.log('http://localhost:'+PORT)});