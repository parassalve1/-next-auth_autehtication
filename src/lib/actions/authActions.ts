'use server'

import { User } from "@prisma/client";
import { db } from "../db";
import * as bcrypt from 'bcrypt'
import { signJWT, verifyJWT } from "../jwt";
import { compileResetPassTemplate, sendMail } from "../mail";


export async function Register (
    user:Omit<User, 'id' | 'emailVerified' | 'image'>
){
    const result = await db.user.create({
        data:{
            ...user,
            password:await bcrypt.hash(user.password , 10)
        },
    });

   
}


export async function ForgetPassword(email:string) {
    
    const user = await db.user.findUnique({
        where:{
            email:email,
        }
    });

    if(!user) throw new Error('User Does Not Exist!!')

    const JwtUserID = signJWT({
        id:user?.id,
    });

    const resetPass = `${process.env.NEXTAUTH_URL}/auth/resetPass/${JwtUserID}`;

    const body = compileResetPassTemplate(user.firstName , resetPass);

    const sendResult = await sendMail({
        to:user.email,
        subject: "Reset Password",
        body:body
    })
    return sendResult;
}


type ResetPasswordFunc = 
(JwtUserId: string , password: string) => Promise<"UserNotExist" | 'Success'>

export const ResetPassword:ResetPasswordFunc = async(JwtUserId ,password) =>{
    const payload = verifyJWT(JwtUserId);
    if(!payload) return 'UserNotExist';

    const userId = payload?.id;

    const user = await db.user.findUnique({
        where:{
            id:userId,
        }
    });

    if(!user) throw new Error("User Not Exist!!");

    const results = await db.user.update({
        where:{
            id:userId,
        },
        data:{
            
            password: await bcrypt.hash(password,10),
        }
    });
    if(results) return 'Success'
    else throw new Error('Somthing Went Wrong!!') 
}