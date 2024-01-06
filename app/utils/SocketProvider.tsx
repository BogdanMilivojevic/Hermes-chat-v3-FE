'use client'

import React, { createContext, useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { io } from 'socket.io-client'
import { currentUserAtom } from '../state/userAtom'
import { tokenAtom } from '../state/loggedInAtom'

export const SocketContext = createContext({})
export const SocketContextProvider = ({ children }) => {
    const socket = useRef()
    const token = useRecoilValue(tokenAtom)


    useEffect(() => {
        socket.current = io('http://localhost:4000', {
            autoConnect:false
        })
        socket.current.connect()
        return () => socket.current?.disconnect()
    }, [token])

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}