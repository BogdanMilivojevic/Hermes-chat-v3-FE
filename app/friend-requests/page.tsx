'use client'
import { useEffect } from 'react';
import MainPageNavbar from '../components/mainPageNavbar';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { friendRequestsAtom } from '../state/friendRequestsAtom';
import Image from 'next/image';
import { UserDefaultIcon } from '../components/Icons/Icons';
import axiosInstance from '../utils/axiosInstance';
import { NotificationsAtom } from '../state/notificationsAtom';

export default function FriendRequests () {
    const friendRequests = useRecoilValue(friendRequestsAtom)
    const setNotificationsAtom = useSetRecoilState(NotificationsAtom)
    const setFriendRequestsAtom = useSetRecoilState(friendRequestsAtom)


    const fetchFriendRequests = async (token:string | null) => {
        try {
            const res = await axiosInstance.get('users/friend-request', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params:{
                    type: 'received'
                }
            })
            setFriendRequestsAtom(res.data)
            setNotificationsAtom(res.data.length)
        } catch (error) {
            console.log(error)
        }
    }

    const handleFriendRequestDecision = async(e, friendRequestId: number) => {   
        const actionType = e.target.className
        const token = localStorage.getItem('token')
        console.log(token)
        try {
            await axiosInstance.patch(`users/friend-request/${friendRequestId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params:{
                    type: actionType === 'accept-button' ? 'accept' : 'decline'
                }
            })

            fetchFriendRequests(token)
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className="main-page-container">
            <MainPageNavbar/>
            <h1 className="headline-received">Received Friend Requests</h1>
            <div className='received-friend-requests'>
                {friendRequests.length > 0 && friendRequests.map((user) => 
                    <div key={user.relationshipId} className='received-user'>
                        <div className='received-user-icon-container'>
                            {user.photo_id ? (<Image  src={`${process.env.API_URL}/${user.photo_id}`}  height={32} width={32} unoptimized alt='user-photo' className='profile-icon-icon'/>) : (
                                <UserDefaultIcon height={26} width={26} className='profile-icon-icon'/>
                            )}
                        </div>
                        <h1>{user.username}</h1>
                        <div className='friend-request-buttons'>
                            <button className='accept-button' onClick={(e) => handleFriendRequestDecision(e, user.relationshipId)}>Accept</button>  
                            <button className='decline-button'onClick={(e) => handleFriendRequestDecision(e, user.relationshipId)}>Decline</button> 
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}