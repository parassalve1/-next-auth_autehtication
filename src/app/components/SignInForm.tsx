'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { CgPassword } from "react-icons/cg";
import { TfiEmail } from "react-icons/tfi";


import { z } from "zod"


interface SignInFormProps{
    callbackurl:string | undefined;
}

const formSchema = z.object({
    email:z.string().email('Plaese enter Valid Email!!'),
    password:z.string({
        required_error:'Please Enter valid Password!!'
    })
});

type InputType = z.infer<typeof formSchema>

export default function SignInForm(props: SignInFormProps) {
    const[visibleState , setVisibleState] = useState(false);
    const{register , handleSubmit , formState:{errors , isSubmitting}} = useForm<InputType>({
        resolver:zodResolver(formSchema),
    })
    const router = useRouter();
   const onSubmit : SubmitHandler<InputType> = async(data) =>{
    const result = await signIn('credentials',{
        redirect:false,
        username:data.email,
        password:data.password
    });

    if(!result?.ok){
      toast.error("Check Your Password again!")
      console.log(errors);
      return
    }
        toast.success('Welcome 🙏!!')
        router.push(props.callbackurl? props.callbackurl:'/' )
    } 
  return (
   <form onSubmit={handleSubmit(onSubmit)}
   className="grid place-content-stretch items-center gap-3 w-full p-24">
    <div className="h-16 w-full text-md p-3 font-semibold  rounded-lg  flex items-center
       bg-gradient-to-tr from-blue-500 to-pink-500 text-white shadow-lg mb-3 "
    >Sign Authentication</div>
        <Input 
        {...register('email')}
        label={'Email'}
        errorMessage={errors.email?.message}
        startContent={<TfiEmail className="w-6 text-black" />}  
        />
        <Input 
        {...register('password')}
        type={visibleState? 'text' : 'Password'}
        label={'Password'}
        errorMessage={errors.password?.message}
        startContent={<CgPassword className="w-6 text-black" />}
        className="mb-0"
        endContent={<button type="button" onClick={() => setVisibleState((prev) => !prev)}>
                {visibleState?(
                    <BsEyeFill className="w-4 text-black m-2 " />
                ):(
                    <BsEyeSlash className="w-4 text-black m-2" />
                )}
        </button>} 
        />
     <div className= "flex gap-3 text-sky-500  pl-5 transition-colors text-sm">
     <Link className=" hover:text-sky-600 "  
        href={'/auth/forgetPass'}
        >Forget password?</Link>
        <Link href={'/auth/signup'} className="hover:text-sky-600" 
        >Don't Have an Accout?</Link>
     </div>
       

        <div className=" w-full flex justify-center items-center ">
            <Button isDisabled={isSubmitting} 
             isLoading={isSubmitting}
              type="submit"
               variant="bordered"
                color="primary"
                size="lg">
                {isSubmitting? 'Submitting...':'Sign In'}
            </Button>
        </div>
   </form>
  )
}


