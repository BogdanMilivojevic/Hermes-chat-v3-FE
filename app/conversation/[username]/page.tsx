'use client'

import ConversationNavbar from '@/app/components/covnersationNavbar';
import InputBar from '@/app/components/inputBar';
import Messages from '@/app/components/messages';
import { Message } from '@/app/interfaces/interfaces';
import { conversationUserAtom } from '@/app/state/conversationUser';
import { currentUserAtom } from '@/app/state/userAtom';
import axiosInstance from '@/app/utils/axiosInstance';
import { socket } from '@/app/utils/socket';
import {  useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';


export default function Conversation() {
    const currentUser = useRecoilValue(currentUserAtom)
    const conversationUser = useRecoilValue(conversationUserAtom)
    const [messages,setMessages] = useState<Message[]>([])
    const [messageLimit, setMessageLimit] = useState<number>(15)

    useEffect(() => {
        socket.connect()
        socket.emit('createRoom', currentUser.id)

        socket.on('onMessage', (payload) => {
            setMessages((prevMessages) => [...prevMessages, payload.message])
        })

        return () => {
            socket.off('onMessage')
            socket.disconnect()
        }
    },[])


    useEffect(() => {
        const token = localStorage.getItem('token')
        const getMessagesfromConversation = async () => {
            try {
                const res = await axiosInstance.get(`conversation/${conversationUser.conversationId}`, {
                    params:{
                        limit: messageLimit
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                setMessages(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        token && getMessagesfromConversation()

        return () => {
            getMessagesfromConversation()
        }
    },[messageLimit])

    console.log(messageLimit)


    return(
        <div className="main-page-container">
            <ConversationNavbar/> 
            <Messages messages={messages} setMessageLimit={setMessageLimit} messageLimit={messageLimit}/>  
            <InputBar conversationUser={conversationUser}/> 
        </div>
    )
}