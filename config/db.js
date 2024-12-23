import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://rr0529004:rahul123@cluster0.ia1ck.mongodb.net/food-del').then(()=>console.log("DB Connected...")
    )
}