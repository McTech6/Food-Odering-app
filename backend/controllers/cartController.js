import userModel from '../models/userModel.js'

//add items to user cart
export const addTOCart = async(req,res)=>{
    try {
        let userData =await userModel.findById(req.body.userId);
        let cartData= await userData.cartData;
        if(!cartData[req.body.itemId]) {
          cartData[req.body.itemId]=1
        }
  
        else {
          cartData[req.body.itemId]+=1;
        }
  
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:cartData})
        res.json({success:true,msg: "Added to cart"})
     } catch (error) {
         res.json({success:false,msg: "Error"})
     }
}


//remove from cart

export const removeFromCart = async(req,res)=>{
     try {

        let userData =await userModel.findById(req.body.userId)
        let cartData= await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
            if(cartData[req.body.itemId]==0){
                delete cartData[req.body.itemId]
            }
            await userModel.findByIdAndUpdate(req.body.userId,{cartData:cartData})
            res.json({success:true,msg: "Removed from cart"})
        }

        
     } catch (error) {
        res.json({success:false,msg: "Error"})
     }
}

//fetch user cart

export  const getCart =async(req,res)=>{
    try {
        let userData =await userModel.findById(req.body.userId)
        let cartData = await userData.cartData
        res.json({success:true,cartData:cartData})
    } catch (error) {
        res.json({success:false, msg: "Could not get cart items"})
    }
}
 