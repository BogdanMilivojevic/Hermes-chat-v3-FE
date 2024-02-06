'use client'

import ConversationNavbar from '@/app/components/covnersationNavbar';
import InputBar from '@/app/components/inputBar';
import Messages from '@/app/components/messages';
import { Message, User } from '@/app/interfaces/interfaces';
import { conversationUserAtom } from '@/app/state/conversationUser';
import { currentUserAtom } from '@/app/state/userAtom';
import axiosInstance from '@/app/utils/axiosInstance';
import { socket } from '@/app/utils/socket';
import {  useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';


export default function Conversation() {
    const currentUser = useRecoilValue(currentUserAtom)
    // const conversationUser = useRecoilValue(conversationUserAtom)
    // const setConversationUser = useSetRecoilState(conversationUserAtom)
    const [conversationUser,setConversationUser] = useState<User>({})
    const [messages,setMessages] = useState<Message[]>([])
    const [messageLimit, setMessageLimit] = useState<number>(15)

    useEffect(() => {
        socket.connect()
        socket.emit('createRoom', currentUser.id)

        socket.on('onMessage', (payload) => {
            setMessages((prevMessages) => [...prevMessages, payload.message])
        })

        socket.on('onSetOnlineStatus', (payload) => {
            console.log(payload)
            setConversationUser({...conversationUser,online: payload.online } )
        })

        const storageUser = window.localStorage.getItem('conversationUser')
        const parsedObject = JSON.parse(storageUser)
        setConversationUser(parsedObject)

        return () => {
            socket.off('onMessage')
            socket.off('onSetOnlineStatus')
            socket.disconnect()
        }
    },[])


    useEffect(() => {
        const token = localStorage.getItem('token')
        const getMessagesfromConversation = async () => {
            try {
                if(conversationUser.conversationId) {

                    const res = await axiosInstance.get(`conversation/${conversationUser.conversationId}`, {
                        params:{
                            limit: messageLimit
                        },
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    })
                    setMessages(res.data)
                }
            } catch (error) {
                console.log(error)
            }
        }


        token &&  getMessagesfromConversation()

        return () => {
            getMessagesfromConversation()
        }
    },[messageLimit, conversationUser.conversationId])

    console.log(conversationUser, 'convoUser')


    return(
        <div className="main-page-container">
            <ConversationNavbar conversationUser={conversationUser}/> 
            <Messages messages={messages} setMessageLimit={setMessageLimit} messageLimit={messageLimit}/>  
            <InputBar conversationUser={conversationUser}/> 
        </div>
    )
}