import mongoose, { mongo } from "mongoose";

export const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://kushalpandya163:kushal123@cluster0.bmwjre5.mongodb.net/food-delivery').then(()=>console.log("DB connected"));
}