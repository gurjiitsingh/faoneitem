"use client"
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form"; //, Controller
import { zodResolver } from "@hookform/resolvers/zod";
import {
    emailZ,TemailZ
 
} from "@/lib/types/addressType";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
//import { useSearchParams } from "next/navigation";
import {
  searchAddressEmail,
 
} from "@/app/action/address/dbOperations";
import { useRouter } from "next/navigation";
// import { resolve } from "path";

import CartContext from "@/store/CartContext";
import { UseSiteContext } from "@/SiteContext/SiteContext";


const ProccedWithEmail = () => {
  const { cartData } = useContext(CartContext);
  const { openEmailForm, emailFormToggle } = UseSiteContext();
  const { open, sideBarToggle } = UseSiteContext();
  const {data: session } = useSession();
  const [addressFound, setAddressFound] = useState(false);
  const router = useRouter();

console.log("session ----------", session)
  async function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    // const inputEmail: string = e.target.value;
    // let addressRes = null;
    // if (!addressFound) {
    //   if (inputEmail.length > 7) {
    //     addressRes = await searchAddressEmail(inputEmail);
    //     //  console.log(addressRes);
    //     if (addressRes !== null) {
    //     //  const setemail = false;
    //     //  setAddress(addressRes, setemail);
    //     }
    //   }
    // }
  
    // console.log("address res", addressRes);
  }

  const {
    register,
    formState: { errors }, //, isSubmitting
    handleSubmit,
    // reset,
   setValue,
    // getValues,
    // setError,
  } = useForm<TemailZ>({
    resolver: zodResolver(emailZ),
  });
const userEmail = session?.user?.email as string;
  if(session !== null){
    setValue("email",userEmail )
  }

  async function onSubmit(data: TemailZ) {
    const formData = new FormData();
//     console.log("data.userId --------------", data)
    formData.append("email", data.email);
   // formData.append("mobNo", data.mobNo);
   

    const customAddress = {
        email: data.email,
    //  mobNo: data.mobNo,
      };
      emailFormToggle() 
      sideBarToggle()
      router.push(`/checkout?email=${data.email}`)
      
     
  }



 
  return (
<div className="z-50 absolute mx-auto mt-[5%] bg-gray-500 rounded-2xl p-12">    
<div className="w-full h-full flex flex-col items-center justify-center">

    <div className="w-full lg:w-[70%] ">
      <div className="flex flex-col">
        <div className="flex flex-col ">
          <h2 className="text-5 text-white font-semibold ">
            Enter Email
         
          </h2>
         
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
         
          {/* <input {...register("orderDetail")} hidden /> */}
          <div className="flex w-full flex-col gap-2  my-1 ">
            <div className="flex flex-col gap-1">
              <label className="label-style">
                Email<span className="text-red-500">
                    </span>
              </label>
              <input
                {...register("email", {
                  onChange: (e) => {
                    handleEmailChange(e);
                  },
                })}
                className="input-style"
              />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.email?.message && <span>{errors.email?.message}</span>}
              </span>
            </div>

            {/* <div className="flex flex-col gap-1">
              <label className="label-style">
                Mob no.<span className="text-red-500">*</span>{" "}
              </label>
              <input {...register("mobNo")} className="input-style" />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.mobNo?.message && <span>{errors.mobNo?.message}</span>}
              </span>
            </div> */}

            
            <Button
              className="w-[200px] py-1 text-center bg-yellow-500 rounded-2xl text-[.8rem]"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
    </div>
      </div>
  );
};

export default ProccedWithEmail;