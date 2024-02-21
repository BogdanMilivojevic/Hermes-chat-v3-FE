export interface ActiveDivI {
    name: string;
    active: boolean;
}

export interface User {
    id:number,
    username: string,
    email:string,
    photo_id:string,
    conversationId?:number
    online:boolean,
    lastMessage: string,
    lastMessageSenderId:number
} []

export interface Message {
    id:number,
    user_id: number,
    text?:string,
    url?:string[],
    createdAt?:string,
    updatedAt?:string
}

export interface OnlineStatus{
    id: number,
    online: boolean
}

export interface MessageWithExtensionI extends Message {
    extension?:string
}

export interface WebSocketStatus {
    id:number,
    online:boolean
}

export interface WebSocketMessage {
    id: number,
    text: string,
    user_id: number,
    createdAt: string,
    updatedAt: string
}