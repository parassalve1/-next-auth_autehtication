import jwt,{ JwtPayload } from "jsonwebtoken";


interface SignInOption {
    exprieIn: string | number;
}

const DEFAULT_SIGNIN_OPTION:SignInOption={
    exprieIn:'id'
}

export function signJWT(payload:JwtPayload , option:SignInOption = DEFAULT_SIGNIN_OPTION){
    const secretKey = process.env.JWT_USER_ID_SECRET!;
    const token = jwt.sign(payload , secretKey)
    return token;
}

export function verifyJWT(token:string){
   try {
     const secretKey = process.env.JWT_USER_ID_SECRET!;
     const decoded = jwt.verify(token , secretKey);
     return decoded as JwtPayload;
   } catch (error) {
    return null;
   }
}