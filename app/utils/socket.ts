import { io } from 'socket.io-client';

// const url = process.env.API_URL

export const socket = io('http://localhost:4000', {
    autoConnect:false
});