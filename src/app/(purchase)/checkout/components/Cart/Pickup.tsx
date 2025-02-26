import { UseSiteContext } from '@/SiteContext/SiteContext';
import React from 'react'

export default function Pickup({total}:{total:number}) {
  const {   deliveryType } = UseSiteContext();
  return (
    <>{deliveryType === "pickup" &&
       
                <div className="font-semibold border-b py-3 w-full flex justify-between">
                  <button className="text-sm font-semibold py-3 w-full text-left">
                    Pickup Discunt
                  </button>
                  <div className="flex gap-1">
                    - <span>&#8364;</span> <span> 
                        {+total * 0.1}
                        </span>
                  </div>
                </div>}
             
    
    </>
  )
}
