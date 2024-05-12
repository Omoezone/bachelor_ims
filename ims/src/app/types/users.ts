import { Group } from "./group";
import { Invites } from "./invites";

export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    age: number;
    gender?: string;
}

export interface UserBase {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    age: number;
    gender?: string;
    groups: Group[];
    invites: Invites[];
}