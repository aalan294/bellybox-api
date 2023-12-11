const menuModel = require('../MODELS/menuModel')
const fs = require('fs');
const path = require('path')
const getMenus = async(req,res)=>{
    try {
        menuList = await menuModel.find()
        menuList.map((menu)=>{
            menu.image = `https://bellybox-api.onrender.com/images/${menu.image}`
        })
        res.status(201).json(menuList)
    } catch (error) {
        res.sendStatus(400)
    }
}
const getSingleMenu = async(req,res)=>{
    try {
        const {id} = req.params
        menu = await menuModel.findById(id)
        menu.image = `https://bellybox-api.onrender.com/images/${menu.image}`
        res.status(201).json({menu})
    } catch (error) {
        res.sendStatus(400)
    }
}

const newMenu = async(req,res)=>{
    try {
        const image = req.file.filename
        const name = req.body.name
        const price = req.body.price
        const type = req.body.type
        let newMenu = {image,name,price,type}
        const menu = await menuModel.create(newMenu)
        res.status(201).json({menu})
    } catch (error) {
        res.sendStatus(400)
        console.log(error.message)
    }
}

const updateMenu = async(req,res)=>{
    try {
        if (!req.file || !req.file.filename) {
            // Handle the case where the file is missing
            throw new Error("File is missing in the request.")
        }
        const image = req.file.filename
        const name = req.body.name
        const price = req.body.price
        const type = req.body.type
        const {id} = req.params
        let updatedMenu = {image,name,price,type}
        let updated = await menuModel.findByIdAndUpdate(id,updatedMenu)
        res.status(201).json({updated})
    } catch (error) {
        res.sendStatus(400)
        console.log(error)
    }
}

const deleteMenu = async(req,res)=>{
    try {
        const {id}= req.params
        let deleted = await menuModel.findByIdAndDelete(id)
        console.log(deleted)
        const filePath = `${path.join(__dirname, '..')}/images/${deleted.image}`
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file: ${err.message}`);
            } else {
                console.log('File deleted successfully');
            }
        });
        res.status(201).json({"message" : "deleted successfully"})
        } catch (error) {
        res.status(400)
    }
}

module.exports = {getMenus,getSingleMenu,newMenu,updateMenu,deleteMenu}