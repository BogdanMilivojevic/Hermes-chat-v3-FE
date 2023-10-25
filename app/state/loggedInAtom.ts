import { atom } from 'recoil';

export const tokenAtom = atom<string>({
    key:'tokenAtom',
    default:''
})