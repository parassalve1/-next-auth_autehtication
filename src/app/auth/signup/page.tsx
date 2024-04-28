import SignUpForm from '@/app/components/SignUpForm '
import Image from 'next/image'


export default function SignIn() {
  return (
    <div className='h-auto grid grid-cols-1 md:grid-cols-2 place-items-center gap-3'>
        <SignUpForm />
        <Image src={'/login.png'} alt='login image' width={600} priority height={600}   />
    </div>
  )
}
