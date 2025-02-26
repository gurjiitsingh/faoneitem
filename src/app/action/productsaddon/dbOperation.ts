"use server";
import {
  newPorductSchema,
  editPorductSchema,
  TnewProductSchema,
  ShowPorductT,
} from "@/lib/types";

//import { z } from "zod";
import { deleteImage, upload } from "@/lib/cloudinary";
import { db } from "@/lib/firebaseConfig";
//import { product } from "@/--------db/schema";
// import { Weight } from "lucide-react";
// import { revalidatePath } from "next/cache";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "@firebase/firestore"; //doc, getDoc,
//import { orderProductsTArr } from "@/lib/type/orderType";
//import {  productTArr,  TnewProductSchemaArr } from "@/lib/type/productType";
//import { orderProductsTArr } from "@/lib/types/orderType";
import {
  
  ProductType,
 
} from "@/lib/types/productType";

//import { Result } from "postcss";
//productT,productTs, productTsArr, TproductSchemaArr

//from "@/lib/firestore/products/write";

export async function addNewProduct(formData: FormData) {
  let featured_img: boolean = false;
  // console.log(formData.get("name"));
  // console.log(formData.get("price"));
  //  console.log(formData.get("baseProductId"));
  //  console.log(formData.get("productCat"));
  // console.log(formData.get("productDesc"));
  // console.log(formData.get("image"));
  // console.log(formData.get("isFeatured"));

  if (formData.get("isFeatured") === "ture") featured_img = true;

  //console.log("isFeatured ", typeof formData.get("isFeatured"));

  const receivedData = {
    name: formData.get("name"),
    price: formData.get("price"),
    baseProductId : formData.get("baseProductId"),
    productCat: formData.get("productCat"),
    productDesc: formData.get("productDesc"),
    //image: formData.get("image"),
    isFeatured: featured_img,
  };

  const result = newPorductSchema.safeParse(receivedData);
console.log("zod result", result)
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });

    return Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true };
  }

  //const image = formData.get("image");
  let imageUrl;
  // try {
  //   imageUrl = await upload(image);
  //   console.log(imageUrl);
  // } catch (error) {
  //  // throw new Error("error");
  //   console.log(error);
  //   return { errors: "image cannot uploaded" };
  // }

  //imageUrl =  "/public/com.jpg";

  // const name = formData.get("name");
  // const price = formData.get("price");
  // const productCat = formData.get("productCat");
  // const productDesc = formData.get("productDesc");
  // const featured = formData.get("isFeatured");
  const data = {
    name: formData.get("name"),
    price: formData.get("price"),
    productCat: formData.get("productCat"),
    productDesc: formData.get("productDesc"),
    baseProductId : formData.get("baseProductId"),
   // image: imageUrl,
    isFeatured: featured_img,
  };
  //console.log("data to be saved ---", data)

  try {
    const docRef = await addDoc(collection(db, "productaddon"), data);
    console.log("Document written with ID: ", docRef.id);
    // Clear the form
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return { message: "Product saved" };


}//end of add new product 




type rt = {
  errors:string;
}

export async function deleteProduct(id: string, oldImgageUrl: string):Promise<rt> {

console.log("out put ", id, oldImgageUrl)
  return {"errors":"Delete not implimented jet"};
}

// export async function deleteProduct(id:string, oldImgageUrl:string) {

//   const result = await db.delete(product).where(eq(product.id, id));

//   if (result?.rowCount === 1) {

//     const imageUrlArray = oldImgageUrl.split("/");
//     console.log(imageUrlArray[imageUrlArray.length - 1]);
//     const imageName =
//       imageUrlArray[imageUrlArray.length - 2] +
//       "/" +
//       imageUrlArray[imageUrlArray.length - 1];

//     const image_public_id = imageName.split(".")[0];
//     console.log(image_public_id);
//     try {
//       let deleteResult = await deleteImage(image_public_id);
//       console.log("image delete data", deleteResult);
//     } catch (error) {
//      // console.log(error);
//       return {errors:"Somthing went wrong, can not delete product picture"}
//     }

