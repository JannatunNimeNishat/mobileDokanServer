import { Model } from "mongoose";

/* eslint-disable no-unused-vars */
export type TProduct = {
    name:string;
    price:number;
    quantity:number;
    // release_date:Date;
    release_date:string;
    brand:string;
    model:string;
    os:string;
    storage_capacity:string;
    screen_size:number;
    camera:number;
    imageURL:string;
}

export interface ProductModel extends Model<TProduct>{
    isProductExists(name:string):Promise<TProduct | null>
}