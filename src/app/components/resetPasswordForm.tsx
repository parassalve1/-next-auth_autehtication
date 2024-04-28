'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TbPassword } from "react-icons/tb";
import { z } from "zod";
import { PasswordStrength } from "./PasswordStrength";
import { passwordStrength } from "check-password-strength";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { ResetPassword } from "@/lib/actions/authActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


interface Props{
  JwtUserId: string;
}

const formSchema = z.object({
  password:z.string()
            .min(6,'Minimum 6 Charectors is Required!!')
            .max(45,'Maximum 45 Charecter is Required!!'),
  
  confirmPassword:z.string()
}).refine(data => data.password === data.confirmPassword,{
  message:"Password and Confrim Password is not same!",
  path:['confirmPassword']
})

type InputType = z.infer<typeof formSchema>

export default function ResetPasswordForm({JwtUserId}:Props) {
const[visibleState , setVisibleState] = useState(false);
const[PassStrength , setPassStrength] = useState(0)

const router = useRouter();
const {register,handleSubmit,watch,formState:{errors,isSubmitting}} = useForm<InputType>({
  resolver:zodResolver(formSchema),
})

useEffect(() => {
  setPassStrength(passwordStrength(watch().password).id)
},[watch().password])

const resetPass:SubmitHandler<InputType> = async(data) =>{
  try {
    const results = await ResetPassword(JwtUserId , data.password)
    if(results) { 
      toast.success("Ypur password has been Successfully Reseted!!") 
      router.push('/auth/signin')
    }
  } catch (error) {
    toast.error('Somthinng Went Wrong !!');
    console.log(error);
    
  }
}

  return (
    <form onSubmit={handleSubmit(resetPass)}
    className="flex flex-col justify-center items-center gap-2 p-20 m-2 w-full">
      <Input 
      {...register('password')}
      label={'Password'}
      errorMessage={errors.password?.message}
      startContent={<TbPassword className="w-4 text-black" />}
      endContent={<button type="button" onClick={() => setVisibleState(prev => !prev)}>
        {visibleState?(
          <ImEye className="w-4 text-black'" />
        ):(
          <ImEyeBlocked className="w-4 text-black" />
        )}
      </button>}
      />

      <PasswordStrength passStrength={PassStrength} />
      <Input 
      {...register('confirmPassword')}
      label={'Confirm Password'}
      errorMessage={errors.confirmPassword?.message}
      startContent={<TbPassword className="w-4 text-black" />}
      endContent={<button type="button" onClick={() => setVisibleState(prev => !prev)}>
        {visibleState?(
          <ImEye className="w-4 text-black'" />
        ):(
          <ImEyeBlocked className="w-4 text-black" />
        )}
      </button>}
      />
       <Button type="submit"
             color="primary"
              variant="bordered"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              className=" w-40 ml-36"
              
              >{isSubmitting? 'Please Wait' : 'Submit'}
      </Button>
    </form>
  )
}
