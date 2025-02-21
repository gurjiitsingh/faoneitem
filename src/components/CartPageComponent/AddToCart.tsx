'use client'
import { useCartContext } from '@/store/CartContext';
import { cartDataT } from '@/lib/types/cartDataType';

export  function AddToCart({product}:{product:cartDataT}) {
 
 
  const ctx = useCartContext();

   ctx.addProductToCart(product);
 

 
}
