'use client'
import { MagnifyingGlassPlus } from '@phosphor-icons/react';
import MainPageNavbar from '../components/mainPageNavbar';
import debounce from 'lodash.debounce'
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useRecoilValue } from 'recoil';
import { tokenAtom } from '../state/loggedInAtom';
import { Users } from '../interfaces/interfaces';
import Image from 'next/image';
import { UserDefaultIcon } from '../components/Icons/Icons';



export  default function AddFriend ()  {
    const [users,setUsers] = useState<Users[]>([])
    const [pendingFriends,setPendingFriends] = useState<Users[]>([])
    const [friendRequestSent, SetFriendRequestSent] = useState<boolean>(false)
    const inputRef = useRef<string>('');

    const userSearch = async (value:string) => {
        setUsers([])
        try {
            const token = localStorage.getItem('token')
            const res = await axiosInstance.get('users/search', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params:{
                    username: value
                }
            })
            setUsers(res.data)
        } catch (error) {
            console.log(error)
        }


    }
    
    const resetInputValue = () => {
        inputRef.current.value = ''
    }
    
    const handleUserSearch = debounce((e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
    
        if(value.length > 0) {
            userSearch(value)
        }

        if(value.length === 0) {
            setUsers([])
        }
    }, 500)

    const handleSendFriendRequest = async (userId:number) => {
        SetFriendRequestSent(false)
        try {
            const token = localStorage.getItem('token')
            await axiosInstance.post('users/friend-request', {
                id: userId
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            SetFriendRequestSent(true)
            setUsers([])
            resetInputValue()
        } catch (error) {
            console.log(error)
        }
    }

    const indexPendingRequest = async( ) => {
        setPendingFriends([])
        const token = localStorage.getItem('token')
        try {
            const res = await axiosInstance.get('users/friend-request', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params:{
                    type: 'sent'
                }
            })
            setPendingFriends(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        indexPendingRequest()
        return () => {
            indexPendingRequest()
        }

    },[friendRequestSent])



    return (
        <div className="main-page-container">
            <MainPageNavbar/>
            <div className="search-bar-container">
                <MagnifyingGlassPlus className='search-icon' height={32} width={32}/>
                <input ref={inputRef} type='text' placeholder='Find users to chat with' className='search-input' spellCheck="false" onChange={(e) => handleUserSearch(e)}/>
            </div>
            <div className='searched-users-container'>
                {users.length > 0 && users.map((user) => 
                    <div key={user.id} className='searched-user'>
                        <div className='searched-user-icon-container'>
                            {user.photo_id ? (<Image  src={`${process.env.API_URL}/${user.photo_id}`}  height={32} width={32} unoptimized alt='user-photo' className='profile-icon-icon'/>) : (
                                <UserDefaultIcon height={26} width={26} className='profile-icon-icon'/>
                            )}
                        </div>
                        <p>{user.username}</p>
                        <div className='friend-requests-buttons-holder'>
                            <button className='friend-request-button' onClick={() =>handleSendFriendRequest(user.id)}>Send Friend Request</button>
                        </div>
                    </div>
                )}
            </div>
            <div className='pending-friend-requests'>
                <h1 className="headline-sent">Sent Friend Requests</h1>
                {pendingFriends.length > 0 && pendingFriends.map((user) => 
                    <div key={user.id} className='pending-user'>
                        <div className='pending-user-icon-container'>
                            {user.photo_id ? (<Image  src={`${process.env.API_URL}/${user.photo_id}`}  height={32} width={32} unoptimized alt='user-photo' className='profile-icon-icon'/>) : (
                                <UserDefaultIcon height={26} width={26} className='profile-icon-icon'/>
                            )}
                        </div>
                        <h1>{user.username}</h1>
                        <h1 className='pending-h1'>pending request</h1>
                    </div>
                )}
            </div>
        </div>
    )

}