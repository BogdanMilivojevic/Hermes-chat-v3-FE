'use client'

import ConversationNavbar from '@/app/components/covnersationNavbar';
import InputBar from '@/app/components/inputBar';
import { currentUserAtom } from '@/app/state/userAtom';
import { socket } from '@/app/utils/socket';
import {  useEffect } from 'react';
import { useRecoilValue } from 'recoil';


export default function Conversation() {
    const currentUser = useRecoilValue(currentUserAtom)
    useEffect(() => {
        socket.connect()
        socket.emit('createRoom', currentUser.id)

        return () => {
            socket.off('onMessage')
            socket.disconnect()
        }
    },[])

    socket.on('onMessage', (payload) => {
        console.log(payload)
    })

    return(
        <div className="main-page-container">
            <ConversationNavbar/>   
            <InputBar/> 

        </div>
    )
}