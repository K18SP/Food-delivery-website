import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY
});

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:3000/";
    
    try {
        console.log('Received request body:', req.body);

        const { userId, items, amount, address } = req.body;
        if (!userId || !items || !amount || !address) {
            console.error('Missing required fields:', { userId, items, amount, address });
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        const orderOptions = {
            amount: amount * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: `${newOrder._id}`,
            payment_capture: 1 // auto-capture payments
        };

        const order = await razorpay.orders.create(orderOptions);

        res.json({
            success: true,
            orderId: newOrder._id,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt,
            order_id: order.id,
            key_id: process.env.RAZORPAY_KEY_ID, // Send key_id for frontend integration
        });

    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ success: false, message: "Error creating order" });
    }
};


const verifyOrder = async (req, res) => {
    const { orderId, success } = req.query; // Access parameters from query string
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
};


// User orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

//listing orders for admin panel
const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//api for updating order status
const updateStatus = async (req,res) => {
    try {
       await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
       res.json({success:true,message:"Status Updated"}) 
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export { placeOrder, verifyOrder, userOrders,listOrders,updateStatus };
