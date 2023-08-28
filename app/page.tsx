'use client'

import Link from 'next/link';
import { motion } from 'framer-motion'


export default function HermesChat() {
    return( 
        <motion.h1 className='homepage-cta'  
            initial={{    x:'-120%', y: '-50%'}}
            animate={{
                x:'0%',
                y:'0%',
                translateX: '-50%',
                translateY: '-50%',
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
                Hello there, 
            <Link className='homepage-cta-link' href='/login'>login</Link> to start chatting</motion.h1>
    )
}