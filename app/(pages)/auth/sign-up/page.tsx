"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


export function Page(){
    // for navigations 
    const router = useRouter();

    const [formData, setFormData] = useState({email: "", password: "", name: "", callbackURL: "http://localhost:3000/home"})

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
    }
       console.log({
        mongodb: process.env.MONGO_URI,
        better: process.env.BETTER_AUTH_URL,
        github: process.env.GITHUB_ID
       })
    const formSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      console.log("form data :", formData)
      await authClient.signUp.email(formData, {
              onError: ()=> {
                  toast.error("Can't Register, Try Later.")
              },
              onSuccess: ()=>{
                  toast.success("Your Are successfully Registered in.")
                  router.push("http://localhost:3000/home")
              }
          })

    }


 return (
    <div className="h-screen w-full p-2 flex justify-center ">
        <div className="w-full md:w-2/5 border border-gray-300 rounded-md h-[440px] p-2">
            <div className="w-full flex justify-center items-center">
              <Image src={"/notomask.png"} height={50} width={50} alt="logo"  />
            </div>

            <p className="text-xl lg:text-3xl text-center mt-4font-bold"> 
                Sign Up
            </p>
            <form onSubmit={formSubmit} className=" flex flex-col gap-2">
                <div className="w-full">
                    <p className="text-xs text-gray-300">Name*</p>
                    <Input name="name" onChange={handleChange} placeholder="ABC NOTO" type="text"/>
                </div>
                <div className="w-full">
                    <p className="text-xs text-gray-300">Email*</p>
                    <Input name="email" onChange={handleChange} placeholder="unknown@email.com" type="emaiil"/>
                </div>

                <div className="w-full">
                    <p className="text-xs text-gray-300 placeholder:mb-3 placeholder:text-2xl">Password*</p>
                    <PasswordInput name="password" onChange={handleChange} placeholder="........"  />
                </div>

                <Button type="submit" variant={"default"} className="mt-4" >Submit</Button>
            </form>

            <div className="mt-8 flex gap-3 justify-center">
                <Button onClick={async ()=> await authClient.signIn.social({provider: "google"})} variant={"outline"}>
                    Google
                </Button>
                <Button onClick={async ()=> await authClient.signIn.social({provider: "github"})} variant={"outline"}>
                    Github
                </Button>
            </div>

            <p className="text-center text-sm font-thin my-3"> You already have account ? <Link href={"/auth/sign-in"} className="text-blue-500">Login Account</Link>.</p>

        </div>
    </div>
 )
}

export default Page;