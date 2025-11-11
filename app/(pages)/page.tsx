"use client"
import { authClient } from '@/lib/auth-client'
import { SessionProps } from '@/types/types'
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Page() {

  const [session , setSession] = useState<SessionProps | null>(null)
  useEffect(()=>{
     (async()=>{
     const data = await authClient.getSession();
     if(data && data.data && data.data.user){
       setSession(data.data.user)
    }
      
  })()
  }, [])

  if (!session) return <div>Loading...</div> 

  console.log(session)
  return (
  <div className='flex flex-col h-screen w-full'>
    <Header />

    <div className='flex justify-center items-center h-full w-full'>
      <div className=' flex flex-col justify-center gap-5 items-center mb-12'>
       <h1 className='text-5xl font-bold'>Hanlde Your Accounts </h1>
       <p className='text-2xl text-yellow font-semibold'>Simple, Secure & Fast</p>
       <Button asChild className='w-40 cursor-pointer rounded-md hover:bg-yellow hover:text-black hover:border  h-11 mt-8 bg-default '>
        <Link href={"/home"}>
          Get Started
        </Link>
       </Button>
      </div>
    </div>

  </div>

    
  )
}

export default Page