import { atom } from 'recoil';
import { User } from '../interfaces/interfaces';



export const currentUserAtom = atom<User>({
    key:'currentUser',
    default:{
        id: 0,
        username: '',
        email: '',
        photo_id: '',
        conversationId: 0
    }
})