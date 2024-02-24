import { atom } from 'recoil';
import {  UsersRelationship } from '../interfaces/interfaces';


export const friendRequestsAtom = atom<UsersRelationship[]>({
    key:'friendRequests',
    default: [{
        id: 0,
        username: '',
        email: '',
        photo_id: '',
        relationshipId: 0
    }],
})