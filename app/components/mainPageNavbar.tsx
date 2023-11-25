'use client'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AddFriend, UserDefaultIcon, Users } from './Icons/Icons';
import {  currentUserAtom } from '../state/userAtom';
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { tokenAtom } from '../state/loggedInAtom';
import { ChatDots } from '@phosphor-icons/react';
import { friendRequestsAtom } from '../state/friendRequestsAtom';
import { NotificationsAtom } from '../state/notificationsAtom';
import { User } from '../interfaces/interfaces';

export default  function MainPageNavbar() {
    const setCurrentUser = useSetRecoilState(currentUserAtom)
    const setFriendRequestsAtom = useSetRecoilState(friendRequestsAtom)
    const setNotificationsAtom = useSetRecoilState(NotificationsAtom)
    const notifications = useRecoilValue(NotificationsAtom)
    const [user,setUser] = useState<User>({id: 0, username:'', email:'', photo_id: ''})
    const setToken = useSetRecoilState(tokenAtom)
    const currentUser = useRecoilValue(currentUserAtom)
    const router = useRouter()
    const pathName = usePathname()

    useEffect(() => {
        const handleCurrentUser = async () => {
            const token = localStorage.getItem('token')
            try {
                const res = await axiosInstance.get('/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUser(res.data)
                setCurrentUser(res.data)
                setToken(token)
            } catch (error) {
                console.log(error)
            }
        }
        handleCurrentUser()
        return () => {
            setUser({id:0, username:'', email:'', photo_id: ''})
        }
    },[])

    const handleProfileSettingsRoute = () => {
        if(pathName === '/profile-settings') {
            return router.push('/main-page')
        }
        router.push('/profile-settings')
    }

    const handleAddNewFriendRoute = () => {
        if(pathName === '/add-friend') {
            return router.push('/main-page')
        }
        router.push('/add-friend')
    }

    const handleFriendRequestsRoute = () => {
        if(pathName === '/friend-requests') {
            return router.push('/main-page')
        }
        router.push('/friend-requests')
    }

    const handleFriendsRoute = () => {
        if(pathName === '/friends') {
            return router.push('/main-page')
        }
        router.push('/friends')
    }


    useEffect(() => {
        const token = localStorage.getItem('token')
        const fetchFriendRequest = async() => {
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

        user && fetchFriendRequest()

        return () => {
            fetchFriendRequest()
        }
    },[user])


    return (
        <div className="main-page-navbar">
            <div className={ pathName === '/profile-settings' ? 'main-page-profile-icon-container active-navbar-icon' : 'main-page-profile-icon-container'}>
                {currentUser?.photo_id ? (<Image  src={`${process.env.API_URL}/${currentUser?.photo_id}`}  height={32} width={32} unoptimized alt='user-photo' className='profile-icon-icon' onClick={handleProfileSettingsRoute}/>) : (
                    <UserDefaultIcon height={32} width={32} className='profile-icon-icon' onClick={handleProfileSettingsRoute}/>
                )}
            </div>
            <div className='users-icon-container'>
                <ChatDots  className={ pathName === '/friends' ? 'chat-icon active-icon' : 'chat-icon'} size={52} onClick={handleFriendsRoute}/>
                <div className='users-div'>
                    <Users height={52} width={52} className={ pathName === '/friend-requests' ? 'users-add-friend-icon active-navbar-route-icon' : 'users-add-friend-icon'}onClick={handleFriendRequestsRoute}/>
                    <div className='requests-count'>
                        <h1>{notifications}</h1>
                    </div>
                </div>
                <AddFriend height={52} width={52} className={ pathName === '/add-friend' ? 'users-add-friend-icon active-navbar-route-icon' : 'users-add-friend-icon'} onClick={handleAddNewFriendRoute}/>
            </div>
        </div>
    )

}