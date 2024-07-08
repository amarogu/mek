import { Types } from "mongoose";

export interface IGift {
    title: string;
    description: string;
    value: number;
    img: string;
    soldOut: boolean;
}

export interface IGroup {
    users: Types.ObjectId[];
    name: string;
    gender: 'male' | 'female' | 'non-binary' | 'gender-fluid';
    link?: string;
    msgs: Types.ObjectId[];
    purchases: Types.ObjectId[];
}

export interface IMsg {
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUser {
    name: string;
    msgs: Types.ObjectId[];
    link?: string;
    gender: 'male' | 'female' | 'non-binary' | 'gender-fluid';
    purchases: Types.ObjectId[];
    role: 'admin' | 'individual';
    password?: string;
    confirmed: boolean;
    lastConfirmed: Date;
    lastRevokedConfirmation: Date;
}

export interface IPurchase {
    giftGiven: Types.ObjectId;
    msg: Types.ObjectId;
}