//        return {
//       message: { sucess: "Deleted product" },
//     };
//   }else{
//     return {errors:"Somthing went wrong, can not delete product"}
//   }

// }

export async function editProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const image = formData.get("image");
  const oldImgageUrl = formData.get("oldImgageUrl") as string;
  const featured_img: boolean = false;
 // featured_img = formData.get("oldImgageUrl");

  const receivedData = {
    name: formData.get("name"),
    price: formData.get("price"),
    productCat: formData.get("productCat"),
    productDesc: formData.get("productDesc"),
    image: formData.get("image"),
    isFeatured: featured_img,
  };

  const result = editPorductSchema.safeParse(receivedData);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });

    return Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true };
  }

  let imageUrl;
  if (image === "undefined" || image === null) {
    imageUrl = oldImgageUrl;
  //  console.log("----------------not change image")
  } else {
  //  console.log("---------------- change image")
    try {
      imageUrl = (await upload(image)) as string;
      console.log(imageUrl);
    } catch (error) {
      //  throw new Error("error")
      console.log(error);
      return { errors: "image cannot uploaded" };
    }
    const d = false;
    if (d) {
      const imageUrlArray = oldImgageUrl?.split("/");
      console.log("old image url", imageUrlArray);
      const imageName =
        imageUrlArray[imageUrlArray.length - 2] +
        "/" +
        imageUrlArray[imageUrlArray.length - 1];

      const image_public_id = imageName.split(".")[0];
      console.log("image_public_id ---", image_public_id);
      try {
        const deleteResult = await deleteImage(image_public_id);
        console.log(deleteResult);
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  const productUpdtedData = {
    name: formData.get("name"),
    price: formData.get("price"),
    productCat: formData.get("productCat"),
    productDesc: formData.get("productDesc"),
    image: imageUrl,
    isFeatured: featured_img,
  };
  //console.log("update data ------------", productUpdtedData)
  // update database
  try {
    const docRef = doc(db,"productaddon", id);
   await setDoc(docRef, productUpdtedData);

  } catch (error) {
    console.log("error", error);
    return { errors: "Cannot update" };
  }
}

export async function fetchProducts(): Promise<ProductType[]> {
  // const result = await getDocs(collection(db, "productaddon"))
  // let data = [];
  // result.forEach((doc) => {
  //   data.push({id:doc.id, ...doc.data()});
  // });
  //  return data;

  const result = await getDocs(collection(db, "productaddon"));

  let data = [] as ProductType[];
  result.forEach((doc) => {
    const pData = { id: doc.id, ...doc.data() } as ProductType;
    data.push(pData);
  });
  return data;
 
}

export async function fetchProductById(id: string): Promise<ProductType> {
  const docRef = doc(db, "productaddon", id);
  const docSnap = await getDoc(docRef);
  let productData = {} as ProductType;
  if (docSnap.exists()) {
     console.log("Document data:", docSnap.data());
  } else {
    //   docSnap.data() //will be undefined in this case
     console.log("No such document!");
  }
  productData = docSnap.data() as ProductType;
  return productData;
  
}

export async function fetchProductByBaseProductId(id: string): Promise<ProductType[]> {
let data = [] as ProductType[];
     const q = query(collection(db, "productaddon"), where("baseProductId", "==", id));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((doc) => {
        const datas = doc.data() as ProductType;
        data.push(datas)
      });
      return data;
    }
  



 //console.log("Foorm data ---------",formData.get("oldImgageUrl"));
  // console.log(formData.get("price"));
  // console.log(formData.get("productCat"));
  // console.log(formData.get("productDesc"));
  // console.log(formData.get("image"));
  // console.log("is featured =======",formData.get("isFeatured"));
  // featured_img = formData.get("isFeatured");
  // if (formData.get("isFeatured").toString() === "true") {
  //   featured_img = true;
  // }