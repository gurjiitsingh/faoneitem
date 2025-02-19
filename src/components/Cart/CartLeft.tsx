import Link from "next/link";
import React, { useContext } from "react";
import CartContext from "@/store/CartContext";
import { cartDataT } from "@/lib/types/cartDataType";

//import { FaCheckCircle } from 'react-icons/fa';

export default function CartLeft() {
  //const { cartData } =  useCartContext();
  const { cartData } = useContext(CartContext);
  //console.log("kljjljlkll", cartData.lenght)
  let total = 0;
  cartData.forEach((item: cartDataT) => {
    total += item.quantity * +parseFloat(item.price);
    // total += parseInt(item.quantity) * +parseFloat(item.price);
  });
  return (
    <div className="flex flex-col gap-4 w-full ">
      <div className="flex flex-col bg-white p-3 h-full w-full gap-7">
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-xl font-semibold border-b py-3 w-full uppercase">
            Shopping cart total
          </h2>

          <div className="font-semibold border-b py-3 w-full ">
            <button className="text-sm font-semibold py-3 w-full text-left">
              {" "}
              Add Coupon
            </button>
          </div>
          <div className="font-semibold border-b py-3 w-full ">
            <button className="text-sm font-semibold py-3 w-full text-left">
              {" "}
              Pickup Discunt
            </button>
          </div>

          <div className="font-semibold border-b py-3 w-full ">
            <h3 className="text-sm font-semibold py-3 w-full text-left">
              {" "}
              Subtotal
            </h3>
          </div>

          <div className="font-semibold border-b py-3 w-full ">
            <h3 className="text-sm font-semibold py-3 w-full text-left">
              {" "}
              Local Pickup (Restaurant)
            </h3>
          </div>

          <div className="border-b py-3 w-full ">
            <h3 className="text-sm font-semibold pt-3 pb-1 w-full text-left">
              {" "}
              Flat Rate
            </h3>
            <p className="text-sm  pb-3 w-full text-left"> $4</p>
          </div>

          <div className="flex border-b py-3 w-full items-center">
            <div className="text-xl font-semibold py-3 w-[50%] text-left">
              {" "}
              Total
            </div>
            <div className="text-sm  py-3 w-[50%] text-left"> $24</div>
          </div>
          {/* <FaCheckCircle className="text-red-500" size={40} />
              <span className="text-[.7rem] text-blue-500">
                Part of your order qualifies for FREE Delivery. Choose FREE
                Delivery option at checkout.
              </span> */}
        </div>
        <div className="text-[1.1rem]">
          <span className="text-xl">Subtotal ({cartData.length} items) </span>{" "}
          :${total}.00
        </div>
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
