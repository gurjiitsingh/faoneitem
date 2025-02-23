"use client";

import CartContext from "@/store/CartContext";
import { createNewOrderFile } from "@/app/action/newOrderFile/newfile";
import { useContext, useEffect, useState } from "react";
 
const OrderComplete = () => {
  // const { data: session } = useSession();
const [functionCalled, setFunctionCalled ] = useState(false);


 const { cartData } = useContext(CartContext);
useEffect(()=>{
  //  setCartData([]);
 

    // console.log("------ address ------", address, cartData)
    // console.log("------ function call ------", functionCalled)
  //window.localStorage.setItem("cart_product_data", JSON.stringify([]));
 //   emptyCart();
},[])

useEffect(()=>{
 createOrder();
},[])
async function createOrder() {
  let address;
  if (typeof window !== 'undefined') {
    address =  localStorage.getItem("customer_address");
    }
  if(!functionCalled){
    setFunctionCalled(true);
    console.log("function called-------")
await createNewOrderFile(cartData, address);
  }
}
  
  return (
    <div className="bg-slate-100 mp flex flex-col ">
      <div className="flex flex-col md:flex-row gap-6 ">
        <div className="flex flex-col w-[65%]">
       Order Completed
        </div>
       
     
      </div>
    </div>
  );
};

export default OrderComplete;
