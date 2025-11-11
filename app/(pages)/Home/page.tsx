import React from 'react'
import { Button } from '@/components/ui/button'
import HomeGrid from './_components/HomeGrid'

function page() {
  return (
    <div className='overflow-hidden pr-3'>
      <div className='flex justify-end items-center gap-4'>
         <Button className='cursor-pointer' variant={"outline"} >Create Folder</Button>
         <Button className='bg-default hover:bg-default' >Create File</Button>
      </div>

      <p className='text-xs py-3 text-gray-300'>Layer of security</p>
       <HomeGrid />
   
      <p className='text-xs py-3 text-gray-300'>Subscriptions of security</p>

    
    </div>
  )
}

export default page