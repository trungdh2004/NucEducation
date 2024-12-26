export type UserType = {
    _id:string;
    avatar:string;
    createdAt:string;
    email:string;
    isAdmin:boolean;
    isGoogle:boolean;
    isVerify:boolean;
    name:string;
}

export type FormLoginType = {
    email:string;
    password:string;
}

export type FormRegisterType = {
  name: string;
  confirmPassword: string;
} & FormLoginType;