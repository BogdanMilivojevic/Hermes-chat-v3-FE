import { ChangeEvent, useState } from 'react'
import mappedIcons from '../utils/mappedIcons'
import { PaperPlaneRight, PlusCircle, XCircle } from '@phosphor-icons/react'
import axiosInstance from '../utils/axiosInstance'
import { User } from '../interfaces/interfaces'


interface ConversationIdProp {
    conversationUser: User
}

const InputBar: React.FC<ConversationIdProp>  = ({conversationUser}) => {
    const [text,setText] = useState<string>('')
    const [files, setFiles] = useState<File[]>([])

    const handleTextChange = (e:ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)

    }

    const handleSetFile = (e:ChangeEvent<HTMLInputElement>) => {
        const file =  e.target.files ? e.target.files[0] : null

        if(file) {
            setFiles((prevFiles) => [...prevFiles, file])
        }

    }

    const findValue = (filetype:string) => {
        return mappedIcons[filetype]
    }

    const handleRemoveFile = (indexToRemove:number) => {
        setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
    }

    const sendMessage = async () => {
        const token = localStorage.getItem('token')
        const bodyFormData = new FormData()
        
        if(conversationUser.conversationId) {

            bodyFormData.append('conversationId', conversationUser.conversationId.toString())
        }
        bodyFormData.append('friendsId[]', conversationUser.id.toString())
        bodyFormData.append('text', text)

        for (let i = 0; i < files.length; i++) {
            bodyFormData.append('files', files[i]);
        }
        try {
            await axiosInstance.post('messages',
                bodyFormData ,          
                {
                    headers: {
                        'Content-type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }})
            setText('')
            setFiles([])
        } catch (error:any) {
            console.log(error)
        }

    }

    const handleKey = (e:React.KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && sendMessage()
    }

    return (
        <>
            <div className='files-display-container'>
                {files.length > 0 && files.map((file,i) => (
                    <div key={i} className='file-from-container'>
                        {findValue(file.type)}
                        <XCircle height={22} width={22} className='remove-file' onClick={() => handleRemoveFile(i)}/>
                    </div>
                ))}
            </div>
            <div className="input-bar-container">
                <label htmlFor="file">
                    <PlusCircle className='plus-circle-icon' height={32} width={32}/>
                    <input style={{ display: 'none' }} type="file" id="file" onChange={(e) => handleSetFile(e)} onKeyDown={handleKey}/>
                </label>
                <input type='text' placeholder='Find users to chat with'value={text} className='input-bar' spellCheck="false" onChange={(e) => handleTextChange(e)} onKeyDown={handleKey}/>
                <PaperPlaneRight className='send-button' onClick={sendMessage}/>
            </div>
        </>
    )

}

export default InputBar