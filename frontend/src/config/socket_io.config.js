import socket from 'socket.io-client';


let socketInstance=null;

// socket.io initialization
export const initializationSocket=(projectId)=>{

    // it connects the frontend with backend through socket.io connection 
    socketInstance=socket(import.meta.env.VITE_SOCKET_URI,{
        auth:{
            token:localStorage.getItem("token")
        },
        query:{
            projectId:projectId
        }
    })
}


// recieve message
export const receiveMessage=(event,callback)=>{

    socketInstance.on(event,callback);
    
}

// send message
export const sendMessage=(event,data)=>{

    socketInstance.emit(event,data);
}