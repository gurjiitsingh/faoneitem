import CartContext from "@/store/CartContext";
import { createNewOrderFile } from "@/app/action/newOrderFile/newfile";
import { useContext, useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

export default function OrderComplete() {
    const searchParams = useSearchParams();
    const PaymentType = searchParams.get("paymentypte");
    // const { data: session } = useSession();
  const [functionCalled, setFunctionCalled ] = useState(false);
  const { cartData, endTotalG, totalDiscountG,productTotalCost, emptyCart } = useContext(CartContext);
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
  const result = await createNewOrderFile(cartData, address, endTotalG,productTotalCost, totalDiscountG, PaymentType);
  
  if(result === "success"){
    if (typeof window !== 'undefined') {
    window.localStorage.removeItem("cart_product_data");
    emptyCart();
    }
  }
    }
  }
    
    return (
      <div className="container bg-slate-100 mp flex flex-col w-[50%] mx-auto">
        <div className="flex flex-col md:flex-row gap-6 ">
          <div className="flex ">
         Order Completed
          </div>
         
       
        </div>
      </div>
    );
}
