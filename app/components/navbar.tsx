'use client'
import { Bird } from '@phosphor-icons/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loggedIn } from '../state/loggedInAtom';


export default function Navbar() {
    const router = useRouter()
    const logggedIn = useRecoilValue(loggedIn)
    const setLoggedIn = useSetRecoilState(loggedIn)

    const handleLogout = () => {
        localStorage.removeItem('token')
        setLoggedIn(false)
        router.push('/')
    }



    return (
        <div className="navbar-layout">
            <div className="content-container">
                <Link className='home-link' href='/'>
                    <div className='logo-container'>
                        <Bird className="logo-icon" size={36}/>
                        <h2>Hermes-chat</h2>
                    </div>
                </Link>
                { logggedIn ? ( <button className='login-button' onClick={handleLogout}>Logout</button>) 
                    : ( <Link className='login-button' href='/login'>Login</Link> )}
            </div>
        </div>
    )
}