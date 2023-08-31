'use client'
import { Eye, EyeSlash } from '@phosphor-icons/react'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'



export default function Login() {
    const [email,setEmail] = useState<string>('example@mail.com')
    const [password, setPassword] = useState<string>('123456')
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleEmailChange = (e:ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e:ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }


    return(
        <div className="login-container">
            <div className="login-email">
                <label>EMAIL</label>
                <input
                    type="text"
                    defaultValue={email}
                    onChange={e => handleEmailChange(e)}
                />
            </div>
            <div className="login-password">
                <label>PASSWORD</label>
                { showPassword ? ( <EyeSlash onClick={togglePasswordVisibility} size={26} className='show-hide-password' />) 
                    : (<Eye size={26} className='show-hide-password' onClick={togglePasswordVisibility} />)}
                <input
                    type={showPassword ? 'text' : 'password'}
                    defaultValue={password}
                    onChange={e => handlePasswordChange(e)}
                />
            </div>
        </div>
    )
}