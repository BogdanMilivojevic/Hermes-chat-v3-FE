import { atom } from 'recoil';
import { User } from '../interfaces/interfaces';


export const conversationUserAtom = atom<User>({
    key:'conversationUser',
    default:{
        id: 0,
        username: '',
        email: '',
        photo_id: ''
    }
})