import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import foodRouter from './routes/foodRouter.js'
import userRouter from './routes/userRoutes.js'
import 'dotenv/config'
import cartRouter from './routes/cartRouter.js'
import orderRouter from './routes/orderRoute.js'

dotenv.config()


//app config
const app =express()

const PORT = process.env.PORT || 5001

//middleware

app.use(express.json())
app.use(cors())


app.get('/',(req,res)=>{
    res.send({msg: "This is the app i am working on"})
})

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('Connected to MongoDB')
    app.listen(PORT,()=>{
        console.log(`Server Running on ${PORT} `)
    })
})
.catch((error)=>{
    console.log("Failed to connect to mongodb "+ error.message)
})

//api endpoints

app.use('/api/food', foodRouter)
app.use("/images",express.static('uploads'))

app.use("/api/user", userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order", orderRouter)


