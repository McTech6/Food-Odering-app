import express from 'express'

import { addFood, listFood, removeFood } from '../controllers/foodController.js'
import multer from 'multer'

const foodRouter= express.Router()

//Image Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');  
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); 
  }
});

const upload = multer({storage: storage})

foodRouter.post("/add", upload.single("image"),addFood)
foodRouter.get("/list", listFood)
foodRouter.delete("/remove", removeFood)




 


foodRouter.post("/add", upload.single("image"), addFood)








export default foodRouter