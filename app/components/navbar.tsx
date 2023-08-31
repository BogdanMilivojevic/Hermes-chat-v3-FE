'use client'
import { Bird } from '@phosphor-icons/react';
import Link from 'next/link';


export default function Navbar() {
    return (
        <div className="navbar-layout">
            <div className="content-container">
                <Link className='home-link' href='/'>
                    <div className='logo-container'>
                        <Bird className="logo-icon" size={36}/>
                        <h2>Hermes-chat</h2>
                    </div>
                </Link>
                <Link className='login-button' href='/login'>Login</Link>
            </div>
        </div>
    )
}