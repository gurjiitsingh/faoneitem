'use client'
import React, { useState } from 'react'
import { useCartContext } from '@/store/CartContext';
import { IoMdAdd } from 'react-icons/io';
import { ProductType } from '@/lib/types/productType';
//import { ProductType } from '@/lib/types/productType';


export  function ButtonAddToCartButtonFake({showmessage}) {
 const [showMessage, setShowMessage ] = useState(false);
 
  

 
  
  return (
    <> { showMessage && <div className='w-[300px] z-50 -top-5'>Select flawer</div>}
    <button 
    onClick={()=>{setShowMessage(!showMessage)}} 
    className='border px-3 py-3 rounded-full bg-blue-300'><IoMdAdd size={20} className="text-white "  /></button>
    </>
  )
}
