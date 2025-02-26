"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";
//import { AiOutlineRollback } from "react-icons/ai";
import { BiHomeSmile, BiUser } from "react-icons/bi";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { FiSettings, FiShoppingCart } from "react-icons/fi";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import MiniCartContent from "./MiniCartcontent";
import { MiniCartSubtotal } from "./MiniSubtotal";
import ProccedWithEmail from "./components/ProccedWithEmail";
import { SessionProvider } from "next-auth/react";
import { useCartContext } from "@/store/CartContext";
import { useRouter } from "next/navigation";
//import Link from "next/link";
export const SideCart = () => {
  //const [ showEmailForm, setShowEmailForm ] = UseSiteContext();
  const { open, sideBarToggle } = UseSiteContext();
  const { openEmailForm, emailFormToggle } = UseSiteContext();
  const { cartData } = useCartContext()
  const ref = useRef(null);
  const router = useRouter();
  useClickAway(ref, () => sideBarToggle());
  // const sideBarToggle = () => setOpen(prev => !prev)
  // function deliveryHandle(){
  //  /// setShowEmailForm((state)=>!state)
  //  emailFormToggle()
  //  chageDeliveryType("delivery")
  // }
  
  function pickUpHandle(){
    /// setShowEmailForm((state)=>!state)
   // chageDeliveryType("pickup")
     sideBarToggle();
    emailFormToggle()
   }

   function shopMoreHandle(){
    // setShowEmailForm((state)=>!state)
     sideBarToggle();
     router.push('/');
   // chageDeliveryType("pickup")
   // emailFormToggle()
   }
  return (
    <><SessionProvider>
    {!openEmailForm &&
      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <>
            <motion.div
              {...framerSidebarBackground}
              aria-hidden="true"
              className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(244,243,243,0.1)] backdrop-blur-sm"
            ></motion.div>
            <motion.div
              {...framerSidebarPanel}
              className="fixed top-0 bottom-0 left-0 z-50 w-full h-screen max-w-lg border-r-2 border-zinc-50 bg-white"
              ref={ref}
              aria-label="Sidebar"
            >
              {/* <div className="flex items-center justify-between p-5 border-b-2 border-zinc-50 ">
                <span>Welcome</span>
                <button
                  onClick={sideBarToggle}
                  className="p-3 border-2 border-zinc-800 rounded-xl"
                  aria-label="close sidebar"
                >
                  <AiOutlineRollback />
                </button>
              </div> */}

              <MiniCartSubtotal />
              <MiniCartContent />

              <div className=" flex items-center justify-center gap-4 mt-1">
                {/* <Link
                  href={{
                    pathname: "/checkout",
                    //  query:{ userId: session?.user?.id}
                  }}
                >
                  <div className="min-w-[200px] py-1 text-center bg-blue-500 rounded-2xl text-white text-[1rem]">
                    Pickup
                  </div>
                </Link>

                <Link
                  href={{
                    pathname: "/checkout",
                    //  query:{ userId: session?.user?.id}
                  }}
                >
                  <div className="min-w-[200px] py-1 text-center bg-blue-500 rounded-2xl text-white text-[1rem]">
                    Delivery
                  </div>
                </Link> */}

{/* <button onClick={()=>{deliveryHandle()}} className="min-w-[200px] py-1 text-center bg-blue-500 rounded-2xl text-white text-[1rem]">
                    Delivery
                  </button> */}
            {cartData.length ?  <button onClick={()=>{pickUpHandle()}} className="min-w-[200px] mt-5 py-1 text-center bg-blue-500 rounded-2xl text-white text-[1rem]">
                    {/* Pickup */}
                    Checkout
                  </button>:<>Cart is empty</>}

                  <button onClick={()=>{shopMoreHandle() }} className="min-w-[200px] mt-5 py-1 text-center bg-blue-500 rounded-2xl text-white text-[1rem]">Shop more</button>

              </div>


            </motion.div>
          </>
        )}
      </AnimatePresence>}
     {openEmailForm && 
 <ProccedWithEmail />

      }
      </SessionProvider>
    </>
  );
};
//console.log("llllllllllllll", cartData)
const items = [
  { title: "Home", Icon: BiHomeSmile, href: "#" },
  { title: "About", Icon: BiUser },
  { title: "Contact", Icon: HiOutlineChatBubbleBottomCenterText, href: "#" },
  { title: "Settings", Icon: FiSettings, href: "#" },
  { title: "Shop", Icon: FiShoppingCart, href: "#" },
];

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
};

const framerSidebarPanel = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: 0.3 },
};

const framerText = (delay) => {
  return {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: 0.5 + delay / 10,
    },
  };
};

const framerIcon = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: {
    type: "spring",
    stiffness: 260,
    damping: 20,
    delay: 1.5,
  },
};
