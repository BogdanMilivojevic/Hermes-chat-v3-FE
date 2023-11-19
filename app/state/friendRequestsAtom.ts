import { atom } from 'recoil';
import { Users } from '../interfaces/interfaces';


export const friendRequestsAtom = atom<Users[]>({
    key:'friendRequests',
    default:{
        id:0,
        username: '',
        email: '',
        photo_id: '',
        relationshipId:0
    }
})