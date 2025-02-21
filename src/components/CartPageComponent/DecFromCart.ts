'use client'
import { cartDataT } from '@/lib/types/cartDataType';
import { useCartContext } from '@/store/CartContext';


export  function DecFromCart({product}:{product:cartDataT}) {

  const {  removeCartProduct } =  useCartContext();
   
    removeCartProduct(product)
 

}

  
  
  
  