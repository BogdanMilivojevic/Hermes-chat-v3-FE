import { atom } from 'recoil';


export const NotificationsAtom = atom<number>({
    key:'notifications',
    default:0
})