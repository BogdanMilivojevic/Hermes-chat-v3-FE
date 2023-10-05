export interface InterfaceIcon {
    className?: string
    width?: number
    height?: number
    onClick?: () => void
}


export const UserDefaultIcon = ({className, width, height, onClick}:InterfaceIcon) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={width}
            height={height}
            onClick={onClick}
            className={className}
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#0B0C10" 
        >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2">
            </path><circle cx="12" cy="7" r="4"></circle></svg>
    )
}


export const Users = ({className, width, height, onClick}:InterfaceIcon) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            className={className}
            onClick={onClick}
            viewBox="0 0 24 24" 
            fill="none"
            stroke="#66FCF1"
        >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2">
            </path><circle cx="9" cy="7" r="4">
            </circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    )
}
export const AddFriend = ({className, width, height, onClick}:InterfaceIcon) => {
    return (
        <
            svg xmlns="http://www.w3.org/2000/svg" 
            width={width}
            height={height}
            className={className}
            onClick={onClick}
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#66FCF1" 
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2">
            </path><circle cx="8.5" cy="7" r="4">
            </circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
    )
}