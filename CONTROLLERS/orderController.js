const orderModel = require('../MODELS/orderModel')

const getOrders =async(req,res)=>{
    try {
        const orders = await orderModel.find()
        res.status(201).json({orders})
    } catch (error) {
        res.status(400)
    }
}

const getSingleOrder = async(req,res)=>{
    try {
        const {id} = req.params
        const order = await orderModel.findById(id)
        res.status(201).json({order})
    } catch (error) {
        res.status(400)
    }
}

const newOrder = async(req,res)=>{
    try {
        const {table,items} = req.body
        const order = {
            table,
            items
        }
        const createNewOrder =  await orderModel.create(order)
        res.status(201).json({createNewOrder})
    } catch (error) {
        console.log(error)
    }
}
const deleteOrder = async(req,res)=>{
    try {
        const {id} = req.params
        const deletedOrder = await orderModel.findByIdAndDelete(id)
        res.status(201).json({deletedOrder})
    } catch (error) {
        res.status(400)
    }
}

module.exports = {newOrder,getOrders,getSingleOrder,deleteOrder}