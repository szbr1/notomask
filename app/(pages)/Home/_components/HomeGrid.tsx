import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { IoKey } from 'react-icons/io5'
import { TbAddressBook } from "react-icons/tb";
import { CiCreditCard1 } from "react-icons/ci";
import { RiCoupon2Fill } from "react-icons/ri";
import { FaNoteSticky } from "react-icons/fa6";
import Link from 'next/link';
import { LuIdCard } from "react-icons/lu";

function HomeGrid() {
  return (
    <div className='pl-2 grid lg:grid-cols-2 gap-3 grid-cols-1 w-full '>
    <div className='rounded-md border border-gray-300 w-full p-2 px-5 flex justify-between items-center lg:h-18'>
       <Link href={`/home/password`} className='text-lg flex justify-start items-center gap-3'>
          <IoKey className='lg:size-7 size-5 text-blue-900'/> Passwords
       </Link>
       <div>
         <BsThreeDots className='lg:size-7 size-5'/>
       </div>
    </div>
    
    <div className='rounded-md border border-gray-300 w-full p-2 px-5 flex justify-between items-center lg:h-18'>
       <Link href={"/home/address"} className='text-lg flex justify-start items-center gap-3'>
          <TbAddressBook className='lg:size-7 size-5 text-blue-900'/> Addresses
       </Link>
       <div>
         <BsThreeDots className='lg:size-7 size-5'/>
       </div>
    </div>

    <div className='rounded-md border border-gray-300 w-full p-2 px-5 flex justify-between items-center lg:h-18'>
       <Link href={"/home/card"} className='text-lg flex justify-start items-center gap-3'>
          <CiCreditCard1 className='lg:size-7 size-5 text-blue-900'/> Cards
       </Link>
       <div>
         <BsThreeDots className='lg:size-7 size-5'/>
       </div>
    </div>

    <div className='rounded-md border border-gray-300 w-full p-2 px-5 flex justify-between items-center lg:h-18'>
       <Link href={"/home/coupon"} className='text-lg flex justify-start items-center gap-3'>
          <RiCoupon2Fill className='lg:size-7 size-5 text-blue-900'/> Coupons
       </Link>
       <div>
         <BsThreeDots className='lg:size-7 size-5'/>
       </div>
    </div>

    <div className='rounded-md border border-gray-300 w-full p-2 px-5 flex justify-between items-center lg:h-18'>
       <Link href={"/home/idCard"} className='text-lg flex justify-start items-center gap-3'>
          <LuIdCard className='lg:size-7 size-5 text-blue-900'/> Identity Card
       </Link>
       <div>
         <BsThreeDots className='lg:size-7 size-5'/>
       </div>
    </div>

    <div className='rounded-md border border-gray-300 w-full p-2 px-5 flex justify-between items-center lg:h-18'>
       <Link href={"/home/note"} className='text-lg flex justify-start items-center gap-3'>
          <FaNoteSticky className='lg:size-7 size-5 text-blue-900'/> Notes
       </Link>
       <div>
         <BsThreeDots className='lg:size-7 size-5'/>
       </div>
    </div>
 </div>
  )
}

export default HomeGrid