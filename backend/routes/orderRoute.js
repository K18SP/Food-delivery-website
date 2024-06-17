import express from 'express'
import authMiddleWare from '../middleware/auth.js'
import { placeOrder,userOrders,verifyOrder,listOrders, updateStatus } from '../controllers/orderController.js'

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleWare,placeOrder);
orderRouter.get("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddleWare,userOrders);
orderRouter.get("/place", (req, res) => {
    res.send("This is a GET request to /api/order/place");
  });
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus)
  
export default orderRouter;