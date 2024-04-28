'use client'

import { Button } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react"
import Link from "next/link";
import { ConfirmToast } from "react-confirm-toast";



export default function AuthButtons() {
  const{data:session} = useSession();

  
  return (
    <div className="flex items-center font-semibold gap-x-5 md:gap-x-16 sm:gap-x-28">
      {session && session.user?(
        <>
        <Link href={'/profile'} >{`${session.user.firstName} ${session.user.lastName}`}</Link>

        <ConfirmToast 
        asModal={true}
        customCancel={'No'}
        customConfirm={'Yes'}
        customFunction={() => signOut()}
        message={'Do you want to Sign Out?'}
        position={'top-left'}
        showCloseIcon={false}
        theme={'snow'}
        >
         <button className="px-3 py-2 text-black rounded-lg bg-white font-light text-sm">SignOut</button>

        </ConfirmToast>
        
        </>
      ):(
        <Button as={Link} href="/api/auth/signin">SignIn</Button>
      )}
    </div>
  )
}
