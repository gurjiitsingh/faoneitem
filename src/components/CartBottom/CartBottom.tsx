'use client'
import React from 'react'
import { IoCartOutline } from "react-icons/io5";


import CartCount from './CartCount';
import { UseSiteContext } from '@/SiteContext/SiteContext'
//<ProductType[]>
const CartBottom = () => {

const {  sideBarToggle } = UseSiteContext();//open,

//const totalProcuts = cartData.length;
//console.log("thiiiii ", totalProcuts)
  return (
    <button onClick={()=>{sideBarToggle(false)}}> <div className=" w-fit  p-3 rounded-full bg-blue-600">
         <div className=' flex flex-row gap-3  justify-between items-center    px-1 py-1'>
      <IoCartOutline className='text-white' size={30} /><div><CartCount /></div></div></div></button>
  )
}

export default CartBottom