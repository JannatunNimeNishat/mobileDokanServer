import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { productRoutes } from "../modules/product/product.route";
import { saleRoutes } from "../modules/sale/sale.route";




const router = Router();

const moduleRoutes = [
    {
        path:'/user',
        route:userRoutes
    },
    {
        path:'/auth',
        route:authRoutes
    },
    {
        path:'/product',
        route:productRoutes
    },
    {
        path:'/sale',
        route:saleRoutes
    },
    
]

moduleRoutes.forEach((route)=>router.use(route.path,route.route));

export default router;