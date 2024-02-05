import Image from 'next/image';
import { Message, User } from '../interfaces/interfaces';
import helpers from '../utils/helpers';
import ReactPlayer from 'react-player';
import { File } from '@phosphor-icons/react';
import { useRecoilValue } from 'recoil';
import { currentUserAtom } from '../state/userAtom';
import { useEffect, useRef, useState } from 'react';


interface MessageProp {
    messages: Message[]
    messageLimit: number
    setMessageLimit:  React.Dispatch<React.SetStateAction<number>>
}

const Messages: React.FC<MessageProp> = ({ messages,setMessageLimit, messageLimit }) => {
    const [conversationUser, setConversationUser] = useState<User>()
    const currentUser = useRecoilValue(currentUserAtom)
    const messageRef = useRef()
    const lastIndex:number = messages.length - 1

    // useEffect(() => {
    //     const storageUser = window.localStorage.getItem('conversationUser')
    //     const parsedObject = JSON.parse(storageUser)
    //     setConversationUser(parsedObject)
    // },[])

    useEffect(() => {
        if(messages.length > 0) {
            const timer = setTimeout(() => {
                messageRef?.current.lastElementChild.scrollIntoView({ behavior: 'smooth' })
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [conversationUser])

    const fetchMore = () => {
        setMessageLimit(messageLimit + 20)
    }

    useEffect(() => {
        if(messages.length > 0) {
            const timer = setTimeout(() => {
                const observer = new IntersectionObserver((entries) => {
                    const entry = entries[0]
                    if (entry.isIntersecting && messages.length >= 15) {
                        fetchMore()
                        observer.unobserve(entry.target)
                    }
                }, {
                    threshold: 1
                })
                if (messageLimit > messages.length) {
                    observer.unobserve(messageRef.current.firstElementChild)
                }
                if (messageRef.current.firstElementChild) {
                    observer.observe(messageRef.current.firstElementChild)
                }
            }, 1500)
            return () => clearTimeout(timer)
        }
    }, [messages])

    // Scrolling to the latest message if there is a new latest message
    useEffect(() => {
        messageRef.current.lastElementChild?.scrollIntoView({ behavior: 'smooth' })

    }, [messages[lastIndex]])



    const findValue = (url:string) => {
        const splitedUrl = url.split('.')
        const extension:string = splitedUrl[splitedUrl.length - 1] 


        if(helpers.videosWhiteList.includes(`video/${extension}`)) {
            return <ReactPlayer 
                width="300px" 
                height="300px" 
                controls={true}
                url={`${process.env.API_URL}/${url}`}/>
        }
        if(helpers.imagesWhitelist.includes(`image/${extension}`)) {
            return <Image src={`${process.env.API_URL}/${url}`} className='message-photo' quality={100} height={200} width={200} unoptimized alt='user-photo'/>
        }

        if(helpers.filesWhiteList.includes(`application/${extension}`)) {
            return <a href={`${process.env.API_URL}/${url}`}  target="_blank" rel="noopener noreferrer" className='a-link-file'><File className='linked-file'/>{`file.${extension}`}</a>
        }
    }

    
    return (
        <div className="messages-container" ref={messageRef}>
            {messages.length > 0 && messages.map((message) => (
                <div  key={message.id} className='sender-and-message-container'>
                    <div className='sender-image-container'>
                        {message.user_id === currentUser.id ? <Image src={`${process.env.API_URL}/${currentUser?.photo_id}`} quality={100} height={100} width={100} unoptimized alt='user-photo' className='sender-image'/>  : <Image src={`${process.env.API_URL}/${conversationUser?.photo_id}`} quality={100} height={100} width={100} unoptimized alt='user-photo' className='sender-image'/>}
                    </div>
                    <div className="message-container">
                        {message.url && <div className='files-container'>
                            {message.url.map((url,i) => (
                                <div key={i} className='file-container'>
                                    {findValue(url)}
                                </div>
                            ))}
                        </div>}
                        <p>{message.text}</p>
                        <p className='timestamp'>{helpers.returnTime(message.createdAt!)}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
  
export default Messages