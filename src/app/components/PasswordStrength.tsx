import { cn } from "clsx-tailwind-merge";

interface passStrengthProps {
    passStrength: number;
}

export const PasswordStrength = ({
    passStrength
}:passStrengthProps) =>{
    return(
        <div className={cn("col-span-2 flex gap-x-2",{
            'justify-start': passStrength <3,
            'justify-around' : passStrength === 3,
        })}>
           {Array.from({length: passStrength + 1}).map((i , index) => (
            <div key={index} className={cn('h-2 w-16 rounded-md', {
                'bg-red-500' : passStrength === 0,
                'bg-orange-500' : passStrength === 1,
                'bg-yellow-500' : passStrength ===2,
                'bg-green-500' : passStrength === 3,
            })}>


            </div>
           ) ) }
        </div>
    )
}