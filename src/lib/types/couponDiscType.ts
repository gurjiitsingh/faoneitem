import {  z } from "zod";

export const couponCodeSchema = z.object({
    
    coupon: z.string().min(4, { message: "coupon code is required" })
  })

export   type TcouponCodeSchema = z.infer<typeof couponCodeSchema>;


export type couponDiscType ={
couponDesc:string;
isFeatured:boolean;
minSpend:string;
name:string;
price:string;
productCat:string;
}
