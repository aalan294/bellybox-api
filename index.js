const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const cors = require('cors')

port = process.env.PORT || 3400

//server connection and database connection

const main = async()=>{
    try {
        app.listen(port,()=>{
            console.log(`app running oon port ${port}`)
        })
        mongoose.connect(process.env.DB_URL).then(()=>{
            console.log("connected to the database")
        })
    } catch (error) {
        console.log(error.message)
    }
}
main()
app.use(express.static('images'))
app.use(cors())
app.get('/images/:id',(req,res)=>{
    const {id} = req.params
    res.sendFile(__dirname+`/images/${id}`)
})
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use('/menu',require('./ROUTERS/menuRoute'))
app.use('/orders',require('./ROUTERS/orderRoute'))
