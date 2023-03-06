let PORT = process.env.PORT || 3000 ;

const users = {};

const io = require('socket.io')(PORT , {
    cors:{
        origin:['http://127.0.0.1:5500']
    }
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