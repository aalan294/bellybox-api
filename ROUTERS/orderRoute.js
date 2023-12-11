const express = require('express')
const router = express.Router()

router.route('/')
    .post(require('../CONTROLLERS/orderController').newOrder)
    .get(require('../CONTROLLERS/orderController').getOrders)

router.route('/:id')
    .get(require('../CONTROLLERS/orderController').getSingleOrder)
    .delete(require('../CONTROLLERS/orderController').deleteOrder)

module.exports = router