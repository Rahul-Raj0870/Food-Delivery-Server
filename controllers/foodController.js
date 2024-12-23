import foodModel from '../models/foodModels.js'
import fs from 'fs'

// add food item
const addFood =async(req,res)=>{
    // let image_filename = `${req.file.filename}`;
    let image_filename = "";
    
    
    // Check if a file was uploaded
    if (req.file) {
        image_filename = req.file.filename; // Use the uploaded file's filename
    } else if (req.body.imageUrl) {
        image_filename = req.body.imageUrl; // Use the provided image URL
    } else {
        return res.status(400).json({ success: false, message: "No image provided" });
    }

     const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
     })
     try{
        await food.save();
        res.json({success:true,message:"Food Added"})
     }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
        
     }
}

// all food list

const listFood = async (req,res)=>{
    try{
        const foods = await foodModel.find({})
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

const removeFoodItem = async (req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`upload/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Food Item Removed"})
    }catch(error){
        console.log("error")
        res.json({success:false,message:"Error"})
    }
}

export {addFood,listFood,removeFoodItem}