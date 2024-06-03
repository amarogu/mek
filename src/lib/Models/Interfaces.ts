import { Types } from "mongoose";

export interface IGift {
    title: string;
    description: string;
    value: number;
}

export interface IGroup {
    users: Types.ObjectId[];
    name: string;
    gender: 'male' | 'female' | 'non-binary' | 'gender-fluid';
    link?: string;
    msgs: Types.ObjectId[];
    giftsGiven: Types.ObjectId[];
}

export interface IMsg {
    owner: Types.ObjectId;
    content: string;
}

export interface IUser {
    name: string;
    msgs: Types.ObjectId[];
    link?: string;
    gender: 'male' | 'female' | 'non-binary' | 'gender-fluid';
    giftsGiven: Types.ObjectId[];
    role: 'admin' | 'individual';
    password?: string;
}