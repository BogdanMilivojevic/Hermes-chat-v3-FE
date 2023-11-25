import { ChangeEvent, useState } from 'react'
import mappedIcons from '../utils/mappedIcons'
import { PlusCircle, XCircle } from '@phosphor-icons/react'

const InputBar = () => {
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

    return (
        <>
            <div className='files-display-container'>
                {files.length > 0 && files.map((file,i) => (
                    <div key={i}>
                        {findValue(file.type)}
                        <XCircle height={22} width={22} className='remove-file' onClick={() => handleRemoveFile(i)}/>
                    </div>
                ))}
            </div>
            <div className="input-bar-container">
                <label htmlFor="file">
                    <PlusCircle className='plus-circle-icon' height={32} width={32}/>
                    <input style={{ display: 'none' }} type="file" id="file" onChange={(e) => handleSetFile(e)}/>
                </label>
                <input type='text' placeholder='Find users to chat with' className='input-bar' spellCheck="false" onChange={(e) => handleTextChange(e)}/>
            </div>
        </>
    )

}

export default InputBar