"use client";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form"; //, Controller
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addressResT,
  addressSchimaCheckout,
  TaddressSchemaCheckout,
} from "@/lib/types/addressType";
import { Button } from "@/components/ui/button";
//import { useState } from "react";
//import { useSearchParams } from "next/navigation";
import {
  searchAddressEmail,
  searchAddressByUserId,
} from "@/app/action/address/dbOperations";
import { useRouter, useSearchParams } from "next/navigation";
// import { resolve } from "path";
import { useSession } from "next-auth/react";
import CartContext, { useCartContext } from "@/store/CartContext";
import { searchUserById } from "@/app/action/user/dbOperation";
import { createNewOrder } from "@/app/action/orders/dbOperations";
import { purchaseDataT } from "@/lib/types/cartDataType";
import { fetchdeliveryByZip } from "@/app/action/delivery/dbOperation";
import { UseSiteContext } from "@/SiteContext/SiteContext";
//import { createNewOrderFile } from "@/app/action/newOrderFile/newfile";

const Address = () => {
  const searchParams = useSearchParams();
  const { endTotalG } = useCartContext();
  // console.log("email send --------", searchParams.get("email"))
  const { cartData, totalDiscountG } = useContext(CartContext);
  const { data: session } = useSession();
  const [paymentType, setPaymentType] = useState<string>();
  //const [addressFound, setAddressFound] = useState(false);
  // const [ addressChanged, setAddressChanged ] = useState(false);
  const router = useRouter();
  const emailQueryString = searchParams.get("email") as string;

  const { setdeliveryDis } = UseSiteContext();

  useEffect(() => {
    if (emailQueryString !== undefined) {
      getAddressByEmail(emailQueryString);
    }
    if (session?.user?.id !== undefined) {
      getAddressByID();
    }
    setValue("email", emailQueryString);
   // console.log("this is befor email set---------------4",emailQueryString)
  }, [session, emailQueryString]);

  useEffect(() => {
   // console.log("this is befor email set---------------",emailQueryString)
    setValue("email", emailQueryString);
   // console.log("this is befor email set---------------5",emailQueryString)
  }, []);

  async function handleZipcodeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputEmail: string = e.target.value;
   // console.log("Zipcode-------------", inputEmail);
    if (inputEmail.length > 4) {
      const result = await fetchdeliveryByZip(inputEmail);
      setdeliveryDis(result[0]);
    }
   
  }

  const {
    register,
    formState: { errors }, //, isSubmitting
    handleSubmit,
    // reset,
    setValue,
    // getValues,
    // setError,
  } = useForm<TaddressSchemaCheckout>({
    resolver: zodResolver(addressSchimaCheckout),
  });
 // console.log("in address --------------");
  async function onSubmit(data: TaddressSchemaCheckout) {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("userId", data.userId!);
    formData.append("email", data.email);
    formData.append("mobNo", data.mobNo);
    formData.append("password", data.password!);
    formData.append("addressLine1", data.addressLine1!);
    formData.append("addressLine2", data.addressLine2!);
    formData.append("city", data.city);
    formData.append("state", data.state!);
    formData.append("zipCode", data.zipCode);

    const customAddress = {
      firstName: data.firstName,
      lastName: data.lastName,
      userId: data.userId,
      email: data.email,
      mobNo: data.mobNo,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("customer_address", JSON.stringify(customAddress));
    }
    //await addCustomerAddress(formData);

    const purchaseData = {
      userId: session?.user?.id,
      cartData,
      total:endTotalG,
      totalDiscountG,
      address: customAddress,
    } as purchaseDataT;

    if (cartData.length !== 0) {
      await createNewOrder(purchaseData);
    }

    //createNewOrderFile(cartData, customAddress);

    if (paymentType === "paypal") {
      router.push("/pay");
    }
    console.log("going to complete--------")
    if (paymentType === "cod") {
      console.log("going to complete")
      router.push(`/complete?paymentypte=Barzahlung`);
    //  router.push(`/checkout?email=${data.email}&deliverytype=${deliveryType}`)
    }

    //
  }

  setValue("userId", session?.user?.id);
  //setValue("email", "g@mail.com");
  // setValue("firstName", "Gurjit");
  // setValue("lastName", "Singh");
  // setValue("mobNo", "9838883323");
  // setValue("addressLine1", "345 street House 34");
  // setValue("addressLine1", "Vill Tandi Aulakh");
  // setValue("city", "Jal");
  // setValue("state", "Punjab");
  // setValue("zipCode", "144621");
  //setValue("orderDetail", cartData);

  return (
    <div className="w-full lg:w-[70%] md:border md:rounded-2xl md:p-5">
      <div className="flex flex-col">
        <div className="flex flex-col gap-2 mb-4">
          <h2 className="text-5 text-slate-600 font-semibold py-3">
            Shipping address
            {/* -- {session?.user?.id} --- {session?.user?.name} */}
          </h2>
          <p className="text-sm">
            Enter the address where you want your order delivered.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("userId")} hidden />
          {/* <input {...register("orderDetail")} hidden /> */}
          <div className="flex w-full flex-col gap-2  my-15 ">
            <div className="flex flex-col gap-1">
              <label className="label-style">
                Email<span className="text-red-500">*</span>{" "}
              </label>
              <input {...register("email")} className="input-style" />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.email?.message && <span>{errors.email?.message}</span>}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label className="label-style">
                Mob no.<span className="text-red-500">*</span>{" "}
              </label>
              <input {...register("mobNo")} className="input-style" />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.mobNo?.message && <span>{errors.mobNo?.message}</span>}
              </span>
            </div>

            {!session && (
              <div className="flex flex-col gap-1">
                <label className="label-style">
                  Password.<span className="text-red-500">Optional</span>{" "}
                </label>
                <input {...register("password")} className="input-style" />
                <span className="text-[0.8rem] font-medium text-destructive">
                  {errors.password?.message && (
                    <span>{errors.password?.message}</span>
                  )}
                </span>
              </div>
            )}

            <div className="w-full flex flex-row gap-2">
              <div className="flex flex-col gap-1">
                <label className="label-style">
                  First name<span className="text-red-500">*</span>{" "}
                </label>
                <input {...register("firstName")} className="input-style" />
                <span className="text-[0.8rem] font-medium text-destructive">
                  {errors.firstName?.message && (
                    <span>{errors.firstName?.message}</span>
                  )}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <label className="label-style">
                  Last name<span className="text-red-500">*</span>{" "}
                </label>
                <input {...register("lastName")} className="input-style" />
                <span className="text-[0.8rem] font-medium text-destructive">
                  {errors.lastName?.message && (
                    <span>{errors.lastName?.message}</span>
                  )}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="label-style">
                Address line 1<span className="text-red-500">*</span>{" "}
              </label>
              <input {...register("addressLine1")} className="input-style" />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.addressLine1?.message && (
                  <span>{errors.addressLine1?.message}</span>
                )}
              </span>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="label-style">
                Address line 2<span className="text-red-500">*</span>{" "}
              </label>
              <input {...register("addressLine2")} className="input-style" />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.addressLine2?.message && (
                  <span>{errors.addressLine2?.message}</span>
                )}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label className="label-style">
                City<span className="text-red-500">*</span>{" "}
              </label>
              <input {...register("city")} className="input-style" />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.city?.message && <span>{errors.city?.message}</span>}
              </span>
            </div>

            {/* <div className="flex flex-col gap-1">
              <label className="label-style">
                State<span className="text-red-500">*</span>{" "}
              </label>
              <input {...register("state")} className="input-style" />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.state?.message && <span>{errors.state?.message}</span>}
              </span>
            </div> */}

            <div className="flex flex-col gap-1">
              <label className="label-style">
                Zip<span className="text-red-500">*</span>{" "}
              </label>
              <input
                {...register("zipCode", {
                  onChange: (e) => {
                    handleZipcodeChange(e);
                  },
                })}
                className="input-style"
              />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.zipCode?.message && (
                  <span>{errors.zipCode?.message}</span>
                )}
              </span>
            </div>

            {/* <div className="flex  justify-start gap-8 border rounded-full w-full py-2 px-2 items-center">
              <div className="px-2 py-2 bg-slate-700 rounded-full flex justify-center items-center">
                <input
                  {...register("payment")}
                  type="radio"
                  value="paypal"
                  //  checked
                />{" "}
              </div>
              <div>Paypal</div>
            </div>
            <div className="flex  justify-start gap-8 border rounded-full w-full py-2 px-2 items-center">
              <div className="px-2 py-2 bg-slate-700 rounded-full flex justify-center items-center">
                <input {...register("payment")} type="radio" value="cod" />{" "}
              </div>
              <div>Cash on delivery</div>
            </div> */}
            <h3 className=" font-light mt-3">Select payment type</h3>
            <Button
              className="w-[200px] py-1 text-center bg-yellow-500 text-blue-600 font-semibold rounded-2xl text-[1rem]"
              onClick={() => {
                setPaymentType("paypal");
              }}
              value="paypal"
              name="button_1"
            >
              PayPal
            </Button>
            <Button
              className="w-[200px] py-1 text-center bg-amber-500 text-white font-semibold rounded-2xl text-[1rem]"
              onClick={() => {
                setPaymentType("cod");
              }}
              value="cod"
              name="button_1"
            >
              Cash on Delivery
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  async function getAddressByEmail(inputEmail: string) {
    const addressRes = await searchAddressEmail(inputEmail);
    if (addressRes?.email !== null) {
     setAddress(addressRes);
    }
    setValue("email", inputEmail);
  //  console.log("this is befor email set---------------1",inputEmail)
  }

  async function getAddressByID() {
    const custAddressRes =
      (await searchAddressByUserId(session?.user.id)) || {};
       setFormAddress(custAddressRes);
  }

  async function setFormAddress(custAddressRes: addressResT) {
    // let setemail;
    if (custAddressRes.email !== undefined) {
      // setAddressFound(true)

      setAddress(custAddressRes);
    } else {
      const userResById = await searchUserById(session?.user?.id);
      if (userResById !== undefined) {
     //   setValue("email", userResById.email);
        console.log("this is befor email set---------------2",userResById.email)
        // setValue("firstName", userResById.firstName);
        // setValue("lastName", userResById.lastName);
        // setValue("userId", userResById.userId);
        // setValue("email", userResById.email);
        // setValue("mobNo", userResById.mobNo);
        // setValue("addressLine1", userResById.addressLine1);
        // setValue("addressLine2", userResById.addressLine2);
        // setValue("city", userResById.city);
        // setValue("state", userResById.state);
        // setValue("zipCode", userResById.zipCode);
      }
    }
  }
  function setAddress(addressRes: addressResT) {
    //console.log("inside set address ---", setemail,addressRes)
    // setAddressFound(true);
    // if(setemail)
    setValue("email", addressRes.email);
   // console.log("this is befor email set---------------3",addressRes.email)
    setValue("firstName", addressRes.firstName);
    setValue("lastName", addressRes.lastName);
    // setValue("userId", addressRes.userId);
    // setValue("email", addressRes.email);
    setValue("mobNo", addressRes.mobNo);
    setValue("addressLine1", addressRes.addressLine1);
    setValue("addressLine2", addressRes.addressLine2);
    setValue("city", addressRes.city);
    setValue("state", addressRes.state);
    setValue("zipCode", addressRes.zipCode);
  }
}; // end of rfc

export default Address;

// console.log(
//   "Form Data",
//   data.email,
//   data.mobNo,
//   data.firstName,
//   data.lastName,
//   data.userId,
//   data.addressLine1,
//   data.addressLine2,
//   data.city,
//   data.state,
//   data.zipCode
// );
//     setIsDisabled(true)

// type Terror = {
//   name: string | null;
//   price: string | null;
//   featured: string | null;
//   company: string | null;
//   productCat: string | null;
//   productDesc: string | null;
//   image: string | null;
// };
