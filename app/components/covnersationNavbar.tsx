import Image from 'next/image'
import { BackIcon, UserDefaultIcon } from './Icons/Icons'
import { User } from '../interfaces/interfaces';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Circle } from '@phosphor-icons/react';

interface ConversationIdProp {
    conversationUser: User
}


const ConversationNavbar:React.FC<ConversationIdProp>  = ({conversationUser}) => {
    const router = useRouter()

    const handleBackRoute = () => {
        router.push('/friends')
    }

    return(
        <div className="conversation-bar-container">
            <BackIcon height={32} width={32} className='back-icon' onClick={handleBackRoute}/>
            <div className='conversation-user-data-container'>
                <div className='conversation-user-icon-container'>
                    {conversationUser?.photo_id ? (<Image  src={`${process.env.API_URL}/${conversationUser.photo_id}`}  height={32} width={32} unoptimized alt='user-photo' className='profile-icon-icon'/>) : (
                        <UserDefaultIcon height={26} width={26} className='profile-icon-icon'/>
                    )}
                </div>
                <h1>{conversationUser?.username}</h1>
                {  conversationUser?.online        &&      <Circle width={32} height={32} className='online-status online'/>}
                {  !conversationUser?.online        &&      <Circle width={32} height={32} className='online-status offline'/>}
            </div>
        </div>
    )
}

export default ConversationNavbar