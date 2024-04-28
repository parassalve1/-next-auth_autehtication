'use client'

import { ForgetPassword } from "@/lib/actions/authActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { toast } from "react-hot-toast";
import { z } from "zod"


const formSchema = z.object({
    email:z.string().email("Enter a User Email!!")
});

type InputType = z.infer<typeof formSchema>



export default function page() {

    const{register , handleSubmit ,reset,formState:{errors,isSubmitting}} = useForm<InputType>({
        resolver:zodResolver(formSchema),
    });

    const SubmitRequest : SubmitHandler<InputType> = async(data) =>{
        try {
            const results = await ForgetPassword(data.email);
            if(results) return toast.success('Parword Reset Link sended to Your Email👍')
            reset()
        } catch (error) {
            console.log(error);
            toast.error('Somthing Went Wrong!! Try Again!')
            
        }
        
    }
  return (
    <div className="h-[91vh] grid grid-cols-1 md:grid-cols-3 place-items-center items-center gap-3 p-20">
        <form onSubmit={handleSubmit(SubmitRequest)}
        className="flex flex-col gap-y-5 w-full">
            <Input 
            {...register('email')}
            label={'Email'}  
            placeholder="Enter Your Email!"
            errorMessage={errors.email?.message} 
            startContent={<MdEmail className="text-black w-6" />}

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
        <Image src={'/resetPass.png'}
         alt="image"
          priority
           height={600} 
           width={600}
           className="col-span-2"
           />
    </div>
  )
}
