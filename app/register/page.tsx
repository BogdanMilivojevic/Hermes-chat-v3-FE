'use client'
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { ChangeEvent, useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { AxiosResponse, isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { loggedIn } from '../state/loggedInAtom';

export default function Register() {
    const [email, setEmail] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const [activeButton, setActiveButton] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string[]>([])
    const setLoggedIn = useSetRecoilState(loggedIn)
    const router = useRouter()

    const handleEmailChange = (e:ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e:ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handlePasswordConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const togglePasswordConfirmVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const handleUsernameChange = (e:ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    useEffect(() => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const passwordRegex = /^(?=.*[0-9]).*$/;
        const timer = setTimeout(() => {
            if(email && !emailRegex.test(email)) {
                setErrorMessage((prev) => [...prev, 'Email must be valid'])
            }

            if(password && password.length < 6) {
                setErrorMessage((prev) => [...prev, 'Password should be at least 6 characters long'])
            }

            if(password && !passwordRegex.test(password)) {
                setErrorMessage((prev) => [...prev, 'Password should have at least one number'])
            }

            if(username && username.length < 4) {
                setErrorMessage((prev) => [...prev, 'Username should be at least 4 characters long'])
            }

            if(password && confirmPassword) {
                if(password !== confirmPassword) {
                    setErrorMessage((prev) => [...prev, 'Passwords don\'t match'])
                }
            }
            if(email && password && username && confirmPassword) {
                setActiveButton(true)
            }
    
        }, 700);

        return () => {
            clearTimeout(timer);
            setActiveButton(false)
            setErrorMessage([])
        }

    },[email, password, username, confirmPassword])

    const handleRegister = async () => {
        setErrorMessage([])

        try {
            const response:AxiosResponse = await axiosInstance.post('/auth/register', {
                email,
                password,
                username
            })

            localStorage.setItem('token', response.data)
            setLoggedIn(true)
            router.push('/main-page')
            
        } catch (err) {
            console.log(err)
            if(isAxiosError(err)) {

                if(err.response?.data.message) return setErrorMessage((prev) => [...prev, err.response.data.message])
            }
            setErrorMessage((prev) => [...prev, 'Something went wrong'])
        }
    }
 
    return(
        <div className="form-container">
            <div className="form-text">
                <label>EMAIL</label>
                <input
                    type="text"
                    defaultValue={email}
                    onChange={e => handleEmailChange(e)}
                    placeholder='email'
                    spellCheck="false"
                />
            </div>
            <div className="form-text">
                <label>USERNAME</label>
                <input
                    type="text"
                    defaultValue={username}
                    onChange={e => handleUsernameChange(e)}
                    placeholder='username'
                    spellCheck="false"
                />
            </div>
            <div className="form-password">
                <label>PASSWORD</label>
                { showPassword ? ( <EyeSlash onClick={togglePasswordVisibility} size={26} className='show-hide-password' />) 
                    : (<Eye size={26} className='show-hide-password' onClick={togglePasswordVisibility} />)}
                <input
                    type={showPassword ? 'text' : 'password'}
                    defaultValue={password}
                    onChange={e => handlePasswordChange(e)}
                    placeholder='password'
                />
            </div>
            <div className="form-password">
                <label>CONFIRM PASSWORD</label>
                { showConfirmPassword ? ( <EyeSlash onClick={togglePasswordConfirmVisibility} size={26} className='show-hide-password' />) 
                    : (<Eye size={26} className='show-hide-password' onClick={togglePasswordConfirmVisibility} />)}
                <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    defaultValue={confirmPassword}
                    onChange={e => handlePasswordConfirmChange(e)}
                    placeholder='password'
                />
            </div>
            <div className='error-container'>
                {errorMessage && errorMessage.map((value,i) => (
                    <p className='error-message' key={i}>{value}</p>
                ))}
            </div>
            <button className={activeButton && errorMessage.length === 0 ? 'form-button' : 'form-button inactive'} onClick={handleRegister}>Register</button>
        </div>
    )

}