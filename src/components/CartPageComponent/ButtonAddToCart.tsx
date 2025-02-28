'use client'
import React from 'react'
import { useCartContext } from '@/store/CartContext';
import { IoMdAdd } from 'react-icons/io';
import { ProductType } from '@/lib/types/productType';
//import { ProductType } from '@/lib/types/productType';


export  function ButtonAddToCartButton({product}:{product:ProductType}) {
 
 
  const ctx = useCartContext();

  function addItemToCart(product:ProductType){
   
   // ctx.addProduct(product);
   ctx.addProductToCart(product);
  }

  return (
    <button onClick={()=>addItemToCart(product)} className='border px-3 py-3 rounded-full bg-blue-500'><IoMdAdd size={20} className="text-white "  /></button>
  )
}
