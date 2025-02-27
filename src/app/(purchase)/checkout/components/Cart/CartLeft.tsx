//import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import CartContext, { useCartContext } from "@/store/CartContext";

import { ProductType } from "@/lib/types/productType";
//import { useSearchParams } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import CouponDiscForm from "./CouponDiscForm";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import DeliveryCost from "./DeliveryCost";
import Pickup from "./Pickup";
import CouponDisc from "./CouponDisc";
//import { FaCheckCircle } from 'react-icons/fa';

export default function CartLeft() {
  const { couponDisc, deliveryDis, chageDeliveryType, deliveryType } = UseSiteContext();
  // const searchParams = useSearchParams();
  //const deliveryType = searchParams.get("deliverytype");
  

  const [addCoupon, setAddCoupon] = useState<boolean>(false);

  //console.log("del type------", searchParams.get("deliverytype"));
  //const { cartData } =  useCartContext();
  const { cartData, setEndTotalG, setTotalDiscountG } = useCartContext();
  //console.log("kljjljlkll", cartData.lenght)
  let total = 0;
  cartData.forEach((item: ProductType) => {
    total += item.quantity! * +parseFloat(item.price);
    // total += parseInt(item.quantity) * +parseFloat(item.price);
  });

  let endPrice = total;
  let TotalDiscount=0;
  if (deliveryType === "pickup") {
    endPrice = endPrice - +total * 0.1;
    TotalDiscount=10;
  }

  if (deliveryType === "delivery") {
    if (deliveryDis?.price !== undefined) {
      endPrice = endPrice + +deliveryDis?.price!;
    }
  }

  if (couponDisc?.price) {
    endPrice = endPrice - (+total * +couponDisc?.price) / 100;
    TotalDiscount = TotalDiscount + couponDisc?.price;
  }
 console.log("total discount ------",TotalDiscount)
 console.log("end price -------", total- total*(+TotalDiscount)/100)
 

 const endPriceS = endPrice.toString()
  const endPriceComma = endPriceS.split(".").join(",");
 useEffect(()=>{ 
  setEndTotalG(endPrice)
},[endPrice])
  useEffect(() => {}, [deliveryType]);
useEffect(()=>{setTotalDiscountG(TotalDiscount)},[TotalDiscount])
  return (
    <div className="flex flex-col gap-4 w-full ">
      <div className="flex flex-col bg-white p-5 h-full w-full gap-7 rounded-2xl">
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-xl font-semibold border-b py-3 w-full uppercase">
            Shopping cart total
          </h2>

          <div className="font-semibold border-b py-3 w-full flex flex-col justify-between gap-4">
            <div className="w-fit">
              <button
                onClick={() => setAddCoupon(!addCoupon)}
                className="flex gap-2 items-center text-sm text-slate-600 bg-green-200 rounded-2xl px-3 font-semibold py-1 w-full text-left "
              >
                <span>Add a coupon </span>
                <span>
                  <FaChevronDown />
                </span>
              </button>
            </div>

            {addCoupon && (
              <>
                <CouponDiscForm />
              </>
            )}
          </div>

          <div className="font-semibold border-b py-3 w-full flex justify-between">
            <div className="text-sm font-semibold py-3 w-full text-left">
              Subtotal
            </div>
            <div className="flex gap-1">
              <span>&#8364;</span> <span>{total}</span>
            </div>
          </div>

          <div className="font-semibold border-b py-3 w-full flex  justify-start gap-4">
            <div className="w-fit">
              <button
                onClick={() => chageDeliveryType("delivery")}
                className="flex gap-2 items-center text-sm text-slate-600 bg-slate-200 border rounded-2xl px-3 font-semibold py-1 w-full text-left "
              >
                <span>Delivery </span>
                {/* <span>
                  <FaChevronDown />
                </span> */}
              </button>
            </div>

            <div className="w-fit">
              <button
                onClick={() => chageDeliveryType("pickup")}
                className="flex gap-2 items-center text-sm text-slate-600 bg-slate-200 border rounded-2xl px-3 font-semibold py-1 w-full text-left "
              >
                <span>Pickup </span>
                {/* <span>
                  <FaChevronDown />
                </span> */}
              </button>
            </div>
          </div>

          <DeliveryCost />

          <Pickup total={total} />

          <CouponDisc total={total} />

          {/* <div className="font-semibold border-b py-3 w-full ">
            <h3 className="text-sm font-semibold py-3 w-full text-left">
              {" "}
              Local Pickup (Restaurant)
            </h3>
          </div> */}

          {/* <div className="border-b py-3 w-full ">
            <h3 className="text-sm font-semibold pt-3 pb-1 w-full text-left">
             
              Flat Rate
            </h3>
            <p className="text-sm  pb-3 w-full text-left"> $4</p>
          </div> */}

          <div className="font-semibold border-b py-3 w-full flex justify-between">
            <div className="text-md font-semibold py-3 w-full text-left">
              Total
            </div>
            <div className="flex gap-1">
              <span>&#8364;</span> <span> {endPriceComma} </span>
            </div>
          </div>

          {/* <FaCheckCircle className="text-red-500" size={40} />
              <span className="text-[.7rem] text-blue-500">
                Part of your order qualifies for FREE Delivery. Choose FREE
                Delivery option at checkout.
              </span> */}
        </div>
        {/* <div className="text-[1.1rem]">
          <span className="text-xl">Subtotal ({cartData.length} items) </span>{" "}
          :${total}
        </div> */}
        {/* <div className="flex items-center justify-center">
          <Link
            href={{
              pathname: "/checkout",
              //  query:{ userId: session?.user?.id}
            }}
          >
            <div className="w-[200px] py-1 text-center bg-yellow-500 rounded-2xl text-[.8rem]">
              Procces to buy
            </div>
          </Link>
        </div> */}
      </div>
    </div>
  );
}
