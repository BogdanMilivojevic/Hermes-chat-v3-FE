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
    // const currentUser = useRecoilValue(currentUserAtom)
    // const conversationUser = useRecoilValue(conversationUserAtom)
    // const setConversationUser = useSetRecoilState(conversationUserAtom)
    const [conversationUser,setConversationUser] = useState<User>({})
    const [messages,setMessages] = useState<Message[]>([])
    const [messageLimit, setMessageLimit] = useState<number>(15)
    const [currentUser, setCurrentUser] = useState<User>({})


    useEffect(() => {
        const storageUser = window.localStorage.getItem('conversationUser')
        const parsedObject = JSON.parse(storageUser)
        setConversationUser(parsedObject)
        const token = localStorage.getItem('token')

        const handleCurrentUser = async () => {
            try {
                const res = await axiosInstance.get('/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setCurrentUser(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        handleCurrentUser()
        return () => {
            setCurrentUser({})
            setConversationUser({})
        }

    }, [])


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
    },[messageLimit, conversationUser.conversationId, currentUser.id])


    useEffect(() => {
        socket.connect()

        if(currentUser.id) {
            socket.emit('createRoom', currentUser.id)
        }

        socket.on('onMessage', (payload) => {
            setMessages((prevMessages) => [...prevMessages, payload.message])
        })

        socket.on('onSetOnlineStatus', (payload) => {
            const storageUser = window.localStorage.getItem('conversationUser')
            const parsedObject = JSON.parse(storageUser)

            setConversationUser({...parsedObject,online: payload.online } )
        })

        return () => {
            socket.disconnect()
            socket.off('onMessage')
            socket.off('onSetOnlineStatus')
            setMessages([])
        }
    },[currentUser.id])


    return(
        <div className="main-page-container">
            <ConversationNavbar conversationUser={conversationUser}/> 
            <Messages messages={messages} setMessageLimit={setMessageLimit} messageLimit={messageLimit} currentUser={currentUser}/>  
            <InputBar conversationUser={conversationUser}/> 
        </div>
    )
}