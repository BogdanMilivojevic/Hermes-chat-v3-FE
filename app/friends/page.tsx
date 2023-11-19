'use client'
import { useEffect, useState } from 'react';
import MainPageNavbar from '../components/mainPageNavbar';
import { Users } from '../interfaces/interfaces';
import axiosInstance from '../utils/axiosInstance';
import Image from 'next/image';
import { UserDefaultIcon } from '../components/Icons/Icons';

export default function Friends () {
    const [friends,setFriends] = useState<Users[]>([])

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

    return (
        <div className="main-page-container">
            <MainPageNavbar/>
            <h1 className="headline-friends">Friends</h1>
            <div className='friends-container'>
                {friends.length > 0 && friends.map((user) => 
                    <div key={user.id} className='friend-container'>
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