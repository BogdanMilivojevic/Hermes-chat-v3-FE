export interface ActiveDivI {
    name: string;
    active: boolean;
}

export interface Users {
    id:number,
    username: string,
    email:string,
    photo_id?:string,
    relationshipId?:number
} []