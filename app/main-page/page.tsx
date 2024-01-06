'use client'
import { useContext, useEffect } from 'react';
import MainPageNavbar from '../components/mainPageNavbar';
import { SocketContext } from '../utils/SocketProvider';


export default function MainPage () {
    const {socket} = useContext(SocketContext)

    useEffect(() => {
        if(socket.current) {
            socket.current.emit('createRoom', 45)
        }
    
    },[socket.current])
   
    return (
        <div className="main-page-container">
            <MainPageNavbar/>
        </div>
    )
}