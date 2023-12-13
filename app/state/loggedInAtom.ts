import { atom } from 'recoil';

export const tokenAtom = atom<string | null>({
    key:'tokenAtom',
    default:''
})