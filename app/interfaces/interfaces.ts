export interface ActiveDivI {
    name: string;
    active: boolean;
}

export interface User {
    id:number,
    username: string,
    email:string,
    photo_id:string,
} []

export interface UsersRelationship extends User {
    relationshipId:number
} 
