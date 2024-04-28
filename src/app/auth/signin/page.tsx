import SignInForm from "@/app/components/SignInForm";
import Image from "next/image";

interface Props{
    searchParams:{
        callbackurl?: string;
    }
}

export default function SignInPage({searchParams}:Props) {
  return (
    <div className="h-[91vh] grid grid-cols-1 md:grid-cols-2 place-items-center items-center gap-2">
        <Image src={'/login.png'} alt="page image" priority width={600} height={600} />
        <SignInForm callbackurl={searchParams.callbackurl} />
    </div>
  )
}
