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
} []

export interface Message {
    id:number,
    user_id: number,
    text?:string,
    url?:string[],
    createdAt?:string,
    updatedAt?:string
}

export interface MessageWithExtensionI extends Message {
    extension?:string
}