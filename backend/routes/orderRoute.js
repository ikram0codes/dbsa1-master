import express from "express";
import { authorized, authorizedAdmin } from "../middleware/authorization.js";
import { calculateTotalSales, calculateTotalSalesByDate, countTotalOrders, createOrder, findOrderById, getAllOrders, getUserOrders, markOrderAsDelivered, markOrderAsPaid, updateDeliveryStatus } from "../controllers/orderController.js";
const router = express.Router();

router.route("/").post(authorized, createOrder).get(authorized, authorizedAdmin, getAllOrders);
router.route("/mine").get(authorized, getUserOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calculateTotalSalesByDate);
router.route("/:id/status").put(authorized, authorizedAdmin, updateDeliveryStatus);
router.route("/:id").get(authorized, findOrderById);
router.route("/:id/pay").put(authorized, markOrderAsPaid);
router.route("/:id/deliver").put(authorized, authorizedAdmin, markOrderAsDelivered);

export default router;