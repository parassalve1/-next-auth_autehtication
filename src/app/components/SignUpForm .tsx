'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { z } from "zod"
import validator from "validator";
import { useEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { MdOutlineMarkEmailUnread, MdOutlineMobileScreenShare } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import Link from "next/link";
import { Register } from "@/lib/actions/authActions";
import { passwordStrength } from "check-password-strength";
import { PasswordStrength } from "./PasswordStrength";
import toast from "react-hot-toast";

const formSchema = z.object({
  firstName:z.string()
            .min(2,"Firstname must be more than 2 charectors!")
            .max(45,'Firstname must be less than 45 charectors!')
            .regex(new RegExp('^[a-zA-Z]+$'),'No Speial Charector are Allowed!!'),

  lastName:z.string()
            .min(2,"Firstname must be more than 2 charectors!")
            .max(45,'Firstname must be less than 45 charectors!')
            .regex(new RegExp('^[a-zA-Z]+$'),'No Speial Charector are Allowed!!'),

  email:z.string().email('Check Your Email!!'),

  phone:z.string().refine(validator.isMobilePhone,"Phone Number is Invalid"),
  
  password:z.string()
          .min(6,'Password must be Greater then 6 laters!!')
          .max(45,'Password must be less than 45 laters!! '),
  confirmPassword:z.string()
          .min(6,'Password must be Greater then 6 laters!!')
          .max(45,'Password must be less than 45 laters!! '),

  accepted:z.literal(true,{
    errorMap:() =>({
      message:'All terms be accepted!!'
    })
  })         
         
}).refine(data => data.password === data.confirmPassword,{
  message:'Password and confirmPassword is Not same!!',
  path:['confirmPassword']
});

type InputType = z.infer<typeof formSchema>


export default function SignUpForm () {
const[isVisiblePass , setVisiblePass] = useState(false)
const[passStrength , setPassStrength] = useState(0)


const{register ,handleSubmit ,control,watch,formState:{errors,isSubmitting}} = useForm<InputType>({
  resolver: zodResolver(formSchema)
})

useEffect(() => {
  setPassStrength(passwordStrength(watch().password).id);
},[watch().password])
const saveUser : SubmitHandler<InputType> = async(data) =>{
  const{accepted , confirmPassword , ...user} = data;

  try {
    const result = await Register(user);
    toast.success('User Registered Successfully!!')
  } catch (error) {
    toast.error('Something went Wrong!!')
    console.log(error);
    
  }
 
}



  return (

    <form onSubmit={handleSubmit(saveUser)} className="grid grid-cols-2 gap-3 p-20 place-items-stretch w-full ">
      <div className="col-span-2 p-3 font-semibold rounded-lg
      bg-gradient-to-tr from-blue-500 to-pink-500 text-white shadow-lg">Sign Up Authentication</div>
      <Input {...register('firstName')}
       label={"firstName"}
        errorMessage={errors.firstName?.message}
         isInvalid={!!errors.firstName}
         startContent={<FaRegUser className="text-black w-3" />}
         />
      <Input {...register('lastName')}
       label={"lastName"}
        errorMessage={errors.lastName?.message}
         isInvalid={!!errors.lastName}
         startContent={<FaRegUser className="text-black w-3" />}
         />
      <Input {...register('email')}
       label={"Email"}
        errorMessage={errors.email?.message}
         isInvalid={!!errors.email}
         startContent={<MdOutlineMarkEmailUnread className="text-black" />}
         className="col-span-2"
         />
      <Input {...register('phone')}
       label={"Phone"}
        errorMessage={errors.phone?.message}
         isInvalid={!!errors.phone}
         startContent={<MdOutlineMobileScreenShare className="text-black" />}
         className="col-span-2"
         />
      <Input {...register('password')}
       label={"Password"}
       type={isVisiblePass? 'Password':'text'}
        errorMessage={errors.password?.message}
         isInvalid={!!errors.password}
         startContent={<TbPasswordUser className="text-black" />}
         className="col-span-2"
         endContent={
          <button type="button">
            {isVisiblePass? (
              <IoEyeOff onClick={()=> setVisiblePass((prev) => !prev)} className="text-black w-4  cursor-pointer" />
            ):(
              <IoEye onClick={()=> setVisiblePass((prev) => !prev)} className='text-black w-4  cursor-pointer' />
            )}
          </button>
         }
         />

         <PasswordStrength passStrength={passStrength} />
      <Input {...register('confirmPassword')}
       
       type={isVisiblePass? 'Password':'text'}
       label={"Confirm Password"}
        errorMessage={errors.confirmPassword?.message}
         isInvalid={!!errors.confirmPassword}
         startContent={<TbPasswordUser className="text-black" />}
         className="col-span-2"
         endContent={
          
            <>
            {isVisiblePass? (
              <IoEyeOff onClick={()=> setVisiblePass((prev) => !prev)} className="text-black w-4 cursor-pointer" />
            ):(
              <IoEye onClick={()=> setVisiblePass((prev) => !prev)} className='text-black w-4 cursor-pointer' />
            )}
            </>
         
         }
         />
        <Controller control={control} name="accepted" render={({field}) => (
           <Checkbox onChange={field.onChange} onBlur={field.onChange} className="col-span-2" color="primary">
           <span className="text-white text-sm">I Accept the <Link className='text-sky-500 font-semibold' href={'/terms'}>Terms</Link></span>
          </Checkbox>
        )} />
        <div className="col-span-2 flex justify-center items-center ">
        <Button isDisabled={isSubmitting}
        size="lg"
          isLoading={isSubmitting}
          type="submit"
           color="primary"
            variant="bordered"
            >{isSubmitting? 'Submitting...' : 'Sign Up'}</Button>

        </div>
    </form>
  )
}
