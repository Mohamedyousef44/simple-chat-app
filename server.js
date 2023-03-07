

let PORT = process.env.PORT || 3000 ;
const express = require('express')
const app = new express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.set( 'view engine' , 'ejs');
app.set('views' , __dirname + '/views')
app.use(express.static('public'))

app.get('/' , (req , res)=>{

    res.render( 'index' )
})

const users = {};

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