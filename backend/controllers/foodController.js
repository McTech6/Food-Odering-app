import FoodModel from "../models/foodModel.js";
import fs from 'fs';


export const addFood = async (req, res) => {
    const { name, description, price, category } = req.body;  
    let image_filename = req.file ? req.file.filename : null;

 
     

    console.log(name, description, price, category)
  
    if (!name || !description || !price || !image_filename || !category) {
        return res.status(400).send({ msg: "Please fill all fields" });
    }

    const food = new FoodModel({
        name: name,
        description: description,
        price: price,  
        image: image_filename,
        category: category
    });

    try {
        await food.save();
        res.status(200).json({ success: true, msg: "Food Added" });
    } catch (error) {
        res.status(400).send({ success: false, msg: "Could not register food item" });
        console.log(error);
    }
};

export const listFood =async(req,res)=>{
    try {

        const foods =await FoodModel.find({});
        res.status(200).json({success:true,foods:foods});
        
    } catch (error) {
        console.log( error)
        res.status(500).json({success:false, msg: "Server Error"});
    }
}


export const removeFood = async(req,res)=>{
    try {

        const id = req.body.id
         const food =await FoodModel.findById(id)
         fs.unlink(`uploads/${food.image}`,()=>{})

         await FoodModel.findByIdAndDelete(id)
         res.status(200).json({success:true, msg: "Food deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, msg: "Server Error"});
        
    }
}
 