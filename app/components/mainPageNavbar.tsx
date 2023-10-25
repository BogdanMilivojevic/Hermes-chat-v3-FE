'use client'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AddFriend, UserDefaultIcon, Users } from './Icons/Icons';
import { User, currentUserAtom } from '../state/userAtom';
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { tokenAtom } from '../state/loggedInAtom';

export default  function MainPageNavbar() {
    const setCurrentUser = useSetRecoilState(currentUserAtom)
    const [user,setUser] = useState<User>({username:'', email:'', photo_id: ''})
    const setToken = useSetRecoilState(tokenAtom)
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
            setUser({username:'', email:'', photo_id: ''})
        }
    },[])

    const handleProfileSettingsRoute = () => {
        if(pathName === '/profile-settings') {
            return router.push('/main-page')
        }
        router.push('/profile-settings')
    }


    return (
        <div className="main-page-navbar">
            <div className={ pathName === '/profile-settings' ? 'main-page-profile-icon-container active-navbar-icon' : 'main-page-profile-icon-container'}>
                {user.photo_id ? (<Image  src={`${process.env.API_URL}/${user.photo_id}`}  height={32} width={32} unoptimized alt='user-photo' className='profile-icon-icon' onClick={handleProfileSettingsRoute}/>) : (
                    <UserDefaultIcon height={32} width={32} className='profile-icon-icon' onClick={handleProfileSettingsRoute}/>
                )}
            </div>
            <div className='users-icon-container'>
                <div className='users-div'>
                    <Users height={52} width={52} className='users-add-friend-icon'/>
                    <div className='requests-count'>
                        <p>0</p>
                    </div>
                </div>
                <AddFriend height={52} width={52} className='users-add-friend-icon'/>
            </div>
        </div>
    )

}