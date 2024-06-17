import userModel from "../models/userModel.js"

//add items into user cart

    const addToCart = async (req,res) => {
        try {
            let userData = await userModel.findById(req.body.userId);
            let cartData = await userData.cartData;
            if(!cartData[req.body.itemId])
            {
                cartData[req.body.itemId] = 1;
            }else{
                cartData[req.body.itemId] += 1;
            }
            await userModel.findByIdAndUpdate(req.body.userId,{cartData});
            res.json({success:true,message:"ADDED TO CART"})
        } catch (error) {
            res.json({success:false,message:"ERROR IN ADDING TO CART"})
            console.log(error);        
        }
    }

//remove items from user cart

const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Remove From Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
}

//fetch user cart data

const getCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"errrorr"});
    }
}

export {addToCart,removeFromCart,getCart}