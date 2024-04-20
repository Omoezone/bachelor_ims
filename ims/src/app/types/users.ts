export interface User {
    user_id: number;
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
}