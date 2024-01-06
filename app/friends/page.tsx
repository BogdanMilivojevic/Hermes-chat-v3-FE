'use client'
import { useEffect, useState } from 'react';
import MainPageNavbar from '../components/mainPageNavbar';
import axiosInstance from '../utils/axiosInstance';
import Image from 'next/image';
import { UserDefaultIcon } from '../components/Icons/Icons';
import { useRouter } from 'next/navigation';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { conversationUserAtom } from '../state/conversationUser';
import { User } from '../interfaces/interfaces';
import { socket } from '@/app/utils/socket';
import { currentUserAtom } from '../state/userAtom';

export default function Friends () {
    const [friends,setFriends] = useState<User[]>([])
    // const currentUser = useRecoilValue(currentUserAtom)
    const setConversationUserAtom = useSetRecoilState(conversationUserAtom)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        localStorage.removeItem('conversationUser')

        const getFriends = async () => {
            try {
                const res = await axiosInstance.get('users/friends', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                setFriends(res.data)
            } catch (error) {
                console.log(error)
            }
    
        }

        token && getFriends()
        return () => {
            getFriends()
        }
    },[])

    const handleConversationEnter = (user:User) => {

        const conversationUser = {
            id: user.id,
            username: user.username,
            emaiL: user.email,
            photo_id: user.photo_id,
            conversationId: user.conversationId
        }

        localStorage.setItem('conversationUser',JSON.stringify(conversationUser))
        
        setConversationUserAtom(user)
        router.push(`conversation/${user.username}`)
    }

    // useEffect(() => {
    //     const socketInstance = socket.connect()
    //     socket.emit('createRoom', currentUser.id)

    //     socket.on('onSetOnline', (payload) => {
    //         console.log(payload)
    //     })

    //     console.log(socketInstance)

    //     return () => {
    //         socket.off('onSetOnline')
    //         socket.disconnect()
    //     }
    // },[])

    return (
        <div className="main-page-container">
            <MainPageNavbar/>
            <h1 className="headline-friends">Friends</h1>
            <div className='friends-container'>
                {friends.length > 0 && friends.map((user) => 
                    <div key={user.id} className='friend-container' onClick={() => handleConversationEnter (user)}>
                        <div className='pending-user-icon-container'>
                            {user.photo_id ? (<Image  src={`${process.env.API_URL}/${user.photo_id}`}  height={32} width={32} unoptimized alt='user-photo' className='profile-icon-icon'/>) : (
                                <UserDefaultIcon height={26} width={26} className='profile-icon-icon'/>
                            )}
                        </div>
                        <h1>{user.username}</h1>
                    </div>
                )}
            </div>
        </div>
    )
}