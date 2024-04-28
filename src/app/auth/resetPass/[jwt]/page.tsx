import ResetPasswordForm from "@/app/components/resetPasswordForm";
import { verifyJWT } from "@/lib/jwt";
import Image from "next/image";
import toast from "react-hot-toast";

interface Props{
    params:{
        jwt:string;
    }
}



export default function ForgetPasswordPage({params}:Props) {
const payload = verifyJWT(params.jwt);
if(!payload) return <div className="h-[91vh] flex flex-col justify-center items-center
text-2xl text-red-500 font-semibold">
Url is not valid!!
{toast.error('Url is not valid!! ')}
</div>

  return (
    <div className="h-[91vh] grid grid-cols-1 md:grid-cols-3 place-items-center items-center gap-3">
        <ResetPasswordForm JwtUserId={params.jwt} />
        <Image src={'/resetPass.png'} alt="image" priority height={600} width={600} className="col-span-2" />
    </div>
  )
}
