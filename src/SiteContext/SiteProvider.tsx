"use client"
import { boolean, number, string } from "zod";
import  SiteContext  from "./SiteContext"
import {  useState } from 'react'
import { deliveryType } from "@/lib/types/deliveryType"
import { couponDiscType } from "@/lib/types/couponDiscType";

interface Props {
  children: React.ReactNode;
}

export const SiteProvider: React.FC<Props> = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

//     const setCouponDiscType ={
//         couponDesc:{},
// isFeatured:boolean,
// minSpend:number,
// name:string,
// price:string,
// productCat:string,
// deliveryDis:{},
// setdeliveryDis:(e)=>{return e}

//  }

const [open, setIsOpen] = useState<boolean>(false);
const [openBargerMenu, setOpenBargerMenu] = useState<boolean>(false);
const [openEmailForm, setEmailFormToggle] = useState<boolean>(false);
const [deliveryType, setDeliveryType] = useState<string>("");
const [couponDisc, setCouponDiscU] = useState<couponDiscType | undefined>();
const [deliveryDis, setdeliveryDisU] = useState<deliveryType | undefined>();
const [showProductDetailM, setShowProductDetailML] = useState<boolean>(false);
const [ baseProductId,setBaseProductIdL] = useState<string>("")


   
function togleMenu(){
        setIsOpen(!open);
    }
function bargerMenuToggle(){
    setOpenBargerMenu(!openBargerMenu);
}
function chageDeliveryType(t:string){
    setDeliveryType(t)
}

function setCouponDisc(e:couponDiscType | undefined){
    setCouponDiscU(e)
}
function setdeliveryDis(e:deliveryType | undefined){
    setdeliveryDisU(e)
}
// deliveryDis:{},
// setdeliveryDis:(e)=>{}

// openEmailForm:false,
  function  emailFormToggle(){
    setEmailFormToggle(!openEmailForm)
    }

    
  function  setShowProductDetailM(){
    setShowProductDetailML(!showProductDetailM)
//showProductDetailM,
  }
  
  

     function setBaseProductId(e:string){
        setBaseProductIdL(e)
     }

return(
    <SiteContext.Provider value={{
        open,
        openBargerMenu,
        sideBarToggle:togleMenu,
        bargerMenuToggle,
        openEmailForm,
        emailFormToggle,
        deliveryType,
        chageDeliveryType,
        couponDisc,
    setCouponDisc,
    deliveryDis,
    setdeliveryDis,
    showProductDetailM,
    setShowProductDetailM,
    baseProductId,
     setBaseProductId,
    }}>

{children}

    </SiteContext.Provider>
)

}

