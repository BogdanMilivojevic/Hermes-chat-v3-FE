

const imagesWhitelist = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/tiff',
    'image/webp',
    'image/svg+xml',
    'image/x-icon',
    'image/jp2',
    'image/heif',
    'image/heic',
]

const videosWhiteList = [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/x-msvideo',
    'video/quicktime'
]

const filesWhiteList = [
    'application/pdf',
    'application/msword',
    'application/vnd.ms-excel',
    'application/vnd.ms-powerpoint',
    'application/vnd.oasis.opendocument.text',
    'application/rtf',
]

const returnTime = (createdAt:string) => {
    const date = new Date(createdAt)
    const options = { hour: 'numeric', minute: 'numeric', weekday: 'long' }
    const time = new Intl.DateTimeFormat('en-US', options).format(date)

    return time
}




export default {imagesWhitelist, filesWhiteList, videosWhiteList, returnTime}