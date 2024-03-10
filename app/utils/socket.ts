import { io } from 'socket.io-client';


let socketAssignable 
if(process.env.NODE_ENV === 'development') {

    socketAssignable = io('http://localhost:4000', {
        rejectUnauthorized: false
    });
}

if(process.env.NODE_ENV === 'production') {

    socketAssignable = io({
        rejectUnauthorized: false
    })
      

}

export const socket = socketAssignable! 
