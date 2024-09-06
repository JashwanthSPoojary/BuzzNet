import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from "react-icons/fa";



import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from '../types';
import { useState } from 'react';
import { TriangleAlertIcon } from 'lucide-react';
import { useAuthActions } from "@convex-dev/auth/react";


interface SignUpCardProps {
    setState: (state: SignInFlow) => void;
};

export const SignUpCard = ({setState}: SignUpCardProps) =>{
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [error,setError] = useState("")
    const [pending,setPending] = useState(false)

    const { signIn } = useAuthActions();


    const onProviderSignUp = ( value:"github" | "google" ) =>{
        setPending(true)
        signIn(value)
        .finally(()=>{
            setPending(pending)
        })
    }
    const onPasswordSignUp  = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            setError("Passwords does not match")
            return
        }
        setPending(true)
        signIn("password",{name,email,password,flow:"signUp"})
        .catch((e)=>{
            setError("Something went wrong")
            console.log(e)
        })
        .finally(()=>{
            setPending(false)
        })
    }

    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                Sign Up to continue
                </CardTitle>
            </CardHeader>
            {!!error && (
                <div className='bg-destructive/15 p-3 rounded-sm flex items-center gap-x-2 text-sm text-destructive mb-6 '>
                    <TriangleAlertIcon className='size-4' />
                    <p>{error}</p>
                </div>
            )}
            <CardDescription>
                Use your email or another ids to continue
            </CardDescription>
            <CardContent className="space-y-5 px-0 pt-4">
                <form onSubmit={onPasswordSignUp} className="space-y-2.5">
                <Input
                    disabled={pending}
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    placeholder="UserName"
                    required
                    />
                    <Input
                    disabled={pending}
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    placeholder="Email"
                    type="email"
                    required
                    />
                    <Input
                    disabled={pending}
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    placeholder="Password"
                    type="password"
                    required
                    />
                    <Input
                    disabled={pending}
                    value={confirmPassword}
                    onChange={(e)=>{setConfirmPassword(e.target.value)}}
                    placeholder="Confirm password"
                    type="password"
                    required
                    />
                    <Button type="submit" className="w-full" size="lg" disabled={pending}>Continue</Button>
                </form>
                <Separator/>
                <div className="flex flex-col gap-y-2.5">
                    <Button
                    disabled={pending}
                    onClick={()=>{onProviderSignUp("google")}}
                    variant="outline"
                    size="lg"
                    className="w-full relative"
                    >
                        <FcGoogle className='size-5 absolute top-2.5 left-2.5'/>
                        Continue with Google
                    </Button>
                    <Button
                    disabled={pending}
                    onClick={()=>{onProviderSignUp("github")}}
                    variant="outline"
                    size="lg"
                    className="w-full relative"
                    >
                        <FaGithub className='size-5 absolute top-2.5 left-2.5'/>
                        Continue with Github
                    </Button>
                </div>
                <p className='text-xs text-muted-foreground'>
                    Already have a account ? <span onClick={()=>setState("signIn")} className='text-sky-700 hover:underline cursor-pointer'>Sign In</span>
                </p>
            </CardContent>
        </Card>
    );
} 