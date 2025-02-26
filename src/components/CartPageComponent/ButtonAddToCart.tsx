'use client'
import React from 'react'
import { useCartContext } from '@/store/CartContext';
import { IoMdAdd } from 'react-icons/io';
import { ProductType } from '@/lib/types/productType';
//import { ProductType } from '@/lib/types/productType';


export  function ButtonAddToCartButton({product}:{product:ProductType | undefined}) {
 
 
  const ctx = useCartContext();

  function addItemToCart(product:ProductType | undefined){
   
   // ctx.addProduct(product);
   ctx.addProductToCart(product);
  }

  return (
    <button onClick={()=>addItemToCart(product)} className='border px-3 py-1 rounded-xl bg-green-500'><IoMdAdd  /></button>
  )
}
