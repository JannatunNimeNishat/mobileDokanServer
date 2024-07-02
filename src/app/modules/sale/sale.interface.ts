import { Types } from "mongoose"

export type TSale = {
    product_id:Types.ObjectId;
    productName:string;
    imageURL:string;
    quantity?:number;
    buyer_name?:string;
    sale_date?:string;
    price?:number;
}