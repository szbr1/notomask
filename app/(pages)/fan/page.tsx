"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import crypto from "node:crypto"

function Page() {
    const [password, setPassword] = useState("")
    const [plaintext, setPlaintext] = useState("")
    const [ciphertext, setCiphertext] = useState("")
    const encrypt = async () => {
     const iv = crypto.randomBytes(16);
      const key = crypto.scryptSync(password, 'salt', 32);
      console.log("key", key)
    }
    const decrypt = async () => {
    }
    
  return (
    <div className='flex p-4 justify-center w-full'>
        <div className='w-1/2'>
            <Input placeholder='password' onChange={(e)=> setPlaintext(e.target.value)} type='text'  />
            <Button onClick={encrypt} className='mt-4'> Encrypt</Button>
            <Button onClick={decrypt} className='mt-4 ml-4'> Decrypt</Button>

            <p>{ciphertext.length > 0 && ciphertext}</p>
        </div>
    </div>
  )
}

export default Page