import { db } from "@/lib/db";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import NextAuth from "next-auth/next";
import { User } from "@prisma/client";
import GoogleProvider from 'next-auth/providers/google'

export const authOptions : AuthOptions ={

pages:{
    signIn:'/auth/signin'
},

session:{
    strategy:'jwt',
},

    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!,

        }),

        CredentialsProvider({
            name:'Credentials',

            credentials:{
                username:{
                    label:'User name',
                    type:'text',
                    placeholder:'Username'
                },
                password:{
                    label:'Password',
                    type:'password',
                 
                },
            },
            async authorize(credentials){
                //user authentication
                const user = await db.user.findUnique({
                    where:{
                        email:credentials?.username
                    }
                })
                if(!user) throw new Error('User is not Exist!');

                //password authenticate
                if(!credentials?.password) throw new Error('Password is empty!!')
                const isPasswordCorrect = await bcrypt.compare(credentials.password , user.password);
                if(!isPasswordCorrect) throw new Error('Password is invalid!!');
                if(user.emailVerified) throw new Error('Check Your Email!!');

                const{password , ...userWithOutPass} = user;

                return userWithOutPass;

            },

        
        }),

      
    ],

    callbacks:{
        async jwt({token , user}){
            if(user) token.user = user as User;
            return token;
        },
        async session({token , session}){
            session.user = token.user;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}