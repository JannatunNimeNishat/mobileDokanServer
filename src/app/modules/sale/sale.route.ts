import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { saleValidations } from "./sale.validation";
import { saleController } from "./sale.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post('/create-sale',auth(USER_ROLE.SUPER_ADMIN,USER_ROLE.BRANCH_MANAGER,USER_ROLE.SELLER), validateRequest(saleValidations.createSaleValidationSchema),saleController.makePayment);

router.get('/sales-history/:interval',auth(USER_ROLE.SUPER_ADMIN,USER_ROLE.BRANCH_MANAGER,USER_ROLE.SELLER),saleController.saleHistory);

router.get('/top-selling-products',saleController.topSellingProducts);
router.get('/total-sell', saleController.totalSell);
router.get('/todays-total-sell', saleController.todaysTotalSell);

router.get('/day-wise-weekly-sell',saleController.dayBasisWeeklySell)

export const saleRoutes = router;
