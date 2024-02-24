'use client'
import { Bird } from '@phosphor-icons/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { tokenAtom } from '../state/loggedInAtom';
import { useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';


export default function Navbar() {
    const router = useRouter()
    const token = useRecoilValue(tokenAtom)
    const setToken = useSetRecoilState(tokenAtom)

    const handleLogout = async () => {
        
        try {
            await axiosInstance.get('auth/logout', {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            
        } catch (error:any) {
            console.log(error)
            return
        }
        localStorage.removeItem('token')
        setToken('')
        router.push('/')
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            setToken(token)
        }
    },[])


    return (
        <div className="navbar-layout">
            <div className="content-container">
                <Link className='home-link' href={token ? '/main-page' : '/'}>
                    <div className='logo-container'>
                        <Bird className="logo-icon" size={36}/>
                        <h2>Hermes-chat</h2>
                    </div>
                </Link>
                { token ? ( <button className='login-button' onClick={handleLogout}>Logout</button>) 
                    : ( <Link className='login-button' href='/login'>Login</Link> )}
            </div>
        </div>
    )
}