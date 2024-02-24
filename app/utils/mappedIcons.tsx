import { File, FilePdf, FileVideo, Image } from '@phosphor-icons/react';
import { mappedIconsI } from '../interfaces/interfaces';

const mappedIcons:mappedIconsI = {
    'image/jpeg': <Image height={42} width={42} className='input-bar-icon'/>,
    'image/png': <Image height={42} width={42} className='input-bar-icon'/>,
    'image/gif': <Image height={42} width={42} className='input-bar-icon'/>,
    'image/bmp':<Image height={42} width={42} className='input-bar-icon'/>,
    'image/tiff': <Image height={42} width={42} className='input-bar-icon'/>,
    'image/webp': <Image height={42} width={42} className='input-bar-icon'/>,
    'image/svg+xml':<Image height={42} width={42} className='input-bar-icon'/>,
    'image/x-icon': <Image height={42} width={42} className='input-bar-icon'/>,
    'image/jp2': <Image height={42} width={42} className='input-bar-icon'/>,
    'image/heif': <Image height={42} width={42} className='input-bar-icon'/>,
    'image/heic': <Image height={42} width={42} className='input-bar-icon'/>,
    'video/mp4': <FileVideo height={42} width={42} className='input-bar-icon'/>,
    'video/webm':<FileVideo height={42} width={42} className='input-bar-icon'/>,
    'video/ogg': <FileVideo height={42} width={42} className='input-bar-icon'/>,
    'video/x-msvideo': <FileVideo height={42} width={42} className='input-bar-icon'/>,
    'video/quicktime':<FileVideo height={42} width={42} className='input-bar-icon'/> ,
    'application/pdf': <FilePdf height={42} width={42} className='input-bar-icon'/>,
    'application/msword': <File height={42} width={42} className='input-bar-icon'/>,
    'application/vnd.ms-excel':  <File height={42} width={42} className='input-bar-icon'/>,
    'application/vnd.ms-powerpoint': <File height={42} width={42} className='input-bar-icon'/>,
    'application/vnd.oasis.opendocument.text': <File height={42} width={42} className='input-bar-icon'/>,
    'application/rtf': <File height={42} width={42} className='input-bar-icon'/>,
}

export default mappedIcons