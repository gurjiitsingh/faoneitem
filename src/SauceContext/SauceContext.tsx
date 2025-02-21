
import  { createContext, useContext } from "react";
//import { cartDataT } from  '@/lib/types/cartDataT'
//import { cartDataTT } from "@/lib/types/cartDataType";
import { cartDataT } from "@/lib/types/cartDataType";
interface CartContextType {
  counter: number;
  sauceTotalCost: number;
  cartData: cartDataT[] ;
  address:{} ;
  addAddress:{};
  //getAddress:()=>{};
  addsauce: cartDataT | {};
  addsauceToCart:(c:cartDataT)=>void
  decCartsauce:(c:cartDataT)=>void
  decCartsauceAll:(c:cartDataT)=>void
   removeCartsauce:(c:cartDataT)=>void
   emptyCart:()=>void
}

//const CartContext = createContext<CartContextType | null>(null);

const CartContext = createContext<CartContextType>({ 
  counter: 0,
  sauceTotalCost:0,
  cartData: [],
  address: {},
  addAddress:()=>{},
 // getAddress:()=>{},
  addsauce:()=>{},
  addsauceToCart:()=>{},
  decCartsauce:()=>{},
  decCartsauceAll:()=>{},
  removeCartsauce:()=>{},
  emptyCart:()=>{}
  
  });

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
};


export default CartContext


