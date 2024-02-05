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
import { socket } from '../utils/socket';
import { currentUserAtom } from '../state/userAtom';
import { Circle } from '@phosphor-icons/react';

export default function Friends () {
    const currentUser = useRecoilValue(currentUserAtom)
    const [friends,setFriends] = useState<User[]>([])
    const setConversationUserAtom = useSetRecoilState(conversationUserAtom)
    const [onlineStatus,setOnlineStatus] = useState({})
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')

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

        setConversationUserAtom(user)
        router.push(`conversation/${user.username}`)
    }

    useEffect(() => {
        socket.connect()
        socket.emit('createRoom', currentUser.id)

        socket.on('onSetOnlineStatus', (payload) => {
            setOnlineStatus(payload)

        })

        return () => {
            socket.off('onSetOnlineStatus')
            socket.disconnect()
            setOnlineStatus({})
        }
    },[])

    useEffect(() => {

        if(onlineStatus.id) {
            setFriends(friends.map(friend => {
                if(friend.id === onlineStatus.id) {
                    return {...friend, online: onlineStatus.online}
                } else {
                    return friend
                }
            }))
        }

    },[onlineStatus])


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
                        {  user.online        &&      <Circle width={32} height={32} className='online-status online'/>}
                        {  !user.online        &&      <Circle width={32} height={32} className='online-status offline'/>}
                    </div>
                )}
            </div>
        </div>
    )
}