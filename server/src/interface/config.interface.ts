import { Request } from "express";
import { UserDocument } from "../database/models/User.model";


export interface RequestUser extends Request {
    user?:UserDocument,
    sessionId?:string
}