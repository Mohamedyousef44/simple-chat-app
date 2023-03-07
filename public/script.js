let msgContainer = document.getElementById('msg-container');
let msgsControl = document.getElementById('msgs-control');
let msgInput = document.getElementById('msg-input');
let sendMsg = document.getElementById('send-msg');

const sender = prompt('what is your name');

const data = {
    sender,
}

const socket = io('http://localhost:3000');

socket.emit('new-user' , sender)

socket.on('connected' , name =>{
    
    createMsg('i am connected' , 'reciever' , name)
    msgContainer.style['overflow-y'] = checkHeight(msgContainer);
    
})
socket.on('reciving-msg' , data =>{

    createMsg(data.msg , 'reciever' , data.sender)
    msgContainer.style['overflow-y'] = checkHeight(msgContainer);
  
})
socket.on('i-kicked-out' , name =>{

    createMsg('i am disconnected' , 'reciever' , name)
    msgContainer.style['overflow-y'] = checkHeight(msgContainer);

})


msgsControl.addEventListener('submit' , (e)=>{

    e.preventDefault();

    msgContainer.style['overflow-y'] = checkHeight(msgContainer);

    if(msgInput.value != ""){

        createMsg(msgInput.value , 'sender')

        data.msg = msgInput.value;
        
        socket.emit("sending-msg" , data);

        msgInput.value = ""

    }

})

function createMsg(text , classSet , senderName = ""){

    let div = document.createElement('div');
    div.classList.add(classSet);
    let psender = document.createElement('p');
    psender.innerText = senderName;
    psender.classList.add('senderName')
    div.appendChild(psender);
    let pmsg = document.createElement('p');
    pmsg.innerText = text;
    div.appendChild(pmsg);
    msgContainer.appendChild(div)
}


function checkHeight(element){

    if(element.clientHeight > 450){
       return 'scroll';
    }else{
        return 'none';
    }
}