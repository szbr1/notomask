"use client"
import { authClient } from '@/lib/auth-client'
import { SessionProps } from '@/types/types'
import React, { useEffect, useState } from 'react'

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
    <div className='p-3 h-screen w-full'>
      
     <b>Name:</b>  {session.name}
      <br />
     <b>Email:</b> {session.email}
      <br />
     <b>Image:</b> {session.image}
      <br />
     <b>Email verified:</b> {session.emailVerified}
    </div>
  )
}

export default Page