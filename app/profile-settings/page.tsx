'use client'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import MainPageNavbar from '../components/mainPageNavbar';
import { currentUserAtom } from '../state/userAtom';
import Image from 'next/image';
import { Cog, PasswordIcon, UserDefaultIcon } from '../components/Icons/Icons';
import { ChangeEvent, useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { tokenAtom } from '../state/loggedInAtom';
import axios, { AxiosError, AxiosResponse, isAxiosError } from 'axios';
import { ActiveDivI } from '../interfaces/interfaces';
import { Divide, Eye, EyeSlash } from '@phosphor-icons/react';

export default function ProfileSettings () {
    const currentUser = useRecoilValue(currentUserAtom)
    const setCurrentUser = useSetRecoilState(currentUserAtom)
    const token = useRecoilValue(tokenAtom)
    const [activeDivs,setActiveDivs] = useState<ActiveDivI[]>([
        {name:'account', active:false},
        {name:'password', active:false}
    ])
    const [isEditing, setIsEditing] = useState(false)
    const [usernameToUpdate,setUsernameToUpdate] = useState<string>('')
    const [emailToUpdate,setEmailToUpdate] = useState<string>('')
    const [file,setFile] = useState<File | null>(null)
    const [errorMessage,SetErrorMessage] = useState<string>('')

    //relate to Password change
    const [showPassword,setShowPassword] = useState<boolean>(false)
    const [showNewPassword,setShowNewPassword] = useState<boolean>(false)
    const [showConfirmPassword,setShowConfirmNewPassword] = useState<boolean>(false)
    const [originalPassword,setoriginalPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmPassword,setConfirmPassword] = useState<string>('')
    const [requestReady,setRequestReady] = useState<boolean>(false)
    const [errorMessages, setErrorMessages] = useState<string[]>([])


    const handleActiveDiv = (name:string) => {
        setActiveDivs((prevActiveDivs) =>
            prevActiveDivs.map((div) => ({
                ...div,
                active: div.name === name,
            }))
        );
        setShowPassword(false)
        setShowNewPassword(false)
        setShowConfirmNewPassword(false)
        setNewPassword('')
        setoriginalPassword('')
        setConfirmPassword('')
        setErrorMessages([])
    };

    useEffect(() => {
        setActiveDivs((prevActiveDivs) =>
            prevActiveDivs.map((div) => ({
                ...div,
                active: div.name === 'account',
            }))
        );
        setUsernameToUpdate(currentUser.username)
        setEmailToUpdate(currentUser.email)

        return() => {
            setUsernameToUpdate('')
            setEmailToUpdate('')
            setFile(null)
            SetErrorMessage('')
        }
    }, [])

    const toggleEditing = () => {
        setFile(null)
        setUsernameToUpdate(currentUser.username)
        setEmailToUpdate(currentUser.email)
        SetErrorMessage('')
        setIsEditing(!isEditing)
    }

    const handlePhotoChange = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const handleUsernameChange = (e:ChangeEvent<HTMLInputElement>) => {
        setUsernameToUpdate(e.target.value)
    }

    const handleEmailChange = (e:ChangeEvent<HTMLInputElement>) => {
        setEmailToUpdate(e.target.value)
    }

    const handleUpdateRequest = async () => {
        const email = emailToUpdate
        const username = usernameToUpdate

        try {
            const res: AxiosResponse = await axiosInstance.patch('/users/me', {
                username,
                email,
                file
            }, {
                headers: {
                    'Content-type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            })
            if(res.statusText === 'OK') {
                setCurrentUser(res.data[1][0])
                setIsEditing(!isEditing)
            }
        } catch (error) {
            console.log(error)
            if(axios.isAxiosError(error)) {
                SetErrorMessage(error.response?.data.message)
            }
        }

    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword)
    }

    const togglePasswordConfirmVisibility = () => {
        setShowConfirmNewPassword(!showConfirmPassword)
    }

    const handleoriginalPasswordChange = (e:ChangeEvent<HTMLInputElement>) => {
        setoriginalPassword(e.target.value)
    }

    const handleNewPasswordChange = (e:ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e:ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
    }

    useEffect(() => {
        const passwordRegex = /^(?=.*[0-9]).*$/;
        const timer = setTimeout(() => {
            if((newPassword && confirmPassword) && (newPassword !== confirmPassword)) {
                setErrorMessages((prev) => [...prev, 'Passwords don\'t match'])
            }

            if(newPassword && !passwordRegex.test(newPassword)) {
                setErrorMessages((prev) => [...prev, 'Password should have at least one number'])
            }

            if(newPassword && newPassword.length < 6) {
                setErrorMessages((prev) => [...prev, 'Password should be at least 6 characters long'])
            }

            if((originalPassword === newPassword) && (originalPassword.length > 0)) {
                setErrorMessages((prev) => [...prev, 'Current and new passwords cannot be same'])
            }
    
            if(originalPassword && newPassword && confirmPassword) {
                setRequestReady(true)
            }
        }, 700);

        return () => {
            clearTimeout(timer);
            setRequestReady(false)
            setErrorMessages([])
        }
    },[newPassword,confirmPassword, originalPassword])

    const handleUpdatePassword = async () => {
        setErrorMessages([])
        try {
            const res:AxiosResponse = await axiosInstance.patch('users/password/me', {
                originalPassword,
                newPassword
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(res)
        } catch (err) {
            console.log(err)
            if(isAxiosError(err)) {

                if(err.response?.data.message) return setErrorMessages((prev) => [...prev, err.response.data.message])
            }
            setErrorMessages((prev) => [...prev, 'Something went wrong'])
        }
    }

    return (
        <div className="main-page-container">
            <MainPageNavbar/>
            <div className='settings-options-container'>
                <div className='settings-options-left-side'>
                    <div className={activeDivs[0].active ? 'settings-icon-container active-div' : 'settings-icon-container'} onClick={() => handleActiveDiv('account')} >
                        <Cog height={32} width={32} ></Cog>
                        <p>profile info</p>
                    </div>
                    <div className={activeDivs[1].active ? 'settings-icon-container active-div' : 'settings-icon-container'} onClick={() => handleActiveDiv('password')}>
                        <PasswordIcon height={32} width={32}></PasswordIcon>
                        <p>password</p>
                    </div>
                </div>
                <div className='settings-options-right-side'>
                    <div className='profile-settings-form-container'>
                        {(currentUser && activeDivs[0].active && !isEditing ) && <div className='profile-settings-form'>
                            <div className='profile-settings-photo'>
                                {currentUser.photo_id ? (<Image src={`${process.env.API_URL}/${currentUser.photo_id}`} quality={100} height={32} width={32} unoptimized alt='user-photo' className='profile-settings-icon'/>) : (
                                    <UserDefaultIcon height={32} width={32} className='profile-settings-icon'/>
                                )}
                            </div>
                            <div className='profile-settings-username'>
                                <p>username:</p>
                                <p>{currentUser.username}</p>
                            </div>
                            <div className='profile-settings-email'>
                                <p>email:</p>
                                <p>{currentUser.email}</p>
                            </div>
                            <button className='update-button' onClick={toggleEditing}>UPDATE</button>
                        </div>}
                        {   isEditing && <div className='profile-settings-editing-form'>
                            <div className='profile-settings-edit-photo'>
                                <div className='uploadable-photo-container'>
                                    {(currentUser.photo_id && !file && <Image src={`${process.env.API_URL}/${currentUser.photo_id}`} quality={100} height={32} width={32} unoptimized alt='user-photo' className='profile-settings-icon'/> )}
                                    {(file && <Image src={URL.createObjectURL(file)} quality={100} height={32} width={32} unoptimized alt='user-photo' className='profile-settings-icon'/>  )}
                                    {(!currentUser.photo_id &&  !file) && <UserDefaultIcon height={32} width={32} className='profile-settings-icon'/>}
                                </div>
                                <label className='photo-upload' htmlFor="file">
                                    <input style={{ display: 'none' }} type="file" id="file" onChange={(e) => handlePhotoChange(e)}/>
                                    <span>Upload</span>
                                </label>
                            </div>
                            <div className='profile-settings-username-update'>
                                <label>username:</label>
                                <input spellCheck="false" type='text' value={usernameToUpdate} onChange={(e) => handleUsernameChange(e)}/>
                            </div>
                            <div className='profile-settings-email-update'>
                                <label>email:</label>
                                <input spellCheck="false" type='text' value={emailToUpdate} onChange={(e) => handleEmailChange(e)}/>
                            </div>
                            <div className='editing-form-save-cancel-options'>
                                <button className='update-button' onClick={handleUpdateRequest}>UPDATE</button>
                                <button className='update-button' onClick={toggleEditing}>CANCEL</button>
                            </div>
                            {errorMessage &&  <h1 className='error-message'>{errorMessage}</h1>}
                        </div>}
                        {(currentUser && activeDivs[1].active && !isEditing  )  && 
                            <div className='change-password-form'>
                                <div className='change-password-form-password'>
                                    { showPassword ? ( <EyeSlash onClick={togglePasswordVisibility} size={26} className='show-hide-password' />) 
                                        : (<Eye size={26} className='show-hide-password' onClick={togglePasswordVisibility} />)}
                                    <label>Current password :</label>
                                    <input type={showPassword ? 'text' : 'password'} onChange={(e) =>handleoriginalPasswordChange(e)} defaultValue={originalPassword}/>
                                </div>
                                <div className='change-password-form-password'>
                                    { showNewPassword ? ( <EyeSlash onClick={toggleNewPasswordVisibility} size={26} className='show-hide-password' />) 
                                        : (<Eye size={26} className='show-hide-password' onClick={toggleNewPasswordVisibility} />)}
                                    <label>New password:</label>
                                    <input type={showNewPassword ? 'text' : 'password'} onChange={(e) =>handleNewPasswordChange(e)} defaultValue={newPassword}/>
                                </div>
                                <div className='change-password-form-password'>
                                    { showConfirmPassword ? ( <EyeSlash onClick={togglePasswordConfirmVisibility} size={26} className='show-hide-password' />) 
                                        : (<Eye size={26} className='show-hide-password' onClick={togglePasswordConfirmVisibility} />)}
                                    <label>Confirm new password:</label>
                                    <input type={showConfirmPassword ? 'text' : 'password'} onChange={(e) => handleConfirmPasswordChange(e)} defaultValue={confirmPassword}/>
                                </div>
                                <div className='error-messages-container'>
                                    {errorMessages && errorMessages.map((value,i) => (
                                        <p className='error-message' key={i}>{value}</p>
                                    ))}
                                </div>
                                <button className={requestReady && errorMessages.length === 0 ? 'update-button' : 'update-button inactive'}  onClick={handleUpdatePassword}>CHANGE PASSWORD</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}