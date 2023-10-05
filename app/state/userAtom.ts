import { atom } from 'recoil';

export const currentUser = atom({
    key:'loggedIn',
    default:{}
})