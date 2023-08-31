'use client'

import Link from 'next/link';
import { motion } from 'framer-motion'
import { useState } from 'react';


export default function HermesChat() {
    const [heading,setHeading] = useState()

    return( 
        <motion.h1 className='homepage-cta'  
            initial={{    x:'-125%', y: '-50%', opacity:0.20}}
            animate={{
                x:'0%',
                y:'0%',
                translateX: '-50%',
                translateY: '-50%',
                opacity:1
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >  <Link className='homepage-cta-link' href='/login'>Login</Link>to start chatting</motion.h1>
    )
}