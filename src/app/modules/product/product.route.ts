import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { productValidations } from "./product.validation";
import { productController } from "./product.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

//stock alert (products less then 5)
router.get('/stock-alert',productController.stockAlert)

router.post('/create-product',auth(USER_ROLE.SUPER_ADMIN,USER_ROLE.BRANCH_MANAGER), validateRequest(productValidations.createProductValidationSchema),productController.createProduct)

//get all products with filters
router.get('/',auth(USER_ROLE.SUPER_ADMIN,USER_ROLE.BRANCH_MANAGER,USER_ROLE.SELLER),productController.getProducts);

//get single product
router.get('/:id',auth(USER_ROLE.SUPER_ADMIN,USER_ROLE.BRANCH_MANAGER,USER_ROLE.SELLER),productController.getProduct)



//update single product
router.patch('/:id',auth(USER_ROLE.SUPER_ADMIN,USER_ROLE.BRANCH_MANAGER),validateRequest(productValidations.updateProductValidationSchema),productController.updateProduct)
//bulk delete
router.delete('/deleteMultipleProduct',auth(USER_ROLE.SUPER_ADMIN),productController.deleteMultipleProduct);

//delete a single product
router.delete('/:id',auth(USER_ROLE.SUPER_ADMIN),productController.deleteAProduct);

// insert bulk product TODO
router.post('/insert-bulk-product',auth(USER_ROLE.SUPER_ADMIN,USER_ROLE.BRANCH_MANAGER),productController.createBulkProduct);








export const productRoutes = router;