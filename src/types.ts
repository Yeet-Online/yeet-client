
export const SERVER_URL = "http://localhost:8080";

export type User =  {
    id: number;
    username: string;
    dateCreated: string;
    dateUpdate: string;
}

export type Yeet =  {
    id: number;
    user: User;
    content: string;
    dateCreated: string;
    dateUpdate: string;
}

export type LoginInput =  {
    username: string;
    password: string;
}