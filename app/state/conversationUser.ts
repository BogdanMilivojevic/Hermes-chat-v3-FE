import { atom } from 'recoil';
import { User } from '../interfaces/interfaces';


export const conversationUserAtom = atom<User>({
    key:'conversationUser',
    default:{
        id: 0,
        username: '',
        email: '',
        photo_id: '',
        conversationId:0, 
        online:false,
        lastMessage:'', 
        lastMessageSenderId:0
    }
})