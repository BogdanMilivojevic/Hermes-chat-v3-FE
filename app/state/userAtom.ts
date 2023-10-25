import { atom } from 'recoil';

export interface User {
    username: string,
    email: string,
    photo_id: string
}

export const currentUserAtom = atom<User>({
    key:'loggedIn',
    default:{
        username: '',
        email: '',
        photo_id: ''
    }
